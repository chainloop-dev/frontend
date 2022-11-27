import useSWR from 'swr'
import ApiClient, { swrResp } from "./client";
import { WorkflowServiceListResponse, WorkflowServiceClientImpl } from "../../gen/controlplane/v1/workflow";

export function useWorkflows(client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? "workflows" : null, (k: string) => getWorkflows(client!))
  return swrResp(data, error)
}

function getWorkflows(apiClient: ApiClient): Promise<WorkflowServiceListResponse> {
  var client = new WorkflowServiceClientImpl(apiClient.grpcClient)
  return client.List({})
}