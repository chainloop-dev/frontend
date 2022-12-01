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
  Typography,
} from "@mui/material";
import { WorkflowRunsListResults } from "@components/workflow-runs-list/result/result";
import { useAuth } from "@contexts/auth";
import { useWorkflows } from "@lib/apiclient/workflows";
import { useEffect, useState } from "react";
import WithLoader from "@components/with-loader";
import { usePathname, useRouter } from "next/navigation";

export default function WorkflowRunsList({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { apiClient } = useAuth();
  // Load workflows to enable filtering
  const { isLoading: loadingWorkflows, data: workflows } =
    useWorkflows(apiClient);

  const [workflowID, setWorkflowID] = useState("");
  const router = useRouter();
  const currentPath = usePathname();

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
    const workflowID = searchParams ? searchParams["workflow"] : "";
    setWorkflowID(workflowID || "");
  }, [searchParams]);

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Container maxWidth={false}>
        <Typography sx={{ m: 1 }} variant="h4">
          Workflow Runs
        </Typography>
        <Box sx={{ mt: 3 }}>
          <WithLoader loading={loadingWorkflows}>
            <Grid container justifyContent="right" pb="20px">
              <Grid item xs={12} sm={6} lg={3} xl={2}>
                <FormControl fullWidth>
                  <InputLabel>Filter by Workflow</InputLabel>
                  <Select
                    value={workflowID}
                    label="Workflow"
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
          </WithLoader>
          <WorkflowRunsListResults
            workflowID={workflowID}
          ></WorkflowRunsListResults>
        </Box>
      </Container>
    </Box>
  );
}
