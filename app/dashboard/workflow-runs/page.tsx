"use client";

import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from "@mui/material";
import { WorkflowRunsListResults } from "@components/workflow-runs-list/result/result";
import { useAuth } from "@contexts/auth";
import { useWorkflows } from "@lib/apiclient/workflows";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function WorkflowRunsList({}: {}) {
  const router = useRouter();
  const currentPath = usePathname();
  // TODO: useparams hook in theory should not be needed since params are injected as props
  // but there is a bug that at the time of this writeup, a fix hasn't been
  // released yet https://github.com/vercel/next.js/issues/42438
  const searchParams = useSearchParams();
  const [workflowID, setWorkflowID] = useState("");

  const handleWorkflowIDChange = (event: SelectChangeEvent) => {
    const workflowID = event.target.value as string;
    // TODO(miguel): find another way of doing this in the new router
    // The query object doesn't seem to be available?
    if (workflowID) {
      router.push(`${currentPath}?workflow=${workflowID}`);
    } else {
      router.push(currentPath || "");
    }
  };

  // Load workflow from params
  useEffect(() => {
    setWorkflowID(searchParams.get("workflow") || "");
  }, [searchParams]);

  return (
    <Container>
      <Typography sx={{ m: 1 }} variant="h4">
        Workflow Runs
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Suspense fallback={<WorkflowRunSkeleton />}>
          <WorkflowSelector
            workflowID={workflowID}
            handleWorkflowIDChange={handleWorkflowIDChange}
          />
          <WorkflowRunsListResults
            workflowID={workflowID}
          ></WorkflowRunsListResults>
        </Suspense>
      </Box>
    </Container>
  );
}

const WorkflowRunSkeleton = () => (
  <>
    <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
    <Skeleton variant="rounded" height="300px" />
  </>
);

const WorkflowSelector = ({
  workflowID,
  handleWorkflowIDChange,
}: {
  workflowID: string;
  handleWorkflowIDChange: (_: SelectChangeEvent) => void;
}) => {
  const { apiClient } = useAuth();
  // Load workflows to enable filtering
  const { data: workflows } = useWorkflows(apiClient);

  return (
    <Grid container justifyContent="right" pb="20px">
      <Grid item xs={12} sm={6} lg={3} xl={2}>
        <FormControl fullWidth color="primary">
          <InputLabel color="secondary">Filter by Workflow</InputLabel>
          <Select
            value={workflowID}
            label="Workflow"
            variant="filled"
            color="secondary"
            sx={{ backgroundColor: "#FFF" }}
            onChange={handleWorkflowIDChange}
          >
            <MenuItem value="">Any</MenuItem>
            {workflows?.result.map((run) => (
              <MenuItem value={run.id} key={run.id}>
                {run.project}/{run.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
