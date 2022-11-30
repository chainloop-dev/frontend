import useSWR from 'swr'
import ApiClient, { swrResp } from "./client";
import { WorkflowRunServiceClientImpl, WorkflowRunServiceListRequest, WorkflowRunServiceListResponse, WorkflowRunServiceViewResponse } from '@pb/controlplane/v1/workflowrun';
import { PaginationRequest, PaginationRequest_Direction } from '@pb/controlplane/v1/pagination';

export interface IRunsListOpts {
  workflowID?: string
  limit?: number
  nextCursor?: string
  PrevCursor?: string
}

export function useWorkflowRunsList(opts: IRunsListOpts, client: ApiClient | undefined) {
  const shouldFetch = client != undefined

  // Arbitrary caching key
  const fetchKey = ["workflow-runs", opts.workflowID, opts.limit, opts.nextCursor, opts.PrevCursor].join("-")

  const { data, error } = useSWR(shouldFetch ? fetchKey : null, (_: string) => getWorkflowRuns(opts, client!))
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
  const pageRequest: Partial<PaginationRequest> = {
    direction: PaginationRequest_Direction.DIRECTION_NEXT_PAGE,
    cursor: ""
  }

  if (opts.limit) {
    pageRequest.limit = opts.limit
  }

  if (opts.nextCursor) {
    pageRequest.cursor = opts.nextCursor
  } else if (opts.PrevCursor) {
    pageRequest.cursor = opts.PrevCursor
    pageRequest.direction = PaginationRequest_Direction.DIRECTION_PREV_PAGE
  }

  payload.pagination = pageRequest as PaginationRequest

  return client.List(payload)
}

export function useWorkflowRunDescribe(runID: string, client: ApiClient | undefined) {
  const shouldFetch = client != undefined && runID != ""
  const { data, error } = useSWR(shouldFetch ? ["workflow-run-describe", runID] : null, (_: string) => describeWorkflowRun(runID, client!))
  return swrResp(data, error)
}

function describeWorkflowRun(workflowRunID: string, apiClient: ApiClient): Promise<WorkflowRunServiceViewResponse> {
  var client = new WorkflowRunServiceClientImpl(apiClient.grpcClient)
  return client.View({ id: workflowRunID })
}