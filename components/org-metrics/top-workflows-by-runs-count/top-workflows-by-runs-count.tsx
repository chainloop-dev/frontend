import { useAuth } from "@contexts/auth";
import { useOrgTopWorkflowsByRunCountMetrics } from "@lib/apiclient/metrics";
import { namespacedName, statusColor } from "@lib/workflow-run-utils";
import { Card, CardContent, Theme, Typography, useTheme } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

  var chartData: [DataItemI?] = [];

  data?.result?.map((m) => {
    chartData.push({
      name: namespacedName(m.workflow!),
      value: m.runsTotalByStatus,
    });
  });

  const mappedStatuses = ["success", "error"];

  return (
    <Card>
      <CardContent sx={{ width: "100%" }}>
        <Typography color="textSecondary" gutterBottom variant="overline">
          Top Workflows (7 days)
        </Typography>

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
            {mappedStatuses.map((status) => renderBar(theme, status))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const renderBar = (theme: Theme, status: string) => (
  <Bar
    dataKey={`value.${status}`}
    stackId="a"
    name={status}
    fill={statusColor(theme, status)}
  />
);
