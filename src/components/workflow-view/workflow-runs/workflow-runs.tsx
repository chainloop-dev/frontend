import {
  CardHeader,
  Divider,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import RunsListSidebar from "./list-sidebar";
import RunDetail from "./detail";
import { useAuth } from "@contexts/auth";
import {
  IRunsListOpts,
  useWorkflowRunsList,
} from "@lib/apiclient/workflow-runs";

export const WorkflowRuns = ({ workflowID }: { workflowID: string }) => {
  const [currentRunID, setCurrentRunID] = useState("");
  const { apiClient } = useAuth();
  const opts: IRunsListOpts = { workflowID: workflowID, limit: 20 };
  const { data } = useWorkflowRunsList(opts, apiClient);
  const runs = data?.result;

  return (
    <Card raised>
      <CardHeader title="Latest Runs" />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        {runs && runs.length > 0 && (
          <Grid container>
            <Grid item xs={3} xl={2}>
              <RunsListSidebar
                runs={data?.result!}
                onSelect={setCurrentRunID}
              />
            </Grid>
            <Grid item xs={9} xl={10}>
              <RunDetail runID={currentRunID} />
            </Grid>
          </Grid>
        )}
        {runs && runs.length == 0 && (
          <Typography variant="h5" align="center" mt={4}>
            There are no runs yet
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
