import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { WorkflowItem } from "@pb/controlplane/v1/response_messages";
import Link from "next/link";
import { Box } from "@mui/system";
import { formatDistanceToNow } from "date-fns";
import WorkflowRunStatus from "../../workflow-view/workflow-runs/detail/run-status";
import { IStatus } from "../../workflow-view/workflow-runs/detail/run-status/run-status";
import { useRouter } from "next/navigation";

export const WorkflowListResults = ({
  workflows,
}: {
  workflows?: WorkflowItem[];
}) => {
  const router = useRouter();

  const redirectToWorkflow = (workflowID: string) => () =>
    router.push(`/dashboard/workflows/${workflowID}`);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Last run</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workflows?.map((workflow) => (
            <TableRow
              hover
              key={workflow.id}
              onClick={redirectToWorkflow(workflow.id)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{workflow.name}</TableCell>
              <TableCell>{workflow.project}</TableCell>
              <TableCell>{workflow.team}</TableCell>
              <TableCell>{workflow.createdAt?.toDateString()}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {workflow.lastRun && (
                    <WorkflowRunStatus
                      status={workflow.lastRun.state as IStatus}
                    />
                  )}
                  {workflow.lastRun && workflow.lastRun?.finishedAt && (
                    <Typography>
                      {formatDistanceToNow(workflow.lastRun.finishedAt)} ago
                    </Typography>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
