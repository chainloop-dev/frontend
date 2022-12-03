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
import { Box } from "@mui/system";
import { formatDistanceToNow } from "date-fns";
import WorkflowRunStatus from "../../workflow-view/workflow-runs/detail/run-status";
import { IStatus } from "../../workflow-view/workflow-runs/detail/run-status/run-status";
import { useRouter } from "next/navigation";
import { useWorkflows } from "@lib/apiclient/workflows";
import { useAuth } from "@contexts/auth";

export const WorkflowListResults = () => {
  const router = useRouter();
  const { apiClient } = useAuth();
  const { data } = useWorkflows(apiClient);
  const workflows = data?.result;

  const redirectToWorkflow = (workflowID: string) => () =>
    router.push(`/dashboard/workflows/${workflowID}`);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} className="Bordered">
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
