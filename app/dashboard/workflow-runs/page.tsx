"use client";

import { useAuth } from "@contexts/auth";
import { Box, Container, Typography } from "@mui/material";
import WithLoader from "@components/with-loader";
import {
  IRunsListOpts,
  useWorkflowRunsList,
} from "@lib/apiclient/workflowRuns";
import { WorkflowRunsListResults } from "@components/workflow-runs-list/result/result";

export default function WorkflowRunsList() {
  const { apiClient } = useAuth();
  // TODO(miguel): add filtering by workflow + pagination info
  const opts: IRunsListOpts = {};
  const { isLoading, data } = useWorkflowRunsList(opts, apiClient);

  return (
    <WithLoader loading={isLoading}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h4">
            Workflow Runs
          </Typography>
          <Box sx={{ mt: 3 }}>
            {data?.result && (
              <WorkflowRunsListResults
                runs={data?.result}
              ></WorkflowRunsListResults>
            )}
          </Box>
        </Container>
      </Box>
    </WithLoader>
  );
}
