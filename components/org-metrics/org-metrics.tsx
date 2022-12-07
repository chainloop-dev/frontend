import { useAuth } from "@contexts/auth";
import { useOrgTotalsMetrics as useOrgTotalMetrics } from "@lib/apiclient/metrics";
import { Grid, useTheme } from "@mui/material";
import TotalRuns from "./total-runs";
import TotalRunsByRunnerType from "./total-runs-by-runner-type";
import TotalRunsByStatus from "./total-runs-by-status";
import { statusColor } from "@lib/workflow-run-utils";
import TopWorkflowsByRunsCount from "./top-workflows-by-runs-count";

export const OrgMetrics = () => {
  const { apiClient } = useAuth();
  // Load workflows to enable filtering
  const { data } = useOrgTotalMetrics(apiClient);
  const theme = useTheme();

  const metrics = data?.result;
  if (!metrics) return <></>;

  const successfulRunsTotal = metrics.runsTotalByStatus["success"];
  const failedRunsTotal = metrics.runsTotalByStatus["error"];
  const totalRuns = metrics.runsTotal;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6} lg={4}>
        <TotalRuns value={totalRuns || 0} caption="Total Runs (7 days)" />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TotalRuns
          value={successfulRunsTotal || 0}
          total={totalRuns}
          caption="Successful Runs (7 days)"
          color={statusColor(theme, "success")}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TotalRuns
          value={failedRunsTotal || 0}
          total={totalRuns}
          caption="Failed Runs (7 days)"
          color={statusColor(theme, "error")}
        />
      </Grid>
      <Grid item sm={6} xl={4}>
        {totalRuns > 0 && (
          <TotalRunsByStatus total={data?.result?.runsTotalByStatus!} />
        )}
      </Grid>
      <Grid item sm={6} xl={4}>
        {totalRuns > 0 && (
          <TotalRunsByRunnerType total={data?.result?.runsTotalByRunnerType!} />
        )}
      </Grid>
      <Grid item sm={8} xl={6}>
        {<TopWorkflowsByRunsCount />}
      </Grid>
    </Grid>
  );
};
