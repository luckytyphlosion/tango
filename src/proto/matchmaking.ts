/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "tango.matchmaking";

export interface Packet {
  start: Packet_Start | undefined;
  offer: Packet_Offer | undefined;
  answer: Packet_Answer | undefined;
  iceCandidates: Packet_ICECandidates | undefined;
}

export interface Packet_Start {
  protocolVersion: number;
  sessionId: string;
  offerSdp: string;
}

export interface Packet_Offer {
  sdp: string;
}

export interface Packet_Answer {
  sdp: string;
}

export interface Packet_ICECandidates {
  iceCandidates: string[];
}

function createBasePacket(): Packet {
  return {
    start: undefined,
    offer: undefined,
    answer: undefined,
    iceCandidates: undefined,
  };
}

export const Packet = {
  encode(
    message: Packet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.start !== undefined) {
      Packet_Start.encode(message.start, writer.uint32(10).fork()).ldelim();
    }
    if (message.offer !== undefined) {
      Packet_Offer.encode(message.offer, writer.uint32(18).fork()).ldelim();
    }
    if (message.answer !== undefined) {
      Packet_Answer.encode(message.answer, writer.uint32(26).fork()).ldelim();
    }
    if (message.iceCandidates !== undefined) {
      Packet_ICECandidates.encode(
        message.iceCandidates,
        writer.uint32(34).fork()
      ).ldelim();
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
          message.start = Packet_Start.decode(reader, reader.uint32());
          break;
        case 2:
          message.offer = Packet_Offer.decode(reader, reader.uint32());
          break;
        case 3:
          message.answer = Packet_Answer.decode(reader, reader.uint32());
          break;
        case 4:
          message.iceCandidates = Packet_ICECandidates.decode(
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

  fromJSON(object: any): Packet {
    return {
      start: isSet(object.start)
        ? Packet_Start.fromJSON(object.start)
        : undefined,
      offer: isSet(object.offer)
        ? Packet_Offer.fromJSON(object.offer)
        : undefined,
      answer: isSet(object.answer)
        ? Packet_Answer.fromJSON(object.answer)
        : undefined,
      iceCandidates: isSet(object.iceCandidates)
        ? Packet_ICECandidates.fromJSON(object.iceCandidates)
        : undefined,
    };
  },

  toJSON(message: Packet): unknown {
    const obj: any = {};
    message.start !== undefined &&
      (obj.start = message.start
        ? Packet_Start.toJSON(message.start)
        : undefined);
    message.offer !== undefined &&
      (obj.offer = message.offer
        ? Packet_Offer.toJSON(message.offer)
        : undefined);
    message.answer !== undefined &&
      (obj.answer = message.answer
        ? Packet_Answer.toJSON(message.answer)
        : undefined);
    message.iceCandidates !== undefined &&
      (obj.iceCandidates = message.iceCandidates
        ? Packet_ICECandidates.toJSON(message.iceCandidates)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet>, I>>(object: I): Packet {
    const message = createBasePacket();
    message.start =
      object.start !== undefined && object.start !== null
        ? Packet_Start.fromPartial(object.start)
        : undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Packet_Offer.fromPartial(object.offer)
        : undefined;
    message.answer =
      object.answer !== undefined && object.answer !== null
        ? Packet_Answer.fromPartial(object.answer)
        : undefined;
    message.iceCandidates =
      object.iceCandidates !== undefined && object.iceCandidates !== null
        ? Packet_ICECandidates.fromPartial(object.iceCandidates)
        : undefined;
    return message;
  },
};

function createBasePacket_Start(): Packet_Start {
  return { protocolVersion: 0, sessionId: "", offerSdp: "" };
}

export const Packet_Start = {
  encode(
    message: Packet_Start,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.protocolVersion !== 0) {
      writer.uint32(8).uint32(message.protocolVersion);
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    if (message.offerSdp !== "") {
      writer.uint32(26).string(message.offerSdp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet_Start {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket_Start();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.protocolVersion = reader.uint32();
          break;
        case 2:
          message.sessionId = reader.string();
          break;
        case 3:
          message.offerSdp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet_Start {
    return {
      protocolVersion: isSet(object.protocolVersion)
        ? Number(object.protocolVersion)
        : 0,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      offerSdp: isSet(object.offerSdp) ? String(object.offerSdp) : "",
    };
  },

  toJSON(message: Packet_Start): unknown {
    const obj: any = {};
    message.protocolVersion !== undefined &&
      (obj.protocolVersion = Math.round(message.protocolVersion));
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    message.offerSdp !== undefined && (obj.offerSdp = message.offerSdp);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet_Start>, I>>(
    object: I
  ): Packet_Start {
    const message = createBasePacket_Start();
    message.protocolVersion = object.protocolVersion ?? 0;
    message.sessionId = object.sessionId ?? "";
    message.offerSdp = object.offerSdp ?? "";
    return message;
  },
};

function createBasePacket_Offer(): Packet_Offer {
  return { sdp: "" };
}

export const Packet_Offer = {
  encode(
    message: Packet_Offer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sdp !== "") {
      writer.uint32(10).string(message.sdp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet_Offer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket_Offer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sdp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet_Offer {
    return {
      sdp: isSet(object.sdp) ? String(object.sdp) : "",
    };
  },

  toJSON(message: Packet_Offer): unknown {
    const obj: any = {};
    message.sdp !== undefined && (obj.sdp = message.sdp);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet_Offer>, I>>(
    object: I
  ): Packet_Offer {
    const message = createBasePacket_Offer();
    message.sdp = object.sdp ?? "";
    return message;
  },
};

function createBasePacket_Answer(): Packet_Answer {
  return { sdp: "" };
}

export const Packet_Answer = {
  encode(
    message: Packet_Answer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sdp !== "") {
      writer.uint32(10).string(message.sdp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet_Answer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket_Answer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sdp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet_Answer {
    return {
      sdp: isSet(object.sdp) ? String(object.sdp) : "",
    };
  },

  toJSON(message: Packet_Answer): unknown {
    const obj: any = {};
    message.sdp !== undefined && (obj.sdp = message.sdp);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet_Answer>, I>>(
    object: I
  ): Packet_Answer {
    const message = createBasePacket_Answer();
    message.sdp = object.sdp ?? "";
    return message;
  },
};

function createBasePacket_ICECandidates(): Packet_ICECandidates {
  return { iceCandidates: [] };
}

export const Packet_ICECandidates = {
  encode(
    message: Packet_ICECandidates,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.iceCandidates) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Packet_ICECandidates {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket_ICECandidates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iceCandidates.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet_ICECandidates {
    return {
      iceCandidates: Array.isArray(object?.iceCandidates)
        ? object.iceCandidates.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: Packet_ICECandidates): unknown {
    const obj: any = {};
    if (message.iceCandidates) {
      obj.iceCandidates = message.iceCandidates.map((e) => e);
    } else {
      obj.iceCandidates = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet_ICECandidates>, I>>(
    object: I
  ): Packet_ICECandidates {
    const message = createBasePacket_ICECandidates();
    message.iceCandidates = object.iceCandidates?.map((e) => e) || [];
    return message;
  },
};

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
