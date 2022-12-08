import useSWR from 'swr'
import ApiClient, { swrResp } from "./client";
import { OrgMetricsServiceTotalsRequest, OrgMetricsServiceTotalsResponse, OrgMetricsServiceClientImpl, MetricsTimeWindow, TopWorkflowsByRunsCountRequest, TopWorkflowsByRunsCountResponse } from "@pb/controlplane/v1/orgmetrics";

export enum TimeWindow {
  Day = "24 Hours",
  Week = "7 Days",
  Month = "30 Days",
}

const timeWindowMap = new Map<TimeWindow, MetricsTimeWindow>(
  [
    [TimeWindow.Day, MetricsTimeWindow.METRICS_TIME_WINDOW_LAST_DAY],
    [TimeWindow.Week, MetricsTimeWindow.METRICS_TIME_WINDOW_LAST_7_DAYS],
    [TimeWindow.Month, MetricsTimeWindow.METRICS_TIME_WINDOW_LAST_30_DAYS],
  ]
)

export function useOrgTotalsMetrics(client: ApiClient | undefined, w: TimeWindow) {
  const shouldFetch = client != undefined
  const key = shouldFetch ? ["org-metrics-total", w] : null
  const { data, error } = useSWR(key,
    (_: string) => getOrgTotalsMetrics(client!, w), { suspense: true })

  return swrResp(data, error)
}

export function useOrgTopWorkflowsByRunCountMetrics(client: ApiClient | undefined, w: TimeWindow) {
  const shouldFetch = client != undefined
  const key = shouldFetch ? ["org-metrics-top-count", w] : null
  const { data, error } = useSWR(key,
    (_: string) => getOrgTopWorkflowsByRunCountMetrics(client!, w), { suspense: true })

  return swrResp(data, error)
}

function getOrgTotalsMetrics(apiClient: ApiClient, w: TimeWindow): Promise<OrgMetricsServiceTotalsResponse> {
  var client = new OrgMetricsServiceClientImpl(apiClient.grpcClient)
  // TODO, support configuration
  const req: OrgMetricsServiceTotalsRequest = {
    timeWindow: timeWindowMap.get(w)!
  }

  return client.Totals(req)
}

function getOrgTopWorkflowsByRunCountMetrics(apiClient: ApiClient, w: TimeWindow): Promise<TopWorkflowsByRunsCountResponse> {
  var client = new OrgMetricsServiceClientImpl(apiClient.grpcClient)
  // TODO, support configuration
  const req: TopWorkflowsByRunsCountRequest = {
    timeWindow: timeWindowMap.get(w)!,
    numWorkflows: 10,
  }

  return client.TopWorkflowsByRunsCount(req)
}
