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
} from "@mui/material";
import { WorkflowRunItem } from "@pb/controlplane/v1/response_messages";
import { format } from "date-fns";

export const WorkflowRunsListResults = ({
  runs,
  limit,
  setLimit,
  handlePageChange,
  page,
}: {
  runs: WorkflowRunItem[];
  limit: number;
  page: number;
  setLimit: (_limit: number) => void;
  handlePageChange: (_e: unknown, _page: number) => void;
}) => {
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
  };

  return (
    <>
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
