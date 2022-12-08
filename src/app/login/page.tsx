"use client";

import ApiClient from "@lib/apiclient/client";
import { useInfo } from "@hooks/status";
import { Box, Button, Container, Grid } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const client = new ApiClient("");
  const { data, isLoading, isError } = useInfo(client);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return;

  let redirectURL = new URL(data!.loginUrl);
  let callbackURL = new URL(document.URL + "/callback");
  redirectURL.search = `?callback=${callbackURL.toString()}`;

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="sm">
        <Grid
          height={"100vh"}
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Button
              color="error"
              fullWidth
              href={redirectURL.toString()}
              size="large"
              startIcon={<GoogleIcon />}
              variant="contained"
            >
              Login with Google
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
