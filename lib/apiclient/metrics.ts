import useSWR from 'swr'
import ApiClient, { swrResp } from "./client";
import { OrgMetricsServiceTotalsRequest, OrgMetricsServiceTotalsResponse, OrgMetricsServiceClientImpl, MetricsTimeWindow } from "@pb/controlplane/v1/orgmetrics";

export function useOrgMetrics(client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? "org-metrics" : null,
    (_: string) => getOrgMetrics(client!), { suspense: true })

  return swrResp(data, error)
}

function getOrgMetrics(apiClient: ApiClient): Promise<OrgMetricsServiceTotalsResponse> {
  var client = new OrgMetricsServiceClientImpl(apiClient.grpcClient)
  // TODO, support configuration
  const req: OrgMetricsServiceTotalsRequest = {
    timeWindow: MetricsTimeWindow.METRICS_TIME_WINDOW_LAST_7_DAYS
  }

  return client.Totals(req)
}