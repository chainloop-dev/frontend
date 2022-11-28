import { GrpcWebError, GrpcWebImpl } from "@pb/controlplane/v1/status";
import { grpc } from "@improbable-eng/grpc-web";

class ApiClient {
    grpcClient: GrpcWebImpl

    constructor(token: string) {
        this.grpcClient = this.initGrpcClient(token)
    }

    initGrpcClient(token: string) {
        let controlPlaneURI = process.env["NEXT_PUBLIC_CONTROL_PLANE_HOST"]
        return new GrpcWebImpl(
            controlPlaneURI || "", {
            "transport": grpc.CrossBrowserHttpTransport({}),
            metadata: new grpc.Metadata({ authorization: `Bearer ${token}` })
        })
    }
}

export default ApiClient;

interface useSWRResp<T> {
    data: T;
    isLoading: boolean;
    isError: GrpcWebError
}

export function swrResp<T>(data: T, error: GrpcWebError): useSWRResp<T> {
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
