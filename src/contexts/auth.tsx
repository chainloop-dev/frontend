"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ContextServiceCurrentResponse } from "@pb/controlplane/v1/context";
import ApiClient from "@lib/apiclient/client";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser as useCurrentUserAPI } from "@hooks/user-info";
import { grpc } from "@improbable-eng/grpc-web";

interface CurrentUser {
  email: string;
  id: string;
}

interface AuthInfo {
  isAuthenticated: boolean;
  apiClient?: ApiClient;
  currentUser?: CurrentUser;
  logout?: () => void;
  login: (_: string) => void;
}

const tokenStorageKey = "apiToken";
const storeToken = (token: string) => {
  localStorage.setItem(tokenStorageKey, token);
};

const removeToken = () => {
  localStorage.removeItem(tokenStorageKey);
};

const emptyAuthInfo: AuthInfo = { isAuthenticated: false, login: storeToken };
const AuthContext = createContext<AuthInfo>(emptyAuthInfo);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiClient, setApiClient] = useState<ApiClient | undefined>();
  const pathname = usePathname();

  // Load the token from local storage or redirect to login page
  useEffect(() => {
    const token = localStorage.getItem(tokenStorageKey);
    const loggingIn = pathname && pathname.startsWith("/login");

    if (token != "" && token != null) {
      setToken(token);
    } else if (!loggingIn) {
      router.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize the client if token is set
  useEffect(() => {
    if (token == "") {
      return;
    }
    const client = new ApiClient(token);
    setApiClient(client);
  }, [token]);

  const { data, isError, isLoading } = useCurrentUserAPI(apiClient);

  // Initialize the user currentUserData was fetched
  useEffect(() => {
    // This can not be caught by the middleware
    // since the middleware does not have access to this context
    if (isError && isError.code == grpc.Code.Unauthenticated) {
      logout();
    }
    if (!isLoading && !isError && data != null) {
      setCurrentUser(craftUserInfo(data));
      setIsAuthenticated(true);
    }
  }, [data, isLoading, isError]);

  const logout = () => {
    removeToken();
    setToken("");
    setApiClient(undefined);
    router.push("/login");
  };

  const authInfo: AuthInfo = {
    isAuthenticated: isAuthenticated,
    apiClient: apiClient,
    currentUser: currentUser,
    logout,
    login: storeToken,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function craftUserInfo(
  data: ContextServiceCurrentResponse
): CurrentUser | undefined {
  if (data.result == null) {
    return;
  }

  return {
    id: data.result.currentUser!.id,
    email: data.result.currentUser!.email,
  };
}
