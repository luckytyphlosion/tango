import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import * as types from "./types";
import { app } from "@electron/remote";
import path from "path";
import { EventEmitter } from "stream";

export interface ExitStatus {
  exitCode: number | null;
  signalCode: NodeJS.Signals | null;
}

export class Core extends EventEmitter {
  private _proc: ChildProcessWithoutNullStreams;
  private _exitPromise: Promise<void>;

  constructor(args: types.Args, { signal }: { signal?: AbortSignal } = {}) {
    super();

    this._proc = spawn(
      path.join(app.getAppPath(), "core", "tango-core"),
      [JSON.stringify(args)],
      {
        signal,
      }
    );
    this._exitPromise = new Promise((resolve) => {
      this._proc.addListener("exit", () => {
        this._proc.kill();
        resolve();
      });
    });
    window.addEventListener("beforeunload", () => {
      this._proc.kill();
    });

    (async () => {
      for await (const data of this!._proc.stderr) {
        this!.emit("stderr", data);
      }
    })();

    (async () => {
      let buf = "";
      for await (const data of this!._proc.stdout) {
        buf += data;
        const lines = buf.split(/\n/g);
        buf = lines[lines.length - 1];

        for (const r of lines.slice(0, -1)) {
          const notification = JSON.parse(r) as types.Notification;
          if (notification.State) {
            this!.emit("state", notification.State);
          }
        }
      }

      await this!._exitPromise;
      this!.emit("exit", {
        exitCode: this!._proc.exitCode,
        signalCode: this!._proc.signalCode,
      });
    })();
  }
}

export declare interface Core {
  on(event: "state", listener: (state: types.State) => void): this;
  on(event: "stderr", listener: (stderr: string) => void): this;
  on(event: "exit", listener: (exitStatus: ExitStatus) => void): this;
}

export type Args = types.Args;
export type State = types.State;