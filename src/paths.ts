import path from "path";

import { app } from "@electron/remote";

export function getBasePath() {
  return path.join(app.getPath("documents"), "Tango");
}

export function getConfigPath() {
  return path.join(getBasePath(), "config.json");
}

export function getROMsPath() {
  return path.join(getBasePath(), "roms");
}

export function getPatchesPath() {
  return path.join(getBasePath(), "patches");
}

export function getReplaysPath() {
  return path.join(getBasePath(), "replays");
}

export function getSavesPath() {
  return path.join(getBasePath(), "saves");
}

export function getCorePath() {
  return app.isPackaged ? path.join(process.resourcesPath, "core") : "core";
}
