import {
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { WorkflowRunItem } from "@pb/controlplane/v1/response_messages";
import { format, formatDistance } from "date-fns";
import WorkflowRunStatus from "../../../../run-status";
import { IStatus } from "../../../../run-status/run-status";
import RunnerTypeIcon from "../../../../runner-type-icon";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const WorkflowRunSummary = ({ run }: { run: WorkflowRunItem }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid item md={6} xs={12}>
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Started</TableCell>
                <TableCell>
                  {run ? format(run?.createdAt!, "Pp") : ""}
                </TableCell>
              </TableRow>
              {run && run.finishedAt && (
                <TableRow>
                  <TableCell>Finished</TableCell>
                  <TableCell>
                    {format(run.finishedAt, "Pp")} (
                    {formatDistance(run.finishedAt, run.createdAt!)} )
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={6} xs={12}>
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>
                  {run && (
                    <WorkflowRunStatus
                      status={run?.state as IStatus}
                    ></WorkflowRunStatus>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Runner Type</TableCell>
                <TableCell>
                  {run && !run.jobUrl && <Typography>Not specified</Typography>}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {run && run.jobUrl && (
                      <Button
                        color="inherit"
                        href={run.jobUrl}
                        target="_blank"
                        endIcon={<OpenInNewIcon />}
                      >
                        <RunnerTypeIcon runnerType={run.runnerType} />
                        <Typography sx={{ pl: "5px" }}>
                          {humanizeRunnerType(run.runnerType)}
                        </Typography>
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export const humanizeRunnerType = (runnerType: string): string => {
  switch (runnerType) {
    case "GITHUB_ACTION":
      return "Github Action";
    case "GITLAB_PIPELINE":
      return "Gitlab";
    default:
      return "not specified";
  }
};
