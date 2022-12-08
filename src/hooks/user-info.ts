import ApiClient, { swrResp } from "@lib/apiclient/client";
import { ContextServiceCurrentResponse, ContextServiceClientImpl } from "@pb/controlplane/v1/context";
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