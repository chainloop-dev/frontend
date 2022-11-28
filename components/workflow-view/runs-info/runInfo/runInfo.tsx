import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { useAuth } from "../../../../contexts/auth";
import WithLoader from "../../../with-loader";

import { useWorkflowRunDescribe } from "../../../../lib/apiclient/workflowRuns";
import { format, formatDistance } from "date-fns";

import WorkflowRunStatus from "../run-status";
import { IStatus } from "../run-status/run-status";
import RunnerTypeIcon from "../../../runner-type-icon";

export const RunInfo = ({ runID }: { runID: string }) => {
  const { apiClient } = useAuth();
  const { isLoading, data } = useWorkflowRunDescribe(runID, apiClient);

  const run = data?.result?.workflowRun;

  return (
    <WithLoader loading={isLoading}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <Typography sx={{ fontSize: 14 }}>Initialized at</Typography>
              <Typography>
                {run ? format(run?.createdAt!, "Pp") : ""}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              {run && run.finishedAt && (
                <>
                  <Typography sx={{ fontSize: 14 }}>Finished at</Typography>
                  <Typography>
                    {format(run.finishedAt, "Pp")} (
                    {formatDistance(run.finishedAt, run.createdAt!)})
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontSize: 14 }}>Status</Typography>
              {run && (
                <WorkflowRunStatus
                  status={run?.state as IStatus}
                ></WorkflowRunStatus>
              )}
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              {run && run.jobUrl && (
                <Button
                  color="inherit"
                  href={run.jobUrl}
                  target="_blank"
                  startIcon={<RunnerTypeIcon runnerType={run.runnerType} />}
                >
                  Job Info
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </WithLoader>
  );
};
