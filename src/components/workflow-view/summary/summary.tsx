import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Divider,
} from "@mui/material";
import { WorkflowItem } from "src/gen/controlplane/v1/response_messages";

export const WorkflowSummary = ({ wf }: { wf: WorkflowItem }) => {
  return (
    <Card raised>
      <CardHeader title="Workflow Info" />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="overline">Name</Typography>
            <Typography>{wf.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="overline">Project</Typography>
            <Typography>{wf.project}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="overline">Team</Typography>
            <Typography>{wf.team || "none"}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="overline">Created At</Typography>
            <Typography>{wf.createdAt?.toDateString()}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
