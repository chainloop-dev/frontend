"use client";

import { useWorkflows } from "@lib/apiclient/workflows";
import { useAuth } from "@contexts/auth";
import { Box, Container, Typography } from "@mui/material";
import WorkflowListResults from "@components/workflow-list/result";
import WithLoader from "@components/with-loader";

export default function WorkflowsList() {
  const { apiClient } = useAuth();
  const { isLoading, data } = useWorkflows(apiClient);

  return (
    <WithLoader loading={isLoading}>
      <Container maxWidth={false}>
        <Typography sx={{ m: 1 }} variant="h4">
          Workflows
        </Typography>
        <Box sx={{ mt: 3 }}>
          <WorkflowListResults workflows={data?.result} />
        </Box>
      </Container>
    </WithLoader>
  );
}
