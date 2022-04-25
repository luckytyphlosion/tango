import React from "react";
import tmp from "tmp-promise";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { makeROM } from "../../game";
import * as ipc from "../../ipc";
import { getCorePath } from "../../paths";
import { useConfig } from "./ConfigContext";

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
  matchSettings?: ipc.MatchSettings;
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

      const core = new ipc.Core(
        getCorePath(),
        romTmpFileRef.current.path,
        savePath,
        windowTitle,
        configRef.current.keymapping,
        matchSettings || null,
        {
          signal: abortControllerRef.current.signal,
        }
      );
      core.on("stderr", (v) => {
        setStderr((stderr) => {
          stderr.push(v);
          return stderr;
        });
      });
      core.on("exit", (exitStatus) => {
        setExitStatus(exitStatus);
        onExitRef.current(exitStatus);
      });
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
    config.keymapping,
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
          width: 300,
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
          <Typography></Typography>
        </Stack>
      </Box>
    </Modal>
  );
}
