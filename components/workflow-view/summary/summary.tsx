import { Typography, Card, CardContent, Grid } from "@mui/material";
import WorkflowRunStatus from "../workflow-runs/detail/run-status";
import { WorkflowItem } from "@pb/controlplane/v1/response_messages";

export const WorkflowSummary = ({ wf }: { wf: WorkflowItem }) => {
  return (
    <Card raised>
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14 }}>Name</Typography>
            <Typography>{wf.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14 }}>Project</Typography>
            <Typography>{wf.project}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14 }}>Team</Typography>
            <Typography>{wf.team || "none"}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14 }}>Created At</Typography>
            <Typography>{wf.createdAt?.toDateString()}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
