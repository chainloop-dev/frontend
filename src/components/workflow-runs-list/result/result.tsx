import RunnerTypeIcon from "@components/runner-type-icon";
import { useAuth } from "@contexts/auth";
import {
  IRunsListOpts,
  useWorkflowRunsList,
} from "@lib/apiclient/workflow-runs";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  Box,
  Tooltip,
  Grid,
  useTheme,
} from "@mui/material";
import { formatDistance, formatDistanceToNow } from "date-fns";
import EventIcon from "@mui/icons-material/Event";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { humanizeRunnerType } from "@lib/workflow-run-utils";
import { statusColor } from "@lib/workflow-run-utils";

export const WorkflowRunsListResults = ({
  workflowID,
}: {
  workflowID: string;
}) => {
  const router = useRouter();
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
  const { data: runs } = useWorkflowRunsList(opts, apiClient);

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

  const redirectToWorkflowRun = (runID: string) => () =>
    router.push(`/dashboard/workflow-runs/${runID}`);

  if (runs?.result && runs.result.length == 0) {
    return (
      <Typography variant="h5" mt={4}>
        There are not Workflow Runs
      </Typography>
    );
  }

  return (
    <>
      <TableContainer component={Paper} className="Bordered">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Team</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {runs?.result.map((run) => (
              <TableRow
                hover
                key={run.id}
                onClick={redirectToWorkflowRun(run.id)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="center" padding="none">
                  <RunStatusIcon
                    state={run.state}
                    runnerType={run.runnerType}
                  />
                </TableCell>
                <TableCell padding="none">{run.workflow!.name}</TableCell>
                <TableCell>{run.workflow!.project}</TableCell>
                <TableCell>{run.workflow!.team}</TableCell>
                <TableCell>
                  <Grid item sx={{ alignItems: "center", display: "flex" }}>
                    <EventIcon color="action" titleAccess="Run Started At" />
                    <Typography display="inline" sx={{ pl: 1 }} variant="body2">
                      {formatDistanceToNow(run.createdAt!)} ago
                    </Typography>
                  </Grid>
                  {run.finishedAt && (
                    <Grid item sx={{ alignItems: "center", display: "flex" }}>
                      <TimelapseIcon
                        color="action"
                        titleAccess="Run duration"
                      />
                      <Typography
                        display="inline"
                        sx={{ pl: 1 }}
                        variant="body2"
                      >
                        {formatDistance(run.finishedAt, run.createdAt!)}
                      </Typography>
                    </Grid>
                  )}
                </TableCell>
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
    </>
  );
};

const RunStatusIcon = ({
  state,
  runnerType,
}: {
  state: string;
  runnerType: string;
}) => {
  const theme = useTheme();
  const c = statusColor(theme, state);

  return (
    <Box sx={{ color: c }}>
      <Tooltip title={`${humanizeRunnerType(runnerType)} - ${state}`}>
        <Box>
          <RunnerTypeIcon runnerType={runnerType} width="20px" />
        </Box>
      </Tooltip>
    </Box>
  );
};
