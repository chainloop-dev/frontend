import ApiClient, { swrResp } from "@lib/apiclient/client";
import { InfozResponse, StatusServiceClientImpl } from "@pb/controlplane/v1/status";
import useSWR from 'swr'

export function useInfo(client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? "app-info" : null, (_: string) => getInfo(client!))
  return swrResp(data, error)
}

async function getInfo(apiClient: ApiClient): Promise<InfozResponse> {
  var client = new StatusServiceClientImpl(apiClient.grpcClient)
  return client.Infoz({})
} 