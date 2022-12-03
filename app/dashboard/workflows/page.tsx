"use client";

import { Box, Container, Typography } from "@mui/material";
import WorkflowListResults from "@components/workflow-list/result";

export default function WorkflowsList() {
  return (
    <Container maxWidth={false}>
      <Typography sx={{ m: 1 }} variant="h4">
        Workflows
      </Typography>
      <Box sx={{ mt: 3 }}>
        <WorkflowListResults />
      </Box>
    </Container>
  );
}
