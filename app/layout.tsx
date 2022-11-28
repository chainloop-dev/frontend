"use client";

// These styles apply to every route in the application
import "./globals.css";
import { apiErrorMiddleware } from "@lib/apiclient/middleware";
import { SWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { AuthProvider } from "@contexts/auth";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <html lang="en">
      <head />
      <CssBaseline>
        <body>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <SWRConfig value={{ use: [apiErrorMiddleware] }}>
                {children}
              </SWRConfig>
            </AuthProvider>
          </ThemeProvider>
        </body>
      </CssBaseline>
    </html>
  );
}
