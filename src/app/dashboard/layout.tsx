"use client";

// These styles apply to every route in the application
import { styled } from "@mui/material/styles";
import { useState } from "react";
import AuthGuard from "@components/auth-guard";
import DashboardNavbar from "@components/dashboard-navbar";
import DashboardSidebar from "@components/dashboard-sidebar";
import { Box, Container } from "@mui/material";
import ErrorBoundary from "@components/error-boundary";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 80,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <ErrorBoundary>
            <Container maxWidth={false}>{children}</Container>
          </ErrorBoundary>
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </AuthGuard>
  );
}
