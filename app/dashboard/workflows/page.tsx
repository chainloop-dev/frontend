"use client";

import { useWorkflows } from "@lib/apiclient/workflows";
import { useAuth } from "@contexts/auth";
import { Box, Container } from "@mui/material";
import WorkflowListToolbar from "@components/workflow-list/toolbar";
import WorkflowListResults from "@components/workflow-list/result";
import WithLoader from "@components/with-loader";

export default function WorkflowsList() {
  const { apiClient } = useAuth();
  const { isLoading, data } = useWorkflows(apiClient);

  return (
    <WithLoader loading={isLoading}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={false}>
          <WorkflowListToolbar />
          <Box sx={{ mt: 3 }}>
            <WorkflowListResults workflows={data?.result} />
          </Box>
        </Container>
      </Box>
    </WithLoader>
  );
}
