/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "tango.core.ipc";

export interface FromSupervisor {
  packet: FromSupervisor_Packet | undefined;
}

export interface FromSupervisor_Packet {
  raw: Uint8Array;
}

export interface ToSupervisor {
  packet: ToSupervisor_Packet | undefined;
  running: ToSupervisor_Running | undefined;
  matchEnd: ToSupervisor_MatchEnd | undefined;
  battleStart: ToSupervisor_BattleStart | undefined;
  localState: ToSupervisor_LocalState | undefined;
  battleEnd: ToSupervisor_BattleEnd | undefined;
}

export interface ToSupervisor_Packet {
  raw: Uint8Array;
}

export interface ToSupervisor_Running {}

export interface ToSupervisor_MatchEnd {}

export interface ToSupervisor_BattleStart {
  battleNumber: number;
  localPlayerIndex: number;
}

export interface ToSupervisor_LocalState {
  state: Uint8Array;
}

export interface ToSupervisor_BattleEnd {
  battleNumber: number;
}

function createBaseFromSupervisor(): FromSupervisor {
  return { packet: undefined };
}

export const FromSupervisor = {
  encode(
    message: FromSupervisor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.packet !== undefined) {
      FromSupervisor_Packet.encode(
        message.packet,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FromSupervisor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFromSupervisor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = FromSupervisor_Packet.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FromSupervisor {
    return {
      packet: isSet(object.packet)
        ? FromSupervisor_Packet.fromJSON(object.packet)
        : undefined,
    };
  },

  toJSON(message: FromSupervisor): unknown {
    const obj: any = {};
    message.packet !== undefined &&
      (obj.packet = message.packet
        ? FromSupervisor_Packet.toJSON(message.packet)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FromSupervisor>, I>>(
    object: I
  ): FromSupervisor {
    const message = createBaseFromSupervisor();
    message.packet =
      object.packet !== undefined && object.packet !== null
        ? FromSupervisor_Packet.fromPartial(object.packet)
        : undefined;
    return message;
  },
};

function createBaseFromSupervisor_Packet(): FromSupervisor_Packet {
  return { raw: new Uint8Array() };
}

export const FromSupervisor_Packet = {
  encode(
    message: FromSupervisor_Packet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.raw.length !== 0) {
      writer.uint32(10).bytes(message.raw);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FromSupervisor_Packet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFromSupervisor_Packet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.raw = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FromSupervisor_Packet {
    return {
      raw: isSet(object.raw) ? bytesFromBase64(object.raw) : new Uint8Array(),
    };
  },

  toJSON(message: FromSupervisor_Packet): unknown {
    const obj: any = {};
    message.raw !== undefined &&
      (obj.raw = base64FromBytes(
        message.raw !== undefined ? message.raw : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FromSupervisor_Packet>, I>>(
    object: I
  ): FromSupervisor_Packet {
    const message = createBaseFromSupervisor_Packet();
    message.raw = object.raw ?? new Uint8Array();
    return message;
  },
};

function createBaseToSupervisor(): ToSupervisor {
  return {
    packet: undefined,
    running: undefined,
    matchEnd: undefined,
    battleStart: undefined,
    localState: undefined,
    battleEnd: undefined,
  };
}

export const ToSupervisor = {
  encode(
    message: ToSupervisor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.packet !== undefined) {
      ToSupervisor_Packet.encode(
        message.packet,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.running !== undefined) {
      ToSupervisor_Running.encode(
        message.running,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.matchEnd !== undefined) {
      ToSupervisor_MatchEnd.encode(
        message.matchEnd,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.battleStart !== undefined) {
      ToSupervisor_BattleStart.encode(
        message.battleStart,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.localState !== undefined) {
      ToSupervisor_LocalState.encode(
        message.localState,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.battleEnd !== undefined) {
      ToSupervisor_BattleEnd.encode(
        message.battleEnd,
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ToSupervisor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToSupervisor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = ToSupervisor_Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.running = ToSupervisor_Running.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.matchEnd = ToSupervisor_MatchEnd.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.battleStart = ToSupervisor_BattleStart.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.localState = ToSupervisor_LocalState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.battleEnd = ToSupervisor_BattleEnd.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToSupervisor {
    return {
      packet: isSet(object.packet)
        ? ToSupervisor_Packet.fromJSON(object.packet)
        : undefined,
      running: isSet(object.running)
        ? ToSupervisor_Running.fromJSON(object.running)
        : undefined,
      matchEnd: isSet(object.matchEnd)
        ? ToSupervisor_MatchEnd.fromJSON(object.matchEnd)
        : undefined,
      battleStart: isSet(object.battleStart)
        ? ToSupervisor_BattleStart.fromJSON(object.battleStart)
        : undefined,
      localState: isSet(object.localState)
        ? ToSupervisor_LocalState.fromJSON(object.localState)
        : undefined,
      battleEnd: isSet(object.battleEnd)
        ? ToSupervisor_BattleEnd.fromJSON(object.battleEnd)
        : undefined,
    };
  },

  toJSON(message: ToSupervisor): unknown {
    const obj: any = {};
    message.packet !== undefined &&
      (obj.packet = message.packet
        ? ToSupervisor_Packet.toJSON(message.packet)
        : undefined);
    message.running !== undefined &&
      (obj.running = message.running
        ? ToSupervisor_Running.toJSON(message.running)
        : undefined);
    message.matchEnd !== undefined &&
      (obj.matchEnd = message.matchEnd
        ? ToSupervisor_MatchEnd.toJSON(message.matchEnd)
        : undefined);
    message.battleStart !== undefined &&
      (obj.battleStart = message.battleStart
        ? ToSupervisor_BattleStart.toJSON(message.battleStart)
        : undefined);
    message.localState !== undefined &&
      (obj.localState = message.localState
        ? ToSupervisor_LocalState.toJSON(message.localState)
        : undefined);
    message.battleEnd !== undefined &&
      (obj.battleEnd = message.battleEnd
        ? ToSupervisor_BattleEnd.toJSON(message.battleEnd)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToSupervisor>, I>>(
    object: I
  ): ToSupervisor {
    const message = createBaseToSupervisor();
    message.packet =
      object.packet !== undefined && object.packet !== null
        ? ToSupervisor_Packet.fromPartial(object.packet)
        : undefined;
    message.running =
      object.running !== undefined && object.running !== null
        ? ToSupervisor_Running.fromPartial(object.running)
        : undefined;
    message.matchEnd =
      object.matchEnd !== undefined && object.matchEnd !== null
        ? ToSupervisor_MatchEnd.fromPartial(object.matchEnd)
        : undefined;
    message.battleStart =
      object.battleStart !== undefined && object.battleStart !== null
        ? ToSupervisor_BattleStart.fromPartial(object.battleStart)
        : undefined;
    message.localState =
      object.localState !== undefined && object.localState !== null
        ? ToSupervisor_LocalState.fromPartial(object.localState)
        : undefined;
    message.battleEnd =
      object.battleEnd !== undefined && object.battleEnd !== null
        ? ToSupervisor_BattleEnd.fromPartial(object.battleEnd)
        : undefined;
    return message;
  },
};

function createBaseToSupervisor_Packet(): ToSupervisor_Packet {
  return { raw: new Uint8Array() };
}

export const ToSupervisor_Packet = {
  encode(
    message: ToSupervisor_Packet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.raw.length !== 0) {
      writer.uint32(10).bytes(message.raw);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ToSupervisor_Packet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToSupervisor_Packet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.raw = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToSupervisor_Packet {
    return {
      raw: isSet(object.raw) ? bytesFromBase64(object.raw) : new Uint8Array(),
    };
  },

  toJSON(message: ToSupervisor_Packet): unknown {
    const obj: any = {};
    message.raw !== undefined &&
      (obj.raw = base64FromBytes(
        message.raw !== undefined ? message.raw : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToSupervisor_Packet>, I>>(
    object: I
  ): ToSupervisor_Packet {
    const message = createBaseToSupervisor_Packet();
    message.raw = object.raw ?? new Uint8Array();
    return message;
  },
};

function createBaseToSupervisor_Running(): ToSupervisor_Running {
  return {};
}

export const ToSupervisor_Running = {
  encode(
    _: ToSupervisor_Running,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ToSupervisor_Running {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToSupervisor_Running();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ToSupervisor_Running {
    return {};
  },

  toJSON(_: ToSupervisor_Running): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToSupervisor_Running>, I>>(
    _: I
  ): ToSupervisor_Running {
    const message = createBaseToSupervisor_Running();
    return message;
  },
};

function createBaseToSupervisor_MatchEnd(): ToSupervisor_MatchEnd {
  return {};
}

export const ToSupervisor_MatchEnd = {
  encode(
    _: ToSupervisor_MatchEnd,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ToSupervisor_MatchEnd {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToSupervisor_MatchEnd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ToSupervisor_MatchEnd {
    return {};
  },

  toJSON(_: ToSupervisor_MatchEnd): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToSupervisor_MatchEnd>, I>>(
    _: I
  ): ToSupervisor_MatchEnd {
    const message = createBaseToSupervisor_MatchEnd();
    return message;
  },
};

function createBaseToSupervisor_BattleStart(): ToSupervisor_BattleStart {
  return { battleNumber: 0, localPlayerIndex: 0 };
}

export const ToSupervisor_BattleStart = {
  encode(
    message: ToSupervisor_BattleStart,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.battleNumber !== 0) {
      writer.uint32(8).uint32(message.battleNumber);
    }
    if (message.localPlayerIndex !== 0) {
      writer.uint32(16).uint32(message.localPlayerIndex);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ToSupervisor_BattleStart {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToSupervisor_BattleStart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.battleNumber = reader.uint32();
          break;
        case 2:
          message.localPlayerIndex = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToSupervisor_BattleStart {
    return {
      battleNumber: isSet(object.battleNumber)
        ? Number(object.battleNumber)
        : 0,
      localPlayerIndex: isSet(object.localPlayerIndex)
        ? Number(object.localPlayerIndex)
        : 0,
    };
  },

  toJSON(message: ToSupervisor_BattleStart): unknown {
    const obj: any = {};
    message.battleNumber !== undefined &&
      (obj.battleNumber = Math.round(message.battleNumber));
    message.localPlayerIndex !== undefined &&
      (obj.localPlayerIndex = Math.round(message.localPlayerIndex));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToSupervisor_BattleStart>, I>>(
    object: I
  ): ToSupervisor_BattleStart {
    const message = createBaseToSupervisor_BattleStart();
    message.battleNumber = object.battleNumber ?? 0;
    message.localPlayerIndex = object.localPlayerIndex ?? 0;
    return message;
  },
};

function createBaseToSupervisor_LocalState(): ToSupervisor_LocalState {
  return { state: new Uint8Array() };
}

export const ToSupervisor_LocalState = {
  encode(
    message: ToSupervisor_LocalState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.state.length !== 0) {
      writer.uint32(10).bytes(message.state);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ToSupervisor_LocalState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToSupervisor_LocalState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToSupervisor_LocalState {
    return {
      state: isSet(object.state)
        ? bytesFromBase64(object.state)
        : new Uint8Array(),
    };
  },

  toJSON(message: ToSupervisor_LocalState): unknown {
    const obj: any = {};
    message.state !== undefined &&
      (obj.state = base64FromBytes(
        message.state !== undefined ? message.state : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToSupervisor_LocalState>, I>>(
    object: I
  ): ToSupervisor_LocalState {
    const message = createBaseToSupervisor_LocalState();
    message.state = object.state ?? new Uint8Array();
    return message;
  },
};

function createBaseToSupervisor_BattleEnd(): ToSupervisor_BattleEnd {
  return { battleNumber: 0 };
}

export const ToSupervisor_BattleEnd = {
  encode(
    message: ToSupervisor_BattleEnd,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.battleNumber !== 0) {
      writer.uint32(8).uint32(message.battleNumber);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ToSupervisor_BattleEnd {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToSupervisor_BattleEnd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.battleNumber = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToSupervisor_BattleEnd {
    return {
      battleNumber: isSet(object.battleNumber)
        ? Number(object.battleNumber)
        : 0,
    };
  },

  toJSON(message: ToSupervisor_BattleEnd): unknown {
    const obj: any = {};
    message.battleNumber !== undefined &&
      (obj.battleNumber = Math.round(message.battleNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToSupervisor_BattleEnd>, I>>(
    object: I
  ): ToSupervisor_BattleEnd {
    const message = createBaseToSupervisor_BattleEnd();
    message.battleNumber = object.battleNumber ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
