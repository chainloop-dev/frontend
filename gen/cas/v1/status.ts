/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cas.v1";

export interface InfozRequest {
}

export interface InfozResponse {
  version: string;
}

export interface StatuszRequest {
  /**
   * Parameter that can be used by readiness probes
   * The main difference is that readiness probes will take into account that all
   * dependent services are up and ready
   */
  readiness: boolean;
}

export interface StatuszResponse {
}

function createBaseInfozRequest(): InfozRequest {
  return {};
}

export const InfozRequest = {
  encode(_: InfozRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfozRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfozRequest();
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

  fromJSON(_: any): InfozRequest {
    return {};
  },

  toJSON(_: InfozRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InfozRequest>, I>>(_: I): InfozRequest {
    const message = createBaseInfozRequest();
    return message;
  },
};

function createBaseInfozResponse(): InfozResponse {
  return { version: "" };
}

export const InfozResponse = {
  encode(message: InfozResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfozResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfozResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InfozResponse {
    return { version: isSet(object.version) ? String(object.version) : "" };
  },

  toJSON(message: InfozResponse): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InfozResponse>, I>>(object: I): InfozResponse {
    const message = createBaseInfozResponse();
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseStatuszRequest(): StatuszRequest {
  return { readiness: false };
}

export const StatuszRequest = {
  encode(message: StatuszRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.readiness === true) {
      writer.uint32(8).bool(message.readiness);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatuszRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatuszRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.readiness = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatuszRequest {
    return { readiness: isSet(object.readiness) ? Boolean(object.readiness) : false };
  },

  toJSON(message: StatuszRequest): unknown {
    const obj: any = {};
    message.readiness !== undefined && (obj.readiness = message.readiness);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatuszRequest>, I>>(object: I): StatuszRequest {
    const message = createBaseStatuszRequest();
    message.readiness = object.readiness ?? false;
    return message;
  },
};

function createBaseStatuszResponse(): StatuszResponse {
  return {};
}

export const StatuszResponse = {
  encode(_: StatuszResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatuszResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatuszResponse();
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

  fromJSON(_: any): StatuszResponse {
    return {};
  },

  toJSON(_: StatuszResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatuszResponse>, I>>(_: I): StatuszResponse {
    const message = createBaseStatuszResponse();
    return message;
  },
};

export interface StatusService {
  Infoz(request: DeepPartial<InfozRequest>, metadata?: grpc.Metadata): Promise<InfozResponse>;
  Statusz(request: DeepPartial<StatuszRequest>, metadata?: grpc.Metadata): Promise<StatuszResponse>;
}

export class StatusServiceClientImpl implements StatusService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Infoz = this.Infoz.bind(this);
    this.Statusz = this.Statusz.bind(this);
  }

  Infoz(request: DeepPartial<InfozRequest>, metadata?: grpc.Metadata): Promise<InfozResponse> {
    return this.rpc.unary(StatusServiceInfozDesc, InfozRequest.fromPartial(request), metadata);
  }

  Statusz(request: DeepPartial<StatuszRequest>, metadata?: grpc.Metadata): Promise<StatuszResponse> {
    return this.rpc.unary(StatusServiceStatuszDesc, StatuszRequest.fromPartial(request), metadata);
  }
}

export const StatusServiceDesc = { serviceName: "cas.v1.StatusService" };

export const StatusServiceInfozDesc: UnaryMethodDefinitionish = {
  methodName: "Infoz",
  service: StatusServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return InfozRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...InfozResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const StatusServiceStatuszDesc: UnaryMethodDefinitionish = {
  methodName: "Statusz",
  service: StatusServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return StatuszRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...StatuszResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
}

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

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
