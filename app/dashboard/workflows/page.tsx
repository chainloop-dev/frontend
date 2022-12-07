"use client";

import { Skeleton, Typography } from "@mui/material";
import WorkflowListResults from "@components/workflow-list/result";
import { Suspense } from "react";

export default function WorkflowsList() {
  return (
    <>
      <Typography sx={{ m: 1 }} variant="h4">
        Workflows
      </Typography>
      <Suspense fallback={<Sk />}>
        <WorkflowListResults />
      </Suspense>
    </>
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
