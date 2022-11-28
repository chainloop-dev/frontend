/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { CraftingSchema } from "../../workflowcontract/v1/crafting_schema";

export const protobufPackage = "controlplane.v1";

export enum AllowListError {
  ALLOW_LIST_ERROR_UNSPECIFIED = 0,
  ALLOW_LIST_ERROR_NOT_IN_LIST = 1,
  UNRECOGNIZED = -1,
}

export function allowListErrorFromJSON(object: any): AllowListError {
  switch (object) {
    case 0:
    case "ALLOW_LIST_ERROR_UNSPECIFIED":
      return AllowListError.ALLOW_LIST_ERROR_UNSPECIFIED;
    case 1:
    case "ALLOW_LIST_ERROR_NOT_IN_LIST":
      return AllowListError.ALLOW_LIST_ERROR_NOT_IN_LIST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AllowListError.UNRECOGNIZED;
  }
}

export function allowListErrorToJSON(object: AllowListError): string {
  switch (object) {
    case AllowListError.ALLOW_LIST_ERROR_UNSPECIFIED:
      return "ALLOW_LIST_ERROR_UNSPECIFIED";
    case AllowListError.ALLOW_LIST_ERROR_NOT_IN_LIST:
      return "ALLOW_LIST_ERROR_NOT_IN_LIST";
    case AllowListError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface WorkflowItem {
  id: string;
  name: string;
  project: string;
  team: string;
  createdAt?: Date;
  runsCount: number;
  lastRun?: WorkflowRunItem;
  contractId: string;
}

export interface WorkflowRunItem {
  id: string;
  createdAt?: Date;
  finishedAt?: Date;
  state: string;
  reason: string;
  workflow?: WorkflowItem;
  jobUrl: string;
  runnerType: string;
}

export interface AttestationItem {
  id: string;
  createdAt?: Date;
  /** encoded DSEE envelope */
  envelope: Uint8Array;
  /** denormalized envelope/statement content */
  envVars: AttestationItem_EnvVariable[];
  materials: AttestationItem_Material[];
}

export interface AttestationItem_EnvVariable {
  name: string;
  value: string;
}

export interface AttestationItem_Material {
  name: string;
  value: string;
  /** Material type, i.e ARTIFACT */
  type: string;
}

export interface WorkflowContractItem {
  id: string;
  name: string;
  createdAt?: Date;
  latestRevision: number;
  /** Workflows associated with this contract */
  workflowIds: string[];
}

export interface WorkflowContractVersionItem {
  id: string;
  revision: number;
  createdAt?: Date;
  v1?: CraftingSchema | undefined;
}

export interface User {
  id: string;
  email: string;
  createdAt?: Date;
}

export interface Org {
  id: string;
  name: string;
  createdAt?: Date;
}

export interface OCIRepositoryItem {
  id: string;
  repo: string;
  createdAt?: Date;
}

function createBaseWorkflowItem(): WorkflowItem {
  return {
    id: "",
    name: "",
    project: "",
    team: "",
    createdAt: undefined,
    runsCount: 0,
    lastRun: undefined,
    contractId: "",
  };
}

export const WorkflowItem = {
  encode(message: WorkflowItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.project !== "") {
      writer.uint32(26).string(message.project);
    }
    if (message.team !== "") {
      writer.uint32(34).string(message.team);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.runsCount !== 0) {
      writer.uint32(48).int32(message.runsCount);
    }
    if (message.lastRun !== undefined) {
      WorkflowRunItem.encode(message.lastRun, writer.uint32(58).fork()).ldelim();
    }
    if (message.contractId !== "") {
      writer.uint32(66).string(message.contractId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.project = reader.string();
          break;
        case 4:
          message.team = reader.string();
          break;
        case 5:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.runsCount = reader.int32();
          break;
        case 7:
          message.lastRun = WorkflowRunItem.decode(reader, reader.uint32());
          break;
        case 8:
          message.contractId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WorkflowItem {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      project: isSet(object.project) ? String(object.project) : "",
      team: isSet(object.team) ? String(object.team) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      runsCount: isSet(object.runsCount) ? Number(object.runsCount) : 0,
      lastRun: isSet(object.lastRun) ? WorkflowRunItem.fromJSON(object.lastRun) : undefined,
      contractId: isSet(object.contractId) ? String(object.contractId) : "",
    };
  },

  toJSON(message: WorkflowItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.project !== undefined && (obj.project = message.project);
    message.team !== undefined && (obj.team = message.team);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.runsCount !== undefined && (obj.runsCount = Math.round(message.runsCount));
    message.lastRun !== undefined &&
      (obj.lastRun = message.lastRun ? WorkflowRunItem.toJSON(message.lastRun) : undefined);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WorkflowItem>, I>>(object: I): WorkflowItem {
    const message = createBaseWorkflowItem();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.project = object.project ?? "";
    message.team = object.team ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.runsCount = object.runsCount ?? 0;
    message.lastRun = (object.lastRun !== undefined && object.lastRun !== null)
      ? WorkflowRunItem.fromPartial(object.lastRun)
      : undefined;
    message.contractId = object.contractId ?? "";
    return message;
  },
};

function createBaseWorkflowRunItem(): WorkflowRunItem {
  return {
    id: "",
    createdAt: undefined,
    finishedAt: undefined,
    state: "",
    reason: "",
    workflow: undefined,
    jobUrl: "",
    runnerType: "",
  };
}

export const WorkflowRunItem = {
  encode(message: WorkflowRunItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.finishedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.finishedAt), writer.uint32(26).fork()).ldelim();
    }
    if (message.state !== "") {
      writer.uint32(34).string(message.state);
    }
    if (message.reason !== "") {
      writer.uint32(42).string(message.reason);
    }
    if (message.workflow !== undefined) {
      WorkflowItem.encode(message.workflow, writer.uint32(50).fork()).ldelim();
    }
    if (message.jobUrl !== "") {
      writer.uint32(58).string(message.jobUrl);
    }
    if (message.runnerType !== "") {
      writer.uint32(66).string(message.runnerType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowRunItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowRunItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.finishedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.state = reader.string();
          break;
        case 5:
          message.reason = reader.string();
          break;
        case 6:
          message.workflow = WorkflowItem.decode(reader, reader.uint32());
          break;
        case 7:
          message.jobUrl = reader.string();
          break;
        case 8:
          message.runnerType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WorkflowRunItem {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      finishedAt: isSet(object.finishedAt) ? fromJsonTimestamp(object.finishedAt) : undefined,
      state: isSet(object.state) ? String(object.state) : "",
      reason: isSet(object.reason) ? String(object.reason) : "",
      workflow: isSet(object.workflow) ? WorkflowItem.fromJSON(object.workflow) : undefined,
      jobUrl: isSet(object.jobUrl) ? String(object.jobUrl) : "",
      runnerType: isSet(object.runnerType) ? String(object.runnerType) : "",
    };
  },

  toJSON(message: WorkflowRunItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.finishedAt !== undefined && (obj.finishedAt = message.finishedAt.toISOString());
    message.state !== undefined && (obj.state = message.state);
    message.reason !== undefined && (obj.reason = message.reason);
    message.workflow !== undefined &&
      (obj.workflow = message.workflow ? WorkflowItem.toJSON(message.workflow) : undefined);
    message.jobUrl !== undefined && (obj.jobUrl = message.jobUrl);
    message.runnerType !== undefined && (obj.runnerType = message.runnerType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WorkflowRunItem>, I>>(object: I): WorkflowRunItem {
    const message = createBaseWorkflowRunItem();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.finishedAt = object.finishedAt ?? undefined;
    message.state = object.state ?? "";
    message.reason = object.reason ?? "";
    message.workflow = (object.workflow !== undefined && object.workflow !== null)
      ? WorkflowItem.fromPartial(object.workflow)
      : undefined;
    message.jobUrl = object.jobUrl ?? "";
    message.runnerType = object.runnerType ?? "";
    return message;
  },
};

function createBaseAttestationItem(): AttestationItem {
  return { id: "", createdAt: undefined, envelope: new Uint8Array(), envVars: [], materials: [] };
}

export const AttestationItem = {
  encode(message: AttestationItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.envelope.length !== 0) {
      writer.uint32(26).bytes(message.envelope);
    }
    for (const v of message.envVars) {
      AttestationItem_EnvVariable.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.materials) {
      AttestationItem_Material.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttestationItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestationItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.envelope = reader.bytes();
          break;
        case 4:
          message.envVars.push(AttestationItem_EnvVariable.decode(reader, reader.uint32()));
          break;
        case 5:
          message.materials.push(AttestationItem_Material.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AttestationItem {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      envelope: isSet(object.envelope) ? bytesFromBase64(object.envelope) : new Uint8Array(),
      envVars: Array.isArray(object?.envVars)
        ? object.envVars.map((e: any) => AttestationItem_EnvVariable.fromJSON(e))
        : [],
      materials: Array.isArray(object?.materials)
        ? object.materials.map((e: any) => AttestationItem_Material.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AttestationItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.envelope !== undefined &&
      (obj.envelope = base64FromBytes(message.envelope !== undefined ? message.envelope : new Uint8Array()));
    if (message.envVars) {
      obj.envVars = message.envVars.map((e) => e ? AttestationItem_EnvVariable.toJSON(e) : undefined);
    } else {
      obj.envVars = [];
    }
    if (message.materials) {
      obj.materials = message.materials.map((e) => e ? AttestationItem_Material.toJSON(e) : undefined);
    } else {
      obj.materials = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AttestationItem>, I>>(object: I): AttestationItem {
    const message = createBaseAttestationItem();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.envelope = object.envelope ?? new Uint8Array();
    message.envVars = object.envVars?.map((e) => AttestationItem_EnvVariable.fromPartial(e)) || [];
    message.materials = object.materials?.map((e) => AttestationItem_Material.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAttestationItem_EnvVariable(): AttestationItem_EnvVariable {
  return { name: "", value: "" };
}

export const AttestationItem_EnvVariable = {
  encode(message: AttestationItem_EnvVariable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttestationItem_EnvVariable {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestationItem_EnvVariable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AttestationItem_EnvVariable {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: AttestationItem_EnvVariable): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AttestationItem_EnvVariable>, I>>(object: I): AttestationItem_EnvVariable {
    const message = createBaseAttestationItem_EnvVariable();
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAttestationItem_Material(): AttestationItem_Material {
  return { name: "", value: "", type: "" };
}

export const AttestationItem_Material = {
  encode(message: AttestationItem_Material, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttestationItem_Material {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestationItem_Material();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        case 3:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AttestationItem_Material {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      value: isSet(object.value) ? String(object.value) : "",
      type: isSet(object.type) ? String(object.type) : "",
    };
  },

  toJSON(message: AttestationItem_Material): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.value !== undefined && (obj.value = message.value);
    message.type !== undefined && (obj.type = message.type);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AttestationItem_Material>, I>>(object: I): AttestationItem_Material {
    const message = createBaseAttestationItem_Material();
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseWorkflowContractItem(): WorkflowContractItem {
  return { id: "", name: "", createdAt: undefined, latestRevision: 0, workflowIds: [] };
}

export const WorkflowContractItem = {
  encode(message: WorkflowContractItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(26).fork()).ldelim();
    }
    if (message.latestRevision !== 0) {
      writer.uint32(32).int32(message.latestRevision);
    }
    for (const v of message.workflowIds) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowContractItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowContractItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.latestRevision = reader.int32();
          break;
        case 5:
          message.workflowIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WorkflowContractItem {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      latestRevision: isSet(object.latestRevision) ? Number(object.latestRevision) : 0,
      workflowIds: Array.isArray(object?.workflowIds) ? object.workflowIds.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: WorkflowContractItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.latestRevision !== undefined && (obj.latestRevision = Math.round(message.latestRevision));
    if (message.workflowIds) {
      obj.workflowIds = message.workflowIds.map((e) => e);
    } else {
      obj.workflowIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WorkflowContractItem>, I>>(object: I): WorkflowContractItem {
    const message = createBaseWorkflowContractItem();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.latestRevision = object.latestRevision ?? 0;
    message.workflowIds = object.workflowIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseWorkflowContractVersionItem(): WorkflowContractVersionItem {
  return { id: "", revision: 0, createdAt: undefined, v1: undefined };
}

export const WorkflowContractVersionItem = {
  encode(message: WorkflowContractVersionItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.revision !== 0) {
      writer.uint32(16).int32(message.revision);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(26).fork()).ldelim();
    }
    if (message.v1 !== undefined) {
      CraftingSchema.encode(message.v1, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowContractVersionItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowContractVersionItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.revision = reader.int32();
          break;
        case 3:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.v1 = CraftingSchema.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WorkflowContractVersionItem {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      revision: isSet(object.revision) ? Number(object.revision) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      v1: isSet(object.v1) ? CraftingSchema.fromJSON(object.v1) : undefined,
    };
  },

  toJSON(message: WorkflowContractVersionItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.revision !== undefined && (obj.revision = Math.round(message.revision));
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.v1 !== undefined && (obj.v1 = message.v1 ? CraftingSchema.toJSON(message.v1) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WorkflowContractVersionItem>, I>>(object: I): WorkflowContractVersionItem {
    const message = createBaseWorkflowContractVersionItem();
    message.id = object.id ?? "";
    message.revision = object.revision ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.v1 = (object.v1 !== undefined && object.v1 !== null) ? CraftingSchema.fromPartial(object.v1) : undefined;
    return message;
  },
};

function createBaseUser(): User {
  return { id: "", email: "", createdAt: undefined };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      email: isSet(object.email) ? String(object.email) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.email !== undefined && (obj.email = message.email);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.createdAt = object.createdAt ?? undefined;
    return message;
  },
};

function createBaseOrg(): Org {
  return { id: "", name: "", createdAt: undefined };
}

export const Org = {
  encode(message: Org, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Org {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Org {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
    };
  },

  toJSON(message: Org): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Org>, I>>(object: I): Org {
    const message = createBaseOrg();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.createdAt = object.createdAt ?? undefined;
    return message;
  },
};

function createBaseOCIRepositoryItem(): OCIRepositoryItem {
  return { id: "", repo: "", createdAt: undefined };
}

export const OCIRepositoryItem = {
  encode(message: OCIRepositoryItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.repo !== "") {
      writer.uint32(18).string(message.repo);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OCIRepositoryItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOCIRepositoryItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.repo = reader.string();
          break;
        case 3:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OCIRepositoryItem {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      repo: isSet(object.repo) ? String(object.repo) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
    };
  },

  toJSON(message: OCIRepositoryItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.repo !== undefined && (obj.repo = message.repo);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OCIRepositoryItem>, I>>(object: I): OCIRepositoryItem {
    const message = createBaseOCIRepositoryItem();
    message.id = object.id ?? "";
    message.repo = object.repo ?? "";
    message.createdAt = object.createdAt ?? undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
