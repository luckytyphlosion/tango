/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "tango.core.netplay";

export interface Packet {
  init: Packet_Init | undefined;
  state: Packet_State | undefined;
  input: Packet_Input | undefined;
}

export interface Packet_Init {
  battleNumber: number;
  inputDelay: number;
  marshaled: Uint8Array;
}

export interface Packet_State {
  state: Uint8Array;
}

export interface Packet_Input {
  battleNumber: number;
  localTick: number;
  remoteTick: number;
  joyflags: number;
  customScreenState: number;
  turn: Uint8Array;
}

function createBasePacket(): Packet {
  return { init: undefined, state: undefined, input: undefined };
}

export const Packet = {
  encode(
    message: Packet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.init !== undefined) {
      Packet_Init.encode(message.init, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      Packet_State.encode(message.state, writer.uint32(18).fork()).ldelim();
    }
    if (message.input !== undefined) {
      Packet_Input.encode(message.input, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.init = Packet_Init.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = Packet_State.decode(reader, reader.uint32());
          break;
        case 3:
          message.input = Packet_Input.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet {
    return {
      init: isSet(object.init) ? Packet_Init.fromJSON(object.init) : undefined,
      state: isSet(object.state)
        ? Packet_State.fromJSON(object.state)
        : undefined,
      input: isSet(object.input)
        ? Packet_Input.fromJSON(object.input)
        : undefined,
    };
  },

  toJSON(message: Packet): unknown {
    const obj: any = {};
    message.init !== undefined &&
      (obj.init = message.init ? Packet_Init.toJSON(message.init) : undefined);
    message.state !== undefined &&
      (obj.state = message.state
        ? Packet_State.toJSON(message.state)
        : undefined);
    message.input !== undefined &&
      (obj.input = message.input
        ? Packet_Input.toJSON(message.input)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet>, I>>(object: I): Packet {
    const message = createBasePacket();
    message.init =
      object.init !== undefined && object.init !== null
        ? Packet_Init.fromPartial(object.init)
        : undefined;
    message.state =
      object.state !== undefined && object.state !== null
        ? Packet_State.fromPartial(object.state)
        : undefined;
    message.input =
      object.input !== undefined && object.input !== null
        ? Packet_Input.fromPartial(object.input)
        : undefined;
    return message;
  },
};

function createBasePacket_Init(): Packet_Init {
  return { battleNumber: 0, inputDelay: 0, marshaled: new Uint8Array() };
}

export const Packet_Init = {
  encode(
    message: Packet_Init,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.battleNumber !== 0) {
      writer.uint32(8).uint32(message.battleNumber);
    }
    if (message.inputDelay !== 0) {
      writer.uint32(16).uint32(message.inputDelay);
    }
    if (message.marshaled.length !== 0) {
      writer.uint32(26).bytes(message.marshaled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet_Init {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket_Init();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.battleNumber = reader.uint32();
          break;
        case 2:
          message.inputDelay = reader.uint32();
          break;
        case 3:
          message.marshaled = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet_Init {
    return {
      battleNumber: isSet(object.battleNumber)
        ? Number(object.battleNumber)
        : 0,
      inputDelay: isSet(object.inputDelay) ? Number(object.inputDelay) : 0,
      marshaled: isSet(object.marshaled)
        ? bytesFromBase64(object.marshaled)
        : new Uint8Array(),
    };
  },

  toJSON(message: Packet_Init): unknown {
    const obj: any = {};
    message.battleNumber !== undefined &&
      (obj.battleNumber = Math.round(message.battleNumber));
    message.inputDelay !== undefined &&
      (obj.inputDelay = Math.round(message.inputDelay));
    message.marshaled !== undefined &&
      (obj.marshaled = base64FromBytes(
        message.marshaled !== undefined ? message.marshaled : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet_Init>, I>>(
    object: I
  ): Packet_Init {
    const message = createBasePacket_Init();
    message.battleNumber = object.battleNumber ?? 0;
    message.inputDelay = object.inputDelay ?? 0;
    message.marshaled = object.marshaled ?? new Uint8Array();
    return message;
  },
};

function createBasePacket_State(): Packet_State {
  return { state: new Uint8Array() };
}

export const Packet_State = {
  encode(
    message: Packet_State,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.state.length !== 0) {
      writer.uint32(10).bytes(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet_State {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket_State();
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

  fromJSON(object: any): Packet_State {
    return {
      state: isSet(object.state)
        ? bytesFromBase64(object.state)
        : new Uint8Array(),
    };
  },

  toJSON(message: Packet_State): unknown {
    const obj: any = {};
    message.state !== undefined &&
      (obj.state = base64FromBytes(
        message.state !== undefined ? message.state : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet_State>, I>>(
    object: I
  ): Packet_State {
    const message = createBasePacket_State();
    message.state = object.state ?? new Uint8Array();
    return message;
  },
};

function createBasePacket_Input(): Packet_Input {
  return {
    battleNumber: 0,
    localTick: 0,
    remoteTick: 0,
    joyflags: 0,
    customScreenState: 0,
    turn: new Uint8Array(),
  };
}

export const Packet_Input = {
  encode(
    message: Packet_Input,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.battleNumber !== 0) {
      writer.uint32(8).uint32(message.battleNumber);
    }
    if (message.localTick !== 0) {
      writer.uint32(16).uint32(message.localTick);
    }
    if (message.remoteTick !== 0) {
      writer.uint32(24).uint32(message.remoteTick);
    }
    if (message.joyflags !== 0) {
      writer.uint32(32).uint32(message.joyflags);
    }
    if (message.customScreenState !== 0) {
      writer.uint32(40).uint32(message.customScreenState);
    }
    if (message.turn.length !== 0) {
      writer.uint32(50).bytes(message.turn);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet_Input {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket_Input();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.battleNumber = reader.uint32();
          break;
        case 2:
          message.localTick = reader.uint32();
          break;
        case 3:
          message.remoteTick = reader.uint32();
          break;
        case 4:
          message.joyflags = reader.uint32();
          break;
        case 5:
          message.customScreenState = reader.uint32();
          break;
        case 6:
          message.turn = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet_Input {
    return {
      battleNumber: isSet(object.battleNumber)
        ? Number(object.battleNumber)
        : 0,
      localTick: isSet(object.localTick) ? Number(object.localTick) : 0,
      remoteTick: isSet(object.remoteTick) ? Number(object.remoteTick) : 0,
      joyflags: isSet(object.joyflags) ? Number(object.joyflags) : 0,
      customScreenState: isSet(object.customScreenState)
        ? Number(object.customScreenState)
        : 0,
      turn: isSet(object.turn)
        ? bytesFromBase64(object.turn)
        : new Uint8Array(),
    };
  },

  toJSON(message: Packet_Input): unknown {
    const obj: any = {};
    message.battleNumber !== undefined &&
      (obj.battleNumber = Math.round(message.battleNumber));
    message.localTick !== undefined &&
      (obj.localTick = Math.round(message.localTick));
    message.remoteTick !== undefined &&
      (obj.remoteTick = Math.round(message.remoteTick));
    message.joyflags !== undefined &&
      (obj.joyflags = Math.round(message.joyflags));
    message.customScreenState !== undefined &&
      (obj.customScreenState = Math.round(message.customScreenState));
    message.turn !== undefined &&
      (obj.turn = base64FromBytes(
        message.turn !== undefined ? message.turn : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet_Input>, I>>(
    object: I
  ): Packet_Input {
    const message = createBasePacket_Input();
    message.battleNumber = object.battleNumber ?? 0;
    message.localTick = object.localTick ?? 0;
    message.remoteTick = object.remoteTick ?? 0;
    message.joyflags = object.joyflags ?? 0;
    message.customScreenState = object.customScreenState ?? 0;
    message.turn = object.turn ?? new Uint8Array();
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
