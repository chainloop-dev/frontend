/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "controlplane.v1";

export interface PaginationResponse {
  nextCursor: string;
  prevCursor: string;
}

export interface PaginationRequest {
  cursor: string;
  direction: PaginationRequest_Direction;
  /** Limit pagination to 100 */
  limit: number;
}

/** nolint:ENUM_VALUE_PREFIX */
export enum PaginationRequest_Direction {
  DIRECTION_NEXT_PAGE = 0,
  DIRECTION_PREV_PAGE = 1,
  UNRECOGNIZED = -1,
}

export function paginationRequest_DirectionFromJSON(object: any): PaginationRequest_Direction {
  switch (object) {
    case 0:
    case "DIRECTION_NEXT_PAGE":
      return PaginationRequest_Direction.DIRECTION_NEXT_PAGE;
    case 1:
    case "DIRECTION_PREV_PAGE":
      return PaginationRequest_Direction.DIRECTION_PREV_PAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PaginationRequest_Direction.UNRECOGNIZED;
  }
}

export function paginationRequest_DirectionToJSON(object: PaginationRequest_Direction): string {
  switch (object) {
    case PaginationRequest_Direction.DIRECTION_NEXT_PAGE:
      return "DIRECTION_NEXT_PAGE";
    case PaginationRequest_Direction.DIRECTION_PREV_PAGE:
      return "DIRECTION_PREV_PAGE";
    case PaginationRequest_Direction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBasePaginationResponse(): PaginationResponse {
  return { nextCursor: "", prevCursor: "" };
}

export const PaginationResponse = {
  encode(message: PaginationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nextCursor !== "") {
      writer.uint32(10).string(message.nextCursor);
    }
    if (message.prevCursor !== "") {
      writer.uint32(18).string(message.prevCursor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaginationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaginationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextCursor = reader.string();
          break;
        case 2:
          message.prevCursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaginationResponse {
    return {
      nextCursor: isSet(object.nextCursor) ? String(object.nextCursor) : "",
      prevCursor: isSet(object.prevCursor) ? String(object.prevCursor) : "",
    };
  },

  toJSON(message: PaginationResponse): unknown {
    const obj: any = {};
    message.nextCursor !== undefined && (obj.nextCursor = message.nextCursor);
    message.prevCursor !== undefined && (obj.prevCursor = message.prevCursor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PaginationResponse>, I>>(object: I): PaginationResponse {
    const message = createBasePaginationResponse();
    message.nextCursor = object.nextCursor ?? "";
    message.prevCursor = object.prevCursor ?? "";
    return message;
  },
};

function createBasePaginationRequest(): PaginationRequest {
  return { cursor: "", direction: 0, limit: 0 };
}

export const PaginationRequest = {
  encode(message: PaginationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cursor !== "") {
      writer.uint32(10).string(message.cursor);
    }
    if (message.direction !== 0) {
      writer.uint32(16).int32(message.direction);
    }
    if (message.limit !== 0) {
      writer.uint32(24).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaginationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaginationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cursor = reader.string();
          break;
        case 2:
          message.direction = reader.int32() as any;
          break;
        case 3:
          message.limit = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaginationRequest {
    return {
      cursor: isSet(object.cursor) ? String(object.cursor) : "",
      direction: isSet(object.direction) ? paginationRequest_DirectionFromJSON(object.direction) : 0,
      limit: isSet(object.limit) ? Number(object.limit) : 0,
    };
  },

  toJSON(message: PaginationRequest): unknown {
    const obj: any = {};
    message.cursor !== undefined && (obj.cursor = message.cursor);
    message.direction !== undefined && (obj.direction = paginationRequest_DirectionToJSON(message.direction));
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PaginationRequest>, I>>(object: I): PaginationRequest {
    const message = createBasePaginationRequest();
    message.cursor = object.cursor ?? "";
    message.direction = object.direction ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
