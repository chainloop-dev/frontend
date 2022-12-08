/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import {
  CraftingSchema,
  CraftingSchema_Material_MaterialType,
  craftingSchema_Material_MaterialTypeFromJSON,
  craftingSchema_Material_MaterialTypeToJSON,
  CraftingSchema_Runner_RunnerType,
  craftingSchema_Runner_RunnerTypeFromJSON,
  craftingSchema_Runner_RunnerTypeToJSON,
} from "../../../workflowcontract/v1/crafting_schema";

export const protobufPackage = "cli.attestation.v1";

export interface Attestation {
  initializedAt?: Date;
  finishedAt?: Date;
  workflow?: WorkflowMetadata;
  materials: { [key: string]: Attestation_Material };
  /** List of env variables */
  envVars: { [key: string]: string };
  runnerUrl: string;
  runnerType: CraftingSchema_Runner_RunnerType;
}

export interface Attestation_MaterialsEntry {
  key: string;
  value?: Attestation_Material;
}

export interface Attestation_Material {
  string?: Attestation_Material_KeyVal | undefined;
  containerImage?: Attestation_Material_ContainerImage | undefined;
  artifact?: Attestation_Material_Artifact | undefined;
  addedAt?: Date;
  materialType: CraftingSchema_Material_MaterialType;
}

export interface Attestation_Material_KeyVal {
  id: string;
  value: string;
}

export interface Attestation_Material_ContainerImage {
  id: string;
  name: string;
  digest: string;
  isSubject: boolean;
}

export interface Attestation_Material_Artifact {
  /** ID of the artifact */
  id: string;
  /** filename, use for record purposes */
  name: string;
  /**
   * the digest is enough to retrieve the artifact since it's stored in a CAS
   * which also has annotated the fileName
   */
  digest: string;
  isSubject: boolean;
}

export interface Attestation_EnvVarsEntry {
  key: string;
  value: string;
}

/** Intermediate information that will get stored in the system while the run is being executed */
export interface CraftingState {
  inputSchema?: CraftingSchema;
  attestation?: Attestation;
  dryRun: boolean;
}

export interface WorkflowMetadata {
  name: string;
  project: string;
  team: string;
  workflowId: string;
  /** Not required since we might be doing a dry-run */
  workflowRunId: string;
  schemaRevision: string;
}

function createBaseAttestation(): Attestation {
  return {
    initializedAt: undefined,
    finishedAt: undefined,
    workflow: undefined,
    materials: {},
    envVars: {},
    runnerUrl: "",
    runnerType: 0,
  };
}

export const Attestation = {
  encode(message: Attestation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.initializedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.initializedAt), writer.uint32(10).fork()).ldelim();
    }
    if (message.finishedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.finishedAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.workflow !== undefined) {
      WorkflowMetadata.encode(message.workflow, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.materials).forEach(([key, value]) => {
      Attestation_MaterialsEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    Object.entries(message.envVars).forEach(([key, value]) => {
      Attestation_EnvVarsEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    if (message.runnerUrl !== "") {
      writer.uint32(58).string(message.runnerUrl);
    }
    if (message.runnerType !== 0) {
      writer.uint32(64).int32(message.runnerType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attestation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.initializedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.finishedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.workflow = WorkflowMetadata.decode(reader, reader.uint32());
          break;
        case 4:
          const entry4 = Attestation_MaterialsEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.materials[entry4.key] = entry4.value;
          }
          break;
        case 6:
          const entry6 = Attestation_EnvVarsEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.envVars[entry6.key] = entry6.value;
          }
          break;
        case 7:
          message.runnerUrl = reader.string();
          break;
        case 8:
          message.runnerType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Attestation {
    return {
      initializedAt: isSet(object.initializedAt) ? fromJsonTimestamp(object.initializedAt) : undefined,
      finishedAt: isSet(object.finishedAt) ? fromJsonTimestamp(object.finishedAt) : undefined,
      workflow: isSet(object.workflow) ? WorkflowMetadata.fromJSON(object.workflow) : undefined,
      materials: isObject(object.materials)
        ? Object.entries(object.materials).reduce<{ [key: string]: Attestation_Material }>((acc, [key, value]) => {
          acc[key] = Attestation_Material.fromJSON(value);
          return acc;
        }, {})
        : {},
      envVars: isObject(object.envVars)
        ? Object.entries(object.envVars).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      runnerUrl: isSet(object.runnerUrl) ? String(object.runnerUrl) : "",
      runnerType: isSet(object.runnerType) ? craftingSchema_Runner_RunnerTypeFromJSON(object.runnerType) : 0,
    };
  },

  toJSON(message: Attestation): unknown {
    const obj: any = {};
    message.initializedAt !== undefined && (obj.initializedAt = message.initializedAt.toISOString());
    message.finishedAt !== undefined && (obj.finishedAt = message.finishedAt.toISOString());
    message.workflow !== undefined &&
      (obj.workflow = message.workflow ? WorkflowMetadata.toJSON(message.workflow) : undefined);
    obj.materials = {};
    if (message.materials) {
      Object.entries(message.materials).forEach(([k, v]) => {
        obj.materials[k] = Attestation_Material.toJSON(v);
      });
    }
    obj.envVars = {};
    if (message.envVars) {
      Object.entries(message.envVars).forEach(([k, v]) => {
        obj.envVars[k] = v;
      });
    }
    message.runnerUrl !== undefined && (obj.runnerUrl = message.runnerUrl);
    message.runnerType !== undefined && (obj.runnerType = craftingSchema_Runner_RunnerTypeToJSON(message.runnerType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attestation>, I>>(object: I): Attestation {
    const message = createBaseAttestation();
    message.initializedAt = object.initializedAt ?? undefined;
    message.finishedAt = object.finishedAt ?? undefined;
    message.workflow = (object.workflow !== undefined && object.workflow !== null)
      ? WorkflowMetadata.fromPartial(object.workflow)
      : undefined;
    message.materials = Object.entries(object.materials ?? {}).reduce<{ [key: string]: Attestation_Material }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Attestation_Material.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.envVars = Object.entries(object.envVars ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.runnerUrl = object.runnerUrl ?? "";
    message.runnerType = object.runnerType ?? 0;
    return message;
  },
};

function createBaseAttestation_MaterialsEntry(): Attestation_MaterialsEntry {
  return { key: "", value: undefined };
}

export const Attestation_MaterialsEntry = {
  encode(message: Attestation_MaterialsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Attestation_Material.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attestation_MaterialsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestation_MaterialsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Attestation_Material.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Attestation_MaterialsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Attestation_Material.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Attestation_MaterialsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Attestation_Material.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attestation_MaterialsEntry>, I>>(object: I): Attestation_MaterialsEntry {
    const message = createBaseAttestation_MaterialsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? Attestation_Material.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseAttestation_Material(): Attestation_Material {
  return { string: undefined, containerImage: undefined, artifact: undefined, addedAt: undefined, materialType: 0 };
}

export const Attestation_Material = {
  encode(message: Attestation_Material, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.string !== undefined) {
      Attestation_Material_KeyVal.encode(message.string, writer.uint32(10).fork()).ldelim();
    }
    if (message.containerImage !== undefined) {
      Attestation_Material_ContainerImage.encode(message.containerImage, writer.uint32(18).fork()).ldelim();
    }
    if (message.artifact !== undefined) {
      Attestation_Material_Artifact.encode(message.artifact, writer.uint32(26).fork()).ldelim();
    }
    if (message.addedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.addedAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.materialType !== 0) {
      writer.uint32(48).int32(message.materialType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attestation_Material {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestation_Material();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.string = Attestation_Material_KeyVal.decode(reader, reader.uint32());
          break;
        case 2:
          message.containerImage = Attestation_Material_ContainerImage.decode(reader, reader.uint32());
          break;
        case 3:
          message.artifact = Attestation_Material_Artifact.decode(reader, reader.uint32());
          break;
        case 5:
          message.addedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.materialType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Attestation_Material {
    return {
      string: isSet(object.string) ? Attestation_Material_KeyVal.fromJSON(object.string) : undefined,
      containerImage: isSet(object.containerImage)
        ? Attestation_Material_ContainerImage.fromJSON(object.containerImage)
        : undefined,
      artifact: isSet(object.artifact) ? Attestation_Material_Artifact.fromJSON(object.artifact) : undefined,
      addedAt: isSet(object.addedAt) ? fromJsonTimestamp(object.addedAt) : undefined,
      materialType: isSet(object.materialType) ? craftingSchema_Material_MaterialTypeFromJSON(object.materialType) : 0,
    };
  },

  toJSON(message: Attestation_Material): unknown {
    const obj: any = {};
    message.string !== undefined &&
      (obj.string = message.string ? Attestation_Material_KeyVal.toJSON(message.string) : undefined);
    message.containerImage !== undefined && (obj.containerImage = message.containerImage
      ? Attestation_Material_ContainerImage.toJSON(message.containerImage)
      : undefined);
    message.artifact !== undefined &&
      (obj.artifact = message.artifact ? Attestation_Material_Artifact.toJSON(message.artifact) : undefined);
    message.addedAt !== undefined && (obj.addedAt = message.addedAt.toISOString());
    message.materialType !== undefined &&
      (obj.materialType = craftingSchema_Material_MaterialTypeToJSON(message.materialType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attestation_Material>, I>>(object: I): Attestation_Material {
    const message = createBaseAttestation_Material();
    message.string = (object.string !== undefined && object.string !== null)
      ? Attestation_Material_KeyVal.fromPartial(object.string)
      : undefined;
    message.containerImage = (object.containerImage !== undefined && object.containerImage !== null)
      ? Attestation_Material_ContainerImage.fromPartial(object.containerImage)
      : undefined;
    message.artifact = (object.artifact !== undefined && object.artifact !== null)
      ? Attestation_Material_Artifact.fromPartial(object.artifact)
      : undefined;
    message.addedAt = object.addedAt ?? undefined;
    message.materialType = object.materialType ?? 0;
    return message;
  },
};

function createBaseAttestation_Material_KeyVal(): Attestation_Material_KeyVal {
  return { id: "", value: "" };
}

export const Attestation_Material_KeyVal = {
  encode(message: Attestation_Material_KeyVal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attestation_Material_KeyVal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestation_Material_KeyVal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
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

  fromJSON(object: any): Attestation_Material_KeyVal {
    return { id: isSet(object.id) ? String(object.id) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Attestation_Material_KeyVal): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attestation_Material_KeyVal>, I>>(object: I): Attestation_Material_KeyVal {
    const message = createBaseAttestation_Material_KeyVal();
    message.id = object.id ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAttestation_Material_ContainerImage(): Attestation_Material_ContainerImage {
  return { id: "", name: "", digest: "", isSubject: false };
}

export const Attestation_Material_ContainerImage = {
  encode(message: Attestation_Material_ContainerImage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.digest !== "") {
      writer.uint32(26).string(message.digest);
    }
    if (message.isSubject === true) {
      writer.uint32(32).bool(message.isSubject);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attestation_Material_ContainerImage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestation_Material_ContainerImage();
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
          message.digest = reader.string();
          break;
        case 4:
          message.isSubject = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Attestation_Material_ContainerImage {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      digest: isSet(object.digest) ? String(object.digest) : "",
      isSubject: isSet(object.isSubject) ? Boolean(object.isSubject) : false,
    };
  },

  toJSON(message: Attestation_Material_ContainerImage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.digest !== undefined && (obj.digest = message.digest);
    message.isSubject !== undefined && (obj.isSubject = message.isSubject);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attestation_Material_ContainerImage>, I>>(
    object: I,
  ): Attestation_Material_ContainerImage {
    const message = createBaseAttestation_Material_ContainerImage();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.digest = object.digest ?? "";
    message.isSubject = object.isSubject ?? false;
    return message;
  },
};

function createBaseAttestation_Material_Artifact(): Attestation_Material_Artifact {
  return { id: "", name: "", digest: "", isSubject: false };
}

export const Attestation_Material_Artifact = {
  encode(message: Attestation_Material_Artifact, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.digest !== "") {
      writer.uint32(26).string(message.digest);
    }
    if (message.isSubject === true) {
      writer.uint32(32).bool(message.isSubject);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attestation_Material_Artifact {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestation_Material_Artifact();
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
          message.digest = reader.string();
          break;
        case 4:
          message.isSubject = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Attestation_Material_Artifact {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      digest: isSet(object.digest) ? String(object.digest) : "",
      isSubject: isSet(object.isSubject) ? Boolean(object.isSubject) : false,
    };
  },

  toJSON(message: Attestation_Material_Artifact): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.digest !== undefined && (obj.digest = message.digest);
    message.isSubject !== undefined && (obj.isSubject = message.isSubject);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attestation_Material_Artifact>, I>>(
    object: I,
  ): Attestation_Material_Artifact {
    const message = createBaseAttestation_Material_Artifact();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.digest = object.digest ?? "";
    message.isSubject = object.isSubject ?? false;
    return message;
  },
};

function createBaseAttestation_EnvVarsEntry(): Attestation_EnvVarsEntry {
  return { key: "", value: "" };
}

export const Attestation_EnvVarsEntry = {
  encode(message: Attestation_EnvVarsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attestation_EnvVarsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestation_EnvVarsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
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

  fromJSON(object: any): Attestation_EnvVarsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Attestation_EnvVarsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attestation_EnvVarsEntry>, I>>(object: I): Attestation_EnvVarsEntry {
    const message = createBaseAttestation_EnvVarsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseCraftingState(): CraftingState {
  return { inputSchema: undefined, attestation: undefined, dryRun: false };
}

export const CraftingState = {
  encode(message: CraftingState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inputSchema !== undefined) {
      CraftingSchema.encode(message.inputSchema, writer.uint32(10).fork()).ldelim();
    }
    if (message.attestation !== undefined) {
      Attestation.encode(message.attestation, writer.uint32(18).fork()).ldelim();
    }
    if (message.dryRun === true) {
      writer.uint32(24).bool(message.dryRun);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CraftingState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCraftingState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inputSchema = CraftingSchema.decode(reader, reader.uint32());
          break;
        case 2:
          message.attestation = Attestation.decode(reader, reader.uint32());
          break;
        case 3:
          message.dryRun = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CraftingState {
    return {
      inputSchema: isSet(object.inputSchema) ? CraftingSchema.fromJSON(object.inputSchema) : undefined,
      attestation: isSet(object.attestation) ? Attestation.fromJSON(object.attestation) : undefined,
      dryRun: isSet(object.dryRun) ? Boolean(object.dryRun) : false,
    };
  },

  toJSON(message: CraftingState): unknown {
    const obj: any = {};
    message.inputSchema !== undefined &&
      (obj.inputSchema = message.inputSchema ? CraftingSchema.toJSON(message.inputSchema) : undefined);
    message.attestation !== undefined &&
      (obj.attestation = message.attestation ? Attestation.toJSON(message.attestation) : undefined);
    message.dryRun !== undefined && (obj.dryRun = message.dryRun);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CraftingState>, I>>(object: I): CraftingState {
    const message = createBaseCraftingState();
    message.inputSchema = (object.inputSchema !== undefined && object.inputSchema !== null)
      ? CraftingSchema.fromPartial(object.inputSchema)
      : undefined;
    message.attestation = (object.attestation !== undefined && object.attestation !== null)
      ? Attestation.fromPartial(object.attestation)
      : undefined;
    message.dryRun = object.dryRun ?? false;
    return message;
  },
};

function createBaseWorkflowMetadata(): WorkflowMetadata {
  return { name: "", project: "", team: "", workflowId: "", workflowRunId: "", schemaRevision: "" };
}

export const WorkflowMetadata = {
  encode(message: WorkflowMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.project !== "") {
      writer.uint32(18).string(message.project);
    }
    if (message.team !== "") {
      writer.uint32(26).string(message.team);
    }
    if (message.workflowId !== "") {
      writer.uint32(42).string(message.workflowId);
    }
    if (message.workflowRunId !== "") {
      writer.uint32(50).string(message.workflowRunId);
    }
    if (message.schemaRevision !== "") {
      writer.uint32(58).string(message.schemaRevision);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkflowMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkflowMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.project = reader.string();
          break;
        case 3:
          message.team = reader.string();
          break;
        case 5:
          message.workflowId = reader.string();
          break;
        case 6:
          message.workflowRunId = reader.string();
          break;
        case 7:
          message.schemaRevision = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WorkflowMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      project: isSet(object.project) ? String(object.project) : "",
      team: isSet(object.team) ? String(object.team) : "",
      workflowId: isSet(object.workflowId) ? String(object.workflowId) : "",
      workflowRunId: isSet(object.workflowRunId) ? String(object.workflowRunId) : "",
      schemaRevision: isSet(object.schemaRevision) ? String(object.schemaRevision) : "",
    };
  },

  toJSON(message: WorkflowMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.project !== undefined && (obj.project = message.project);
    message.team !== undefined && (obj.team = message.team);
    message.workflowId !== undefined && (obj.workflowId = message.workflowId);
    message.workflowRunId !== undefined && (obj.workflowRunId = message.workflowRunId);
    message.schemaRevision !== undefined && (obj.schemaRevision = message.schemaRevision);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WorkflowMetadata>, I>>(object: I): WorkflowMetadata {
    const message = createBaseWorkflowMetadata();
    message.name = object.name ?? "";
    message.project = object.project ?? "";
    message.team = object.team ?? "";
    message.workflowId = object.workflowId ?? "";
    message.workflowRunId = object.workflowRunId ?? "";
    message.schemaRevision = object.schemaRevision ?? "";
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
