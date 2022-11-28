import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  TableContainer,
  TableRow,
} from "@mui/material";
import { WorkflowItem } from "../../../gen/controlplane/v1/response_messages";
import Link from "next/link";

export const WorkflowListResults = ({
  workflows,
}: {
  workflows?: WorkflowItem[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell># runs</TableCell>
            <TableCell>Last run status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workflows?.map((workflow) => (
            <TableRow hover key={workflow.id}>
              <TableCell>
                <Link href={`/dashboard/workflows/${workflow.id}`}>
                  {workflow.name}
                </Link>
              </TableCell>
              <TableCell>{workflow.project}</TableCell>
              <TableCell>{workflow.team}</TableCell>
              <TableCell>{workflow.createdAt?.toDateString()}</TableCell>
              <TableCell>{workflow.runsCount}</TableCell>
              <TableCell>{workflow.lastRun?.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
