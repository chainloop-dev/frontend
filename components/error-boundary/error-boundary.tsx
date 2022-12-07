import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  err?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ err: error });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage message={this.state.err?.message || ""} />;
    }

    return this.props.children;
  }
}

const ErrorPage = ({ message }: { message: string }) => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="center" color="textPrimary" variant="h3">
            {message}
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle1">
            Check our documentation site for information on how to solve it
          </Typography>
          <Button
            component={Link}
            href="https://docs.chainloop.dev/getting-started/setup"
            target="_blank"
            sx={{ mt: 3 }}
            variant="contained"
          >
            See documentation
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default ErrorBoundary;
