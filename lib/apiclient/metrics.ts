import useSWR from 'swr'
import ApiClient, { swrResp } from "./client";
import { OrgMetricsServiceTotalsRequest, OrgMetricsServiceTotalsResponse, OrgMetricsServiceClientImpl, MetricsTimeWindow, TopWorkflowsByRunsCountRequest, TopWorkflowsByRunsCountResponse } from "@pb/controlplane/v1/orgmetrics";

export function useOrgTotalsMetrics(client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? "org-metrics-total" : null,
    (_: string) => getOrgTotalsMetrics(client!), { suspense: true })

  return swrResp(data, error)
}

export function useOrgTopWorkflowsByRunCountMetrics(client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? "org-metrics-top-count" : null,
    (_: string) => getOrgTopWorkflowsByRunCountMetrics(client!), { suspense: true })

  return swrResp(data, error)
}

function getOrgTotalsMetrics(apiClient: ApiClient): Promise<OrgMetricsServiceTotalsResponse> {
  var client = new OrgMetricsServiceClientImpl(apiClient.grpcClient)
  // TODO, support configuration
  const req: OrgMetricsServiceTotalsRequest = {
    timeWindow: MetricsTimeWindow.METRICS_TIME_WINDOW_LAST_7_DAYS
  }

  return client.Totals(req)
}

function getOrgTopWorkflowsByRunCountMetrics(apiClient: ApiClient): Promise<TopWorkflowsByRunsCountResponse> {
  var client = new OrgMetricsServiceClientImpl(apiClient.grpcClient)
  // TODO, support configuration
  const req: TopWorkflowsByRunsCountRequest = {
    timeWindow: MetricsTimeWindow.METRICS_TIME_WINDOW_LAST_30_DAYS,
    numWorkflows: 10,
  }

  return client.TopWorkflowsByRunsCount(req)
}