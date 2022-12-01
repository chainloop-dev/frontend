"use client";

import { Box, Container, Typography } from "@mui/material";
import { WorkflowRunsListResults } from "@components/workflow-runs-list/result/result";

export default function WorkflowRunsList() {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Container maxWidth={false}>
        <Typography sx={{ m: 1 }} variant="h4">
          Workflow Runs
        </Typography>
        <Box sx={{ mt: 3 }}>
          <WorkflowRunsListResults></WorkflowRunsListResults>
        </Box>
      </Container>
    </Box>
  );
}
