"use client";

import { Box, Container, Skeleton } from "@mui/material";
import WorkflowListResults from "@components/workflow-list/result";
import { Suspense } from "react";
import OrgMetrics from "@components/org-metrics";

export default function WorkflowsList() {
  return (
    <Container maxWidth={false}>
      <Box sx={{ mt: 3 }}>
        <OrgMetrics />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Suspense fallback={<Sk />}>
          <WorkflowListResults />
        </Suspense>
      </Box>
    </Container>
  );
}

const Sk = () => {
  return (
    <>
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton variant="rounded" height="300px" />
    </>
  );
};
