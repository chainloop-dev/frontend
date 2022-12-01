import WithLoader from "@components/with-loader";
import WorkflowRunStatus from "@components/workflow-view/workflow-runs/detail/run-status";
import { IStatus } from "@components/workflow-view/workflow-runs/detail/run-status/run-status";
import { useAuth } from "@contexts/auth";
import {
  IRunsListOpts,
  useWorkflowRunsList,
} from "@lib/apiclient/workflowRuns";
import { useWorkflows } from "@lib/apiclient/workflows";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

export const WorkflowRunsListResults = ({}: {}) => {
  const { apiClient } = useAuth();
  const mapPageToNextCursor = useRef<{ [page: number]: string }>({});
  const [limit, setLimit] = useState(25);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setCurrentPage] = useState(0);
  const [workflowID, setWorkflowID] = useState("");

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

  // Load workflows to enable filtering
  const { isLoading: loadingWorkflows, data: workflows } =
    useWorkflows(apiClient);

  // Define handlers
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    resetTable();
    setLimit(newLimit);
  };

  const resetTable = () => {
    setCurrentPage(0);
    mapPageToNextCursor.current = {};
  };

  const handleWorkflowIDChange = (event: SelectChangeEvent) => {
    resetTable();
    setWorkflowID(event.target.value as string);
  };

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
      <WithLoader loading={loadingRuns || loadingWorkflows}>
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
