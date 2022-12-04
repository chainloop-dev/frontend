"use client";

import { Box, Container, Skeleton, Typography } from "@mui/material";
import WorkflowListResults from "@components/workflow-list/result";
import { Suspense } from "react";

export default function WorkflowsList() {
  return (
    <Container maxWidth={false}>
      <Typography sx={{ m: 1 }} variant="h4">
        Workflows
      </Typography>
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
