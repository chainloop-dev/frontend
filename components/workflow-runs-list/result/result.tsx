import WithLoader from "@components/with-loader";
import WorkflowRunStatus from "@components/workflow-view/workflow-runs/detail/run-status";
import { IStatus } from "@components/workflow-view/workflow-runs/detail/run-status/run-status";
import { useAuth } from "@contexts/auth";
import {
  IRunsListOpts,
  useWorkflowRunsList,
} from "@lib/apiclient/workflowRuns";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

export const WorkflowRunsListResults = ({
  workflowID,
}: {
  workflowID: string;
}) => {
  const { apiClient } = useAuth();
  const mapPageToNextCursor = useRef<{ [page: number]: string }>({});
  const [limit, setLimit] = useState(25);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setCurrentPage] = useState(0);

  // Load data
  const opts: IRunsListOpts = {
    limit: limit,
    workflowID: workflowID,
    cursor: mapPageToNextCursor.current[page - 1],
  };
  const { isLoading: loadingRuns, data: runs } = useWorkflowRunsList(
    opts,
    apiClient
  );

  // Define handlers
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
  };

  const resetTable = () => {
    setCurrentPage(0);
    mapPageToNextCursor.current = {};
  };

  useEffect(() => {
    resetTable();
  }, [workflowID, limit]);

  const handlePageChange = (_e: any, newPage: number) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setCurrentPage(newPage);
    }
  };

  // Keep track of the cursors associated with the different pages
  useEffect(() => {
    const nc = runs?.pagination?.nextCursor;
    if (nc) {
      mapPageToNextCursor.current[page] = nc;
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
  }, [runs?.pagination?.nextCursor]);

  return (
    <>
      <WithLoader loading={loadingRuns}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Started</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {runs?.result.map((run) => (
                <TableRow hover key={run.id} sx={{ cursor: "pointer" }}>
                  <TableCell>{run.workflow!.name}</TableCell>
                  <TableCell>{run.workflow!.project}</TableCell>
                  <TableCell>{run.workflow!.team}</TableCell>
                  <TableCell>
                    <WorkflowRunStatus
                      status={run.state as IStatus}
                    ></WorkflowRunStatus>
                  </TableCell>
                  <TableCell>{format(run?.createdAt!, "Pp")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          rowsPerPage={limit}
          component="div"
          count={-1}
          page={page}
          nextIconButtonProps={{
            disabled: !hasNextPage,
          }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </WithLoader>
    </>
  );
};
