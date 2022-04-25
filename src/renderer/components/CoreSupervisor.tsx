import React from "react";
import tmp from "tmp-promise";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { makeROM } from "../../game";
import * as ipc from "../../ipc";
import { connect } from "../../matchmaking";
import { getCorePath } from "../../paths";
import { useConfig } from "./ConfigContext";

type Status = "starting" | "matchmaking" | "connecting" | "running";

export function CoreSupervisor({
  romPath,
  savePath,
  patchPath,
  matchSettings,
  windowTitle,
  incarnation,
  onExit,
}: {
  romPath: string;
  savePath: string;
  patchPath?: string;
  matchSettings?: {
    sessionID: string;
    inputDelay: number;
    matchType: number;
  };
  incarnation: number;
  windowTitle: string;
  onExit: (exitStatus: ipc.ExitStatus) => void;
}) {
  const { config } = useConfig();

  const configRef = React.useRef(config);
  const romTmpFileRef = React.useRef<tmp.FileResult | null>(null);

  const onExitRef = React.useRef(onExit);
  React.useEffect(() => {
    onExitRef.current = onExit;
  }, [onExit]);

  const [status, setStatus] = React.useState<Status>("starting");
  const [stderr, setStderr] = React.useState<string[]>([]);
  const [exitStatus, setExitStatus] = React.useState<ipc.ExitStatus | null>(
    null
  );

  const abortControllerRef = React.useRef<AbortController>(null!);
  if (abortControllerRef.current == null) {
    abortControllerRef.current = new AbortController();
  }

  React.useEffect(() => {
    (async () => {
      romTmpFileRef.current = await makeROM(romPath, patchPath || null);

      let pvpState: {
        matchSettings: ipc.MatchSettings;
        dc: RTCDataChannel;
      } | null = null;
      if (matchSettings != null) {
        setStatus("matchmaking");
        // We need to negotiate a WebRTC connection and all kinds of horrible things.
        const peerConn = new RTCPeerConnection(config.webrtc);
        const dc = peerConn.createDataChannel("tango", {
          negotiated: true,
          id: 0,
        });
        const isPolite = await connect(
          peerConn,
          config.matchmakingConnectAddr,
          matchSettings.sessionID
        );

        pvpState = {
          matchSettings: {
            rngSeed: "a",
            isPolite: isPolite,
            inputDelay: matchSettings.inputDelay,
            matchType: matchSettings.matchType,
          },
          dc: dc,
        };

        setStatus("connecting");
      }

      const core = new ipc.Core(
        getCorePath(),
        romTmpFileRef.current.path,
        savePath,
        windowTitle,
        configRef.current.keymapping,
        pvpState != null ? pvpState.matchSettings : null,
        {
          signal: abortControllerRef.current.signal,
        }
      );
      core.on("stderr", (v) => {
        setStderr((stderr) => [...stderr, v]);
      });
      core.on("exit", (exitStatus) => {
        setExitStatus(exitStatus);
        onExitRef.current(exitStatus);
      });

      if (pvpState != null) {
        pvpState.dc.onmessage = (msg) => {
          core.write({
            packet: { raw: new Uint8Array(msg.data as ArrayBuffer) },
          });
        };
      }

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const packet = await core.read();
        if (packet == null) {
          break;
        }
        if (packet.running) {
          setStatus("running");
        }
        if (packet.packet) {
          pvpState!.dc.send(new Uint8Array(packet.packet.raw).buffer);
        }
      }
    })();

    return () => {
      if (romTmpFileRef.current != null) {
        romTmpFileRef.current.cleanup();
      }
      abortControllerRef.current.abort();
    };
  }, [
    romPath,
    savePath,
    patchPath,
    config,
    matchSettings,
    windowTitle,
    incarnation,
  ]);

  return (
    <Modal
      open={true}
      onClose={(e, reason) => {
        if (reason == "backdropClick" || reason == "escapeKeyDown") {
          return;
        }
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          px: 3,
          py: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <CircularProgress
            sx={{ flexGrow: 0, flexShrink: 0 }}
            disableShrink
            size="2rem"
          />
          <Typography>{status}</Typography>
        </Stack>
        <pre
          style={{
            height: "400px",
            whiteSpace: "pre-wrap",
            fontSize: "0.8em",
            overflow: "auto",
          }}
        >
          {stderr.join("")}
        </pre>
      </Box>
    </Modal>
  );
}
