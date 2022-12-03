import useSWR from 'swr'
import ApiClient, { swrResp } from "./client";
import { WorkflowRunServiceClientImpl, WorkflowRunServiceListRequest, WorkflowRunServiceListResponse, WorkflowRunServiceViewResponse } from '@pb/controlplane/v1/workflowrun';
import { PaginationRequest } from '@pb/controlplane/v1/pagination';
import { Suspense } from 'react';

export type IRunsListDirection = "next_page" | "prev_page"
export interface IRunsListOpts {
  workflowID?: string
  limit?: number
  cursor?: string
}

export function useWorkflowRunsList(opts: IRunsListOpts, client: ApiClient | undefined) {
  const shouldFetch = client != undefined

  // Arbitrary caching key
  var fetchKey = ["workflow-runs", opts.workflowID, opts.limit, opts.cursor].join("-")

  const { data, error } = useSWR(shouldFetch ? fetchKey : null,
    (_: string) => getWorkflowRuns(opts, client!),
    { suspense: true }
  )
  return swrResp(data, error)
}

function getWorkflowRuns(opts: IRunsListOpts, apiClient: ApiClient): Promise<WorkflowRunServiceListResponse> {
  var client = new WorkflowRunServiceClientImpl(apiClient.grpcClient)
  const payload: Partial<WorkflowRunServiceListRequest> = {}

  // filter options
  if (opts.workflowID) {
    payload.workflowId = opts.workflowID
  }

  // pagination options
  const pageRequest: PaginationRequest = {
    cursor: opts.cursor || "",
    limit: 0,
  }

  if (opts.limit) {
    pageRequest.limit = opts.limit
  }

  payload.pagination = pageRequest

  return client.List(payload)
}

export function useWorkflowRunDescribe(runID: string, client: ApiClient | undefined) {
  const shouldFetch = client != undefined && runID != ""
  const { data, error } = useSWR(shouldFetch ? ["workflow-run-describe", runID] : null,
    (_: string) => describeWorkflowRun(runID, client!),
    { suspense: true })
  return swrResp(data, error)
}

function describeWorkflowRun(workflowRunID: string, apiClient: ApiClient): Promise<WorkflowRunServiceViewResponse> {
  var client = new WorkflowRunServiceClientImpl(apiClient.grpcClient)
  return client.View({ id: workflowRunID })
}