import ApiClient, { swrResp } from "./client";
import { InfozResponse, StatusServiceClientImpl } from "../../gen/controlplane/v1/status";
import useSWR from 'swr'

export function useInfo(client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? "app-info" : null, (k: string) => getInfo(client!))
  return swrResp(data, error)
}

async function getInfo(apiClient: ApiClient): Promise<InfozResponse> {
  var client = new StatusServiceClientImpl(apiClient.grpcClient)
  return client.Infoz({})
} 