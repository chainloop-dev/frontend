"use client";

import { Middleware, SWRHook } from 'swr'
import { useAuth } from '@contexts/auth';
import { GrpcWebError } from "@pb/controlplane/v1/status";
import { grpc } from "@improbable-eng/grpc-web";

export const apiErrorMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config)
    const err = <GrpcWebError>swr.error;
    const { logout } = useAuth()

    if (err && err.code) {
        console.log("API error handled - code=\"%s\" message=\"%s\" cause=\"%s\"", err.code, err.cause, err.message)
        if (err.code == grpc.Code.Unauthenticated) {
            if (logout) {
                console.log("logging out")
                logout()
            }
        } else if (err.code == grpc.Code.PermissionDenied) {
            // Throw to capture it using an error boundary
            throw (err)
        }
    }

    return swr

}