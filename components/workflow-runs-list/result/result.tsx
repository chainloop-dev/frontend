import WorkflowRunStatus from "@components/workflow-view/workflow-runs/detail/run-status";
import { IStatus } from "@components/workflow-view/workflow-runs/detail/run-status/run-status";
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
import {
  WorkflowItem,
  WorkflowRunItem,
} from "@pb/controlplane/v1/response_messages";
import { format } from "date-fns";

export const WorkflowRunsListResults = ({
  runs,
  limit,
  setLimit,
  handlePageChange,
  setWorkflowID,
  page,
  workflowID,
  workflows,
}: {
  runs: WorkflowRunItem[];
  workflows: WorkflowItem[];
  workflowID: string;
  limit: number;
  page: number;
  setLimit: (_limit: number) => void;
  setWorkflowID: (_wf: string) => void;
  handlePageChange: (_e: unknown, _page: number) => void;
}) => {
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handleWorkflowIDChange = (event: SelectChangeEvent) => {
    setWorkflowID(event.target.value as string);
  };

  return (
    <>
      <Grid container justifyContent="right" pb="20px">
        <Grid item xs={12} sm={3} xl={2}>
          <FormControl fullWidth>
            <InputLabel>Filter by Workflow</InputLabel>
            <Select
              value={workflowID}
              label="Workflow"
              onChange={handleWorkflowIDChange}
            >
              <MenuItem value="">Any</MenuItem>
              {workflows?.map((run) => (
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
            {runs?.map((run) => (
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
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
