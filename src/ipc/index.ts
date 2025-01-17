import { ChildProcessWithoutNullStreams } from "child_process";
import { EventEmitter } from "stream";

import { app } from "@electron/remote";

import { spawn } from "../process";
import * as types from "./types";

export interface ExitStatus {
  exitCode: number | null;
  signalCode: NodeJS.Signals | null;
}

export class Core extends EventEmitter {
  private _proc: ChildProcessWithoutNullStreams;
  private _exitPromise: Promise<void>;

  constructor(
    args: types.Args,
    { env, signal }: { env?: NodeJS.ProcessEnv; signal?: AbortSignal } = {}
  ) {
    super();

    this._proc = spawn(app, "tango-core", [JSON.stringify(args)], {
      env,
      signal,
    });
    this._proc.addListener("error", (err) => {
      this.emit("error", err);
    });
    this._exitPromise = new Promise((resolve) => {
      this._proc.addListener("exit", () => {
        this._proc.kill();
        resolve();
      });
    });

    const beforeunload = () => {
      this._proc.kill();
      window.removeEventListener("beforeunload", beforeunload);
    };
    window.addEventListener("beforeunload", beforeunload);

    (async () => {
      for await (const data of this!._proc.stderr) {
        for (const line of data.toString().split(/\n/g)) {
          if (line == "") {
            continue;
          }
          // eslint-disable-next-line no-console
          console.info("core:", line);
        }
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
      // eslint-disable-next-line no-console
      console.info(
        `core exited with ${this!._proc.exitCode}, signal code = ${
          this!._proc.signalCode
        }`
      );
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
  on(event: "error", listener: (err: Error) => void): this;
}

export type Args = types.Args;
export type State = types.State;
