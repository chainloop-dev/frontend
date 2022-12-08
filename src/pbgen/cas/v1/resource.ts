/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cas.v1";

export interface ResourceServiceDescribeRequest {
  digest: string;
}

export interface ResourceServiceDescribeResponse {
  result?: CASResource;
}

export interface CASResource {
  fileName: string;
  digest: string;
}

function createBaseResourceServiceDescribeRequest(): ResourceServiceDescribeRequest {
  return { digest: "" };
}

export const ResourceServiceDescribeRequest = {
  encode(message: ResourceServiceDescribeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.digest !== "") {
      writer.uint32(10).string(message.digest);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceServiceDescribeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceServiceDescribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.digest = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResourceServiceDescribeRequest {
    return { digest: isSet(object.digest) ? String(object.digest) : "" };
  },

  toJSON(message: ResourceServiceDescribeRequest): unknown {
    const obj: any = {};
    message.digest !== undefined && (obj.digest = message.digest);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResourceServiceDescribeRequest>, I>>(
    object: I,
  ): ResourceServiceDescribeRequest {
    const message = createBaseResourceServiceDescribeRequest();
    message.digest = object.digest ?? "";
    return message;
  },
};

function createBaseResourceServiceDescribeResponse(): ResourceServiceDescribeResponse {
  return { result: undefined };
}

export const ResourceServiceDescribeResponse = {
  encode(message: ResourceServiceDescribeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      CASResource.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceServiceDescribeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceServiceDescribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = CASResource.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResourceServiceDescribeResponse {
    return { result: isSet(object.result) ? CASResource.fromJSON(object.result) : undefined };
  },

  toJSON(message: ResourceServiceDescribeResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result ? CASResource.toJSON(message.result) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResourceServiceDescribeResponse>, I>>(
    object: I,
  ): ResourceServiceDescribeResponse {
    const message = createBaseResourceServiceDescribeResponse();
    message.result = (object.result !== undefined && object.result !== null)
      ? CASResource.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseCASResource(): CASResource {
  return { fileName: "", digest: "" };
}

export const CASResource = {
  encode(message: CASResource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fileName !== "") {
      writer.uint32(10).string(message.fileName);
    }
    if (message.digest !== "") {
      writer.uint32(18).string(message.digest);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CASResource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCASResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileName = reader.string();
          break;
        case 2:
          message.digest = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CASResource {
    return {
      fileName: isSet(object.fileName) ? String(object.fileName) : "",
      digest: isSet(object.digest) ? String(object.digest) : "",
    };
  },

  toJSON(message: CASResource): unknown {
    const obj: any = {};
    message.fileName !== undefined && (obj.fileName = message.fileName);
    message.digest !== undefined && (obj.digest = message.digest);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CASResource>, I>>(object: I): CASResource {
    const message = createBaseCASResource();
    message.fileName = object.fileName ?? "";
    message.digest = object.digest ?? "";
    return message;
  },
};

export interface ResourceService {
  Describe(
    request: DeepPartial<ResourceServiceDescribeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ResourceServiceDescribeResponse>;
}

export class ResourceServiceClientImpl implements ResourceService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Describe = this.Describe.bind(this);
  }

  Describe(
    request: DeepPartial<ResourceServiceDescribeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ResourceServiceDescribeResponse> {
    return this.rpc.unary(ResourceServiceDescribeDesc, ResourceServiceDescribeRequest.fromPartial(request), metadata);
  }
}

export const ResourceServiceDesc = { serviceName: "cas.v1.ResourceService" };

export const ResourceServiceDescribeDesc: UnaryMethodDefinitionish = {
  methodName: "Describe",
  service: ResourceServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ResourceServiceDescribeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...ResourceServiceDescribeResponse.decode(data),
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
