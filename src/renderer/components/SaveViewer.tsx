import { readFile } from "fs/promises";
import path from "path";
import React from "react";
import { Trans } from "react-i18next";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { getSavesPath } from "../../paths";
import * as bn6 from "../../saveedit/bn6";
import FolderViewer from "./FolderViewer";
import ModcardsViewer from "./ModcardsViewer";
import NavicustViewer from "./NavicustViewer";

export default function SaveViewer({
  filename,
  incarnation,
}: {
  filename: string;
  incarnation: number;
}) {
  const [tab, setTab] = React.useState("navicust");
  const [editor, setEditor] = React.useState<bn6.Editor | null>(null);

  React.useEffect(() => {
    (async () => {
      setEditor(
        new bn6.Editor(
          bn6.Editor.sramDumpToRaw(
            (await readFile(path.join(getSavesPath(), filename))).buffer
          )
        )
      );
    })();
  }, [filename, incarnation]);

  if (editor == null) {
    return null;
  }

  return (
    <Stack flexGrow={1} flexShrink={0}>
      <Box flexGrow={0}>
        <Tabs
          sx={{ px: 1 }}
          value={tab}
          onChange={(e, value) => {
            setTab(value);
          }}
        >
          <Tab label={<Trans i18nKey="play:tab.navicust" />} value="navicust" />
          <Tab label={<Trans i18nKey="play:tab.folder" />} value="folder" />
          <Tab
            label={<Trans i18nKey="play:tab.modcards" />}
            value="modcards"
            disabled={!editor.supportsModcards()}
          />
        </Tabs>
      </Box>
      <NavicustViewer editor={editor} active={tab == "navicust"} />
      <FolderViewer editor={editor} active={tab == "folder"} />
      {editor.supportsModcards() ? (
        <ModcardsViewer editor={editor} active={tab == "modcards"} />
      ) : null}
    </Stack>
  );
}