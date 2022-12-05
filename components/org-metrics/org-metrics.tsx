import { useAuth } from "@contexts/auth";
import { useOrgMetrics } from "@lib/apiclient/metrics";
import { Grid } from "@mui/material";
import TotalRuns from "./total-runs";
import TotalRunsByRunnerType from "./total-runs-by-runner-type";
import TotalRunsByStatus from "./total-runs-by-status";

export const OrgMetrics = () => {
  const { apiClient } = useAuth();
  // Load workflows to enable filtering
  const { data } = useOrgMetrics(apiClient);

  const metrics = data?.result;
  if (!metrics) return <></>;

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={4} lg={3} xl={2}>
        <TotalRuns total={data?.result?.runsTotal || 0} />
      </Grid>
      <Grid item xs={12} sm={8} lg={9} xl={10}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} xl={6}>
            <TotalRunsByStatus total={data?.result?.runsTotalByStatus!} />
          </Grid>
          <Grid item xs={12} xl={6}>
            <TotalRunsByRunnerType
              total={data?.result?.runsTotalByRunnerType!}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
