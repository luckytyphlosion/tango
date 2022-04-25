import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { once } from "events";
import { EventEmitter, Readable } from "stream";

import { Keymapping } from "./config";
import { FromSupervisor, ToSupervisor } from "./proto/ipc";

export interface MatchSettings {
  rngSeed: string;
  inputDelay: number;
  isPolite: boolean;
  matchType: number;
}

export interface ExitStatus {
  exitCode: number | null;
  signalCode: NodeJS.Signals | null;
}

export class Core extends EventEmitter {
  private proc: ChildProcessWithoutNullStreams;

  constructor(
    corePath: string,
    romPath: string,
    savePath: string,
    windowTitle: string,
    keymapping: Keymapping,
    matchSettings: MatchSettings | null = null,
    { signal }: { signal?: AbortSignal } = {}
  ) {
    super();

    this.proc = spawn(
      corePath,
      [
        "--window-title",
        windowTitle,

        "--keymapping",
        JSON.stringify(keymapping),

        ...(matchSettings != null
          ? [
              "--match-settings",
              JSON.stringify({
                rng_seed: matchSettings.rngSeed,
                input_delay: matchSettings.inputDelay,
                is_polite: matchSettings.isPolite,
                match_type: matchSettings.matchType,
              }),
            ]
          : []),

        "--",

        romPath,
        savePath,
      ],
      {
        signal,
      }
    );

    window.addEventListener("beforeunload", () => {
      this.proc.kill();
    });

    this.proc.stderr.on("data", (data) => {
      this.emit("stderr", data.toString());
    });

    this.proc.addListener("exit", () => {
      this.emit("exit", {
        exitCode: this.proc.exitCode,
        signalCode: this.proc.signalCode,
      });
    });
  }

  private async _rawWrite(buf: Buffer) {
    const r = Readable.from(buf);
    r.pipe(this.proc.stdin, { end: false });
    await once(r, "end");
  }

  private async _rawRead(n: number) {
    const chunks = [];
    while (n > 0) {
      if (this.proc.stdout.readableLength == 0) {
        await once(this.proc.stdout, "readable");
      }
      const chunk = this.proc.stdout.read(
        Math.min(n, this.proc.stdout.readableLength)
      ) as Buffer;
      if (chunk == null) {
        if (this.proc.stdout.readableEnded) {
          return null;
        }
        continue;
      }
      chunks.push(chunk);
      n -= chunk.length;
    }
    return Buffer.concat(chunks);
  }

  private async _writeLengthDelimited(buf: Buffer) {
    const header = Buffer.alloc(4);
    const dv = new DataView(new Uint8Array(header).buffer);
    dv.setUint32(0, buf.length, true);
    await this._rawWrite(Buffer.from(dv.buffer));
    await this._rawWrite(buf);
  }

  private async _readLengthDelimited() {
    const header = await this._rawRead(4);
    if (header == null) {
      return null;
    }
    const dv = new DataView(new Uint8Array(header).buffer);
    const len = dv.getUint32(0, true);
    return await this._rawRead(len);
  }

  public async write(p: FromSupervisor) {
    await this._writeLengthDelimited(
      Buffer.from(FromSupervisor.encode(p).finish())
    );
  }

  public async read() {
    const buf = await this._readLengthDelimited();
    if (buf == null) {
      return null;
    }
    return ToSupervisor.decode(new Uint8Array(buf));
  }
}

export declare interface Core {
  on(event: "exit", listener: (exitStatus: ExitStatus) => void): this;
  on(event: "stderr", listener: (chunk: string) => void): this;
}
