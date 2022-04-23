import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SlowMotionVideoOutlinedIcon from "@mui/icons-material/SlowMotionVideoOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
}));

function NavbarButton({
  title,
  onClick,
  unselectedIcon,
  selectedIcon,
  selected,
}: {
  title: string;
  onClick: React.MouseEventHandler;
  unselectedIcon: React.ReactNode;
  selectedIcon: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <Tooltip title={title} enterDelay={0} placement="right">
      <ListItemButton
        onClick={onClick}
        selected={selected}
        sx={{
          minHeight: 48,
          px: 2.5,
          justifyContent: "center",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: "auto",
            justifyContent: "center",
          }}
        >
          {selected ? selectedIcon : unselectedIcon}
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}

export type NavbarSelection = "play" | "replays" | "saves" | "settings" | null;

export default function Navbar({
  selected,
  onSelect,
}: {
  selected: NavbarSelection;
  onSelect: (selected: NavbarSelection) => void;
}) {
  const { t } = useTranslation();

  return (
    <Drawer variant="permanent" open={true}>
      <List>
        <NavbarButton
          selected={selected == "play"}
          onClick={() => {
            onSelect("play");
          }}
          title={t("navbar:play")}
          unselectedIcon={<SportsEsportsOutlinedIcon />}
          selectedIcon={<SportsEsportsIcon />}
        />
        <NavbarButton
          selected={selected == "saves"}
          onClick={() => {
            onSelect("saves");
          }}
          title={t("navbar:saves")}
          unselectedIcon={<GridViewOutlinedIcon />}
          selectedIcon={<GridViewIcon />}
        />
        <NavbarButton
          selected={selected == "replays"}
          onClick={() => {
            onSelect("replays");
          }}
          title={t("navbar:replays")}
          unselectedIcon={<SlowMotionVideoOutlinedIcon />}
          selectedIcon={<SlowMotionVideoIcon />}
        />
      </List>
      <List style={{ marginTop: "auto" }}>
        <NavbarButton
          selected={selected == "settings"}
          onClick={() => {
            onSelect("settings");
          }}
          title={t("navbar:settings")}
          unselectedIcon={<SettingsOutlinedIcon />}
          selectedIcon={<SettingsIcon />}
        />
      </List>
    </Drawer>
  );
}