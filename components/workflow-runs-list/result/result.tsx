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
} from "@mui/material";
import { WorkflowRunItem } from "@pb/controlplane/v1/response_messages";

export const WorkflowRunsListResults = ({
  runs,
}: {
  runs: WorkflowRunItem[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created at</TableCell>
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
              <TableCell>{run.createdAt?.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
