import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@contexts/auth";
import { CircularProgress, Container, Grid } from "@mui/material";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const loggingIn = pathname && pathname.startsWith("/login");

  if (!isAuthenticated && !loggingIn) {
    return (
      <Container fixed>
        <Grid
          sx={{ height: "100vh" }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return <>{children}</>;
};
