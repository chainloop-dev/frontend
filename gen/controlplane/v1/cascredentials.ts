/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "controlplane.v1";

export interface CASCredentialsServiceGetRequest {
  role: CASCredentialsServiceGetRequest_Role;
}

export enum CASCredentialsServiceGetRequest_Role {
  ROLE_UNSPECIFIED = 0,
  ROLE_DOWNLOADER = 1,
  ROLE_UPLOADER = 2,
  UNRECOGNIZED = -1,
}

export function cASCredentialsServiceGetRequest_RoleFromJSON(object: any): CASCredentialsServiceGetRequest_Role {
  switch (object) {
    case 0:
    case "ROLE_UNSPECIFIED":
      return CASCredentialsServiceGetRequest_Role.ROLE_UNSPECIFIED;
    case 1:
    case "ROLE_DOWNLOADER":
      return CASCredentialsServiceGetRequest_Role.ROLE_DOWNLOADER;
    case 2:
    case "ROLE_UPLOADER":
      return CASCredentialsServiceGetRequest_Role.ROLE_UPLOADER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CASCredentialsServiceGetRequest_Role.UNRECOGNIZED;
  }
}

export function cASCredentialsServiceGetRequest_RoleToJSON(object: CASCredentialsServiceGetRequest_Role): string {
  switch (object) {
    case CASCredentialsServiceGetRequest_Role.ROLE_UNSPECIFIED:
      return "ROLE_UNSPECIFIED";
    case CASCredentialsServiceGetRequest_Role.ROLE_DOWNLOADER:
      return "ROLE_DOWNLOADER";
    case CASCredentialsServiceGetRequest_Role.ROLE_UPLOADER:
      return "ROLE_UPLOADER";
    case CASCredentialsServiceGetRequest_Role.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CASCredentialsServiceGetResponse {
  result?: CASCredentialsServiceGetResponse_Result;
}

export interface CASCredentialsServiceGetResponse_Result {
  token: string;
}

function createBaseCASCredentialsServiceGetRequest(): CASCredentialsServiceGetRequest {
  return { role: 0 };
}

export const CASCredentialsServiceGetRequest = {
  encode(message: CASCredentialsServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.role !== 0) {
      writer.uint32(8).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CASCredentialsServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCASCredentialsServiceGetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CASCredentialsServiceGetRequest {
    return { role: isSet(object.role) ? cASCredentialsServiceGetRequest_RoleFromJSON(object.role) : 0 };
  },

  toJSON(message: CASCredentialsServiceGetRequest): unknown {
    const obj: any = {};
    message.role !== undefined && (obj.role = cASCredentialsServiceGetRequest_RoleToJSON(message.role));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CASCredentialsServiceGetRequest>, I>>(
    object: I,
  ): CASCredentialsServiceGetRequest {
    const message = createBaseCASCredentialsServiceGetRequest();
    message.role = object.role ?? 0;
    return message;
  },
};

function createBaseCASCredentialsServiceGetResponse(): CASCredentialsServiceGetResponse {
  return { result: undefined };
}

export const CASCredentialsServiceGetResponse = {
  encode(message: CASCredentialsServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      CASCredentialsServiceGetResponse_Result.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CASCredentialsServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCASCredentialsServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = CASCredentialsServiceGetResponse_Result.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CASCredentialsServiceGetResponse {
    return {
      result: isSet(object.result) ? CASCredentialsServiceGetResponse_Result.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: CASCredentialsServiceGetResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = message.result ? CASCredentialsServiceGetResponse_Result.toJSON(message.result) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CASCredentialsServiceGetResponse>, I>>(
    object: I,
  ): CASCredentialsServiceGetResponse {
    const message = createBaseCASCredentialsServiceGetResponse();
    message.result = (object.result !== undefined && object.result !== null)
      ? CASCredentialsServiceGetResponse_Result.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseCASCredentialsServiceGetResponse_Result(): CASCredentialsServiceGetResponse_Result {
  return { token: "" };
}

export const CASCredentialsServiceGetResponse_Result = {
  encode(message: CASCredentialsServiceGetResponse_Result, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CASCredentialsServiceGetResponse_Result {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCASCredentialsServiceGetResponse_Result();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CASCredentialsServiceGetResponse_Result {
    return { token: isSet(object.token) ? String(object.token) : "" };
  },

  toJSON(message: CASCredentialsServiceGetResponse_Result): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CASCredentialsServiceGetResponse_Result>, I>>(
    object: I,
  ): CASCredentialsServiceGetResponse_Result {
    const message = createBaseCASCredentialsServiceGetResponse_Result();
    message.token = object.token ?? "";
    return message;
  },
};

export interface CASCredentialsService {
  Get(
    request: DeepPartial<CASCredentialsServiceGetRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CASCredentialsServiceGetResponse>;
}

export class CASCredentialsServiceClientImpl implements CASCredentialsService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Get = this.Get.bind(this);
  }

  Get(
    request: DeepPartial<CASCredentialsServiceGetRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CASCredentialsServiceGetResponse> {
    return this.rpc.unary(CASCredentialsServiceGetDesc, CASCredentialsServiceGetRequest.fromPartial(request), metadata);
  }
}

export const CASCredentialsServiceDesc = { serviceName: "controlplane.v1.CASCredentialsService" };

export const CASCredentialsServiceGetDesc: UnaryMethodDefinitionish = {
  methodName: "Get",
  service: CASCredentialsServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CASCredentialsServiceGetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...CASCredentialsServiceGetResponse.decode(data),
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
