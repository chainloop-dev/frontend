"use client";

// These styles apply to every route in the application
import "../assets/styles/globals.css";
import { apiErrorMiddleware } from "src/lib/apiclient/middleware";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@assets/styles/theme";
import { AuthProvider } from "src/contexts/auth";
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
