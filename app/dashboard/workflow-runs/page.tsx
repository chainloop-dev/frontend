"use client";

import { useAuth } from "@contexts/auth";
import { Box, Container, Typography } from "@mui/material";
import WithLoader from "@components/with-loader";
import {
  IRunsListOpts,
  useWorkflowRunsList,
} from "@lib/apiclient/workflowRuns";
import { WorkflowRunsListResults } from "@components/workflow-runs-list/result/result";
import { useEffect, useState } from "react";

export default function WorkflowRunsList() {
  const { apiClient } = useAuth();
  const [limit, setLimit] = useState(20);
  const opts: IRunsListOpts = { limit: limit };
  const { isLoading, data } = useWorkflowRunsList(opts, apiClient);

  useEffect(() => {
    opts.limit = limit;
  }, [limit]);

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
                limit={limit}
                setLimit={setLimit}
                runs={data?.result}
              ></WorkflowRunsListResults>
            )}
          </Box>
        </Container>
      </Box>
    </WithLoader>
  );
}
