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

export default function WorkflowRunsList() {
  const { apiClient } = useAuth();
  // Store the cursor associated with the page
  // Using useref to prevent re-rendering
  const mapPageToNextCursor = useRef<{ [page: number]: string }>({});
  const [limit, setLimit] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const opts: IRunsListOpts = {
    limit: limit,
    cursor: mapPageToNextCursor.current[currentPage - 1],
  };
  const { isLoading, data } = useWorkflowRunsList(opts, apiClient);

  const handleChangePage = (_e: any, newPage: number) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const nc = data?.pagination?.nextCursor;
    if (nc) {
      mapPageToNextCursor.current[currentPage] = nc;
    }
  }, [data?.pagination?.nextCursor]);

  const handleLimitChange = (limit: number) => {
    // Reset page to make sure that going back works
    setCurrentPage(0);
    setLimit(limit);
  };

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
                page={currentPage}
                handlePageChange={handleChangePage}
                limit={limit}
                setLimit={handleLimitChange}
                runs={data?.result}
              ></WorkflowRunsListResults>
            )}
          </Box>
        </Container>
      </Box>
    </WithLoader>
  );
}
