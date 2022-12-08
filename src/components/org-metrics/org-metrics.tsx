import { useAuth } from "@contexts/auth";
import { TimeWindow, useOrgTotalsMetrics } from "@lib/apiclient/metrics";
import {
  Box,
  Grid,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import TotalRuns from "./total-runs";
import TotalRunsByRunnerType from "./total-runs-by-runner-type";
import TotalRunsByStatus from "./total-runs-by-status";
import { statusColor } from "@lib/workflow-run-utils";
import TopWorkflowsByRunsCount from "./top-workflows-by-runs-count";
import { Suspense, useState } from "react";

export const OrgMetrics = () => {
  const theme = useTheme();
  const { apiClient } = useAuth();
  const [timeWindow, setTimeWindow] = useState<TimeWindow>(TimeWindow.Week);

  const { data } = useOrgTotalsMetrics(apiClient, timeWindow);
  const metrics = data?.result;
  if (!metrics) return <></>;

  const successfulRunsTotal = metrics.runsTotalByStatus["success"];
  const failedRunsTotal = metrics.runsTotalByStatus["error"];
  const totalRuns = metrics.runsTotal;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        {timeWindowSelector(timeWindow, setTimeWindow)}
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TotalRuns
          value={totalRuns || 0}
          caption="Total Runs"
          timeWindow={timeWindow}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TotalRuns
          value={successfulRunsTotal || 0}
          total={totalRuns}
          caption="Successful Runs"
          timeWindow={timeWindow}
          color={statusColor(theme, "success")}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TotalRuns
          value={failedRunsTotal || 0}
          total={totalRuns}
          caption="Failed Runs"
          timeWindow={timeWindow}
          color={statusColor(theme, "error")}
        />
      </Grid>
      <Grid item sm={6} xl={4}>
        {totalRuns > 0 && (
          <TotalRunsByStatus
            total={data?.result?.runsTotalByStatus!}
            timeWindow={timeWindow}
          />
        )}
      </Grid>
      <Grid item sm={6} xl={4}>
        {totalRuns > 0 && (
          <TotalRunsByRunnerType
            total={data?.result?.runsTotalByRunnerType!}
            timeWindow={timeWindow}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Suspense fallback={TopWorkflowsSkeleton()}>
          <TopWorkflowsByRunsCount timeWindow={timeWindow} />
        </Suspense>
      </Grid>
    </Grid>
  );
};

const TopWorkflowsSkeleton = () => (
  <Skeleton variant="rounded" height="400px" />
);

const timeWindowSelector = (
  selected: TimeWindow,
  select: (_: TimeWindow) => void
) => {
  const handleTimeWindowChange = (
    _: React.MouseEvent<HTMLElement>,
    val: TimeWindow
  ) => {
    val != null && select(val);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
      }}
    >
      <ToggleButtonGroup
        size="small"
        exclusive
        value={selected}
        onChange={handleTimeWindowChange}
      >
        <ToggleButton value={TimeWindow.Day}>24 Hours</ToggleButton>
        <ToggleButton value={TimeWindow.Week}>7 Days</ToggleButton>
        <ToggleButton value={TimeWindow.Month}>30 Days</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
