import ApiClient, { swrResp } from "./client";
import { ContextServiceCurrentResponse, ContextServiceClientImpl } from "src/pbgen/controlplane/v1/context";
import useSWR from 'swr'

export function useCurrentUser(client: ApiClient | undefined) {
  const shouldFetch = client != undefined
  const { data, error } = useSWR(shouldFetch ? "current-context" : null, (_: string) => currentUser(client!))
  return swrResp(data, error)
}

async function currentUser(client: ApiClient): Promise<ContextServiceCurrentResponse> {
  var s = new ContextServiceClientImpl(client.grpcClient)
  return s.Current({})
} 