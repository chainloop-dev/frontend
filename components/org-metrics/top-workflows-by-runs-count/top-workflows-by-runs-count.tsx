import WorkflowRunStatus from "@components/run-status";
import { IStatus } from "@components/run-status/run-status";
import { useAuth } from "@contexts/auth";
import { useOrgTopWorkflowsByRunCountMetrics } from "@lib/apiclient/metrics";
import { namespacedName, statusColor } from "@lib/workflow-run-utils";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { TopWorkflowsByRunsCountResponse_TotalByStatus } from "@pb/controlplane/v1/orgmetrics";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataItemI {
  name: string;
  value: { [key: string]: number };
}

export const TopWorkflowsByRunsCount = () => {
  const { apiClient } = useAuth();
  // Load workflows to enable filtering
  const { data } = useOrgTopWorkflowsByRunCountMetrics(apiClient);
  const theme = useTheme();
  const router = useRouter();

  var chartData: [DataItemI?] = [];

  data?.result?.map((m) => {
    chartData.push({
      name: namespacedName(m.workflow!),
      value: m.runsTotalByStatus,
    });
  });

  const redirectToWorkflow = (workflowID: string) => () =>
    router.push(`/dashboard/workflows/${workflowID}`);

  if (data?.result.length == 0) {
    return <></>;
  }

  return (
    <Card raised>
      <CardContent sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography color="textSecondary" variant="overline">
              Top Workflows (7 days)
            </Typography>
            {renderChart(chartData, theme)}
          </Grid>
          <Grid item xs={6}>
            {data?.result && renderTable(data.result, redirectToWorkflow)}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const renderTable = (
  data: TopWorkflowsByRunsCountResponse_TotalByStatus[],
  clickFunc: any
) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((d) => {
            const workflow = d.workflow!;
            return (
              <TableRow
                hover
                key={workflow.id}
                onClick={clickFunc(workflow.id)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{workflow.name}</TableCell>
                <TableCell>{workflow.project}</TableCell>
                <TableCell>{workflow.team}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const renderChart = (chartData: [DataItemI?], theme: Theme) => {
  return (
    <ResponsiveContainer height={350}>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" hide />
        <YAxis />
        <Tooltip />
        {["success", "error"].map((status) => renderBar(status, theme))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const renderBar = (status: string, theme: Theme) => (
  <Bar
    dataKey={`value.${status}`}
    stackId="a"
    name={status}
    fill={statusColor(theme, status)}
  />
);
