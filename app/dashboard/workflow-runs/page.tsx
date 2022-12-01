"use client";

import { useAuth } from "@contexts/auth";
import { Box, Container, Typography } from "@mui/material";
import WithLoader from "@components/with-loader";
import {
  IRunsListOpts,
  useWorkflowRunsList,
} from "@lib/apiclient/workflowRuns";
import { WorkflowRunsListResults } from "@components/workflow-runs-list/result/result";
import { useEffect, useRef, useState } from "react";
import { useWorkflows } from "@lib/apiclient/workflows";

export default function WorkflowRunsList() {
  const { apiClient } = useAuth();
  // Store the cursor associated with the page
  // Using useref to prevent re-rendering
  const mapPageToNextCursor = useRef<{ [page: number]: string }>({});
  const [limit, setLimit] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [workflowID, setWorkflowID] = useState("");
  const opts: IRunsListOpts = {
    limit: limit,
    workflowID: workflowID,
    cursor: mapPageToNextCursor.current[currentPage - 1],
  };
  const { isLoading: loadingRuns, data: runs } = useWorkflowRunsList(
    opts,
    apiClient
  );

  // Load workflows to enable filtering
  const { isLoading: loadingWorkflows, data: workflows } =
    useWorkflows(apiClient);

  const handleChangePage = (_e: any, newPage: number) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const nc = runs?.pagination?.nextCursor;
    if (nc) {
      mapPageToNextCursor.current[currentPage] = nc;
    }
  }, [runs?.pagination?.nextCursor]);

  const handleLimitChange = (limit: number) => {
    // Reset page to make sure that going back works
    setCurrentPage(0);
    setLimit(limit);
  };

  useEffect(() => {
    opts.limit = limit;
  }, [limit]);

  return (
    <WithLoader loading={loadingRuns || loadingWorkflows}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h4">
            Workflow Runs
          </Typography>
          <Box sx={{ mt: 3 }}>
            {runs?.result && workflows?.result && (
              <WorkflowRunsListResults
                page={currentPage}
                workflowID={workflowID}
                setWorkflowID={setWorkflowID}
                handlePageChange={handleChangePage}
                limit={limit}
                setLimit={handleLimitChange}
                runs={runs?.result}
                workflows={workflows?.result}
              ></WorkflowRunsListResults>
            )}
          </Box>
        </Container>
      </Box>
    </WithLoader>
  );
}
