"use client";

// These styles apply to every route in the application
import "../styles/globals.css";
import { apiErrorMiddleware } from "@lib/apiclient/middleware";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { AuthProvider } from "@contexts/auth";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <body>
            <AuthProvider>
              <SWRConfig value={{ use: [apiErrorMiddleware] }}>
                {children}
              </SWRConfig>
            </AuthProvider>
          </body>
        </CssBaseline>
      </ThemeProvider>
    </html>
  );
}
