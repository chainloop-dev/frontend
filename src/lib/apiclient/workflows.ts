import useSWR from 'swr'
import ApiClient, { swrResp } from "./client";
import { WorkflowServiceListResponse, WorkflowServiceClientImpl } from "src/pbgen/controlplane/v1/workflow";

export function useWorkflows(client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? "workflows" : null,
    (_: string) => getWorkflows(client!), { suspense: true })
  return swrResp(data, error)
}

function getWorkflows(apiClient: ApiClient): Promise<WorkflowServiceListResponse> {
  var client = new WorkflowServiceClientImpl(apiClient.grpcClient)
  return client.List({})
}