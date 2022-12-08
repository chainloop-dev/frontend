import { useAuth } from "@contexts/auth";
import {
  TimeWindow,
  useOrgTopWorkflowsByRunCountMetrics,
} from "@hooks/metrics";
import { namespacedName, statusColor } from "@utils/workflow-run";
import {
  Card,
  CardContent,
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
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  workflowID: string;
  value: { [key: string]: number };
}

export const TopWorkflowsByRunsCount = ({
  timeWindow,
}: {
  timeWindow: TimeWindow;
}) => {
  const { apiClient } = useAuth();
  // Load workflows to enable filtering
  const { data } = useOrgTopWorkflowsByRunCountMetrics(apiClient, timeWindow);
  const theme = useTheme();
  const router = useRouter();
  const [selectedWorkflowID, setSelectedWorkflowID] = useState("");

  var chartData: [DataItemI?] = [];

  data?.result?.map((m) => {
    chartData.push({
      name: namespacedName(m.workflow!),
      value: m.runsTotalByStatus,
      workflowID: m.workflow!.id,
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
          <Grid item xs={12} md={6}>
            <Typography color="textSecondary" variant="overline">
              {`Top Workflows (${timeWindow})`}
            </Typography>
            {renderChart(chartData, theme, setSelectedWorkflowID)}
          </Grid>
          <Grid item xs={12} md={6}>
            {data?.result &&
              renderTable(data.result, redirectToWorkflow, selectedWorkflowID)}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const renderTable = (
  data: TopWorkflowsByRunsCountResponse_TotalByStatus[],
  clickFunc: any,
  selectedWorkflowID: string
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
                selected={selectedWorkflowID == workflow.id}
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

const renderChart = (
  chartData: [DataItemI?],
  theme: Theme,
  selectWorkflow: (_: string) => void
) => {
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
        {["success", "error"].map((status) =>
          renderBar(status, theme, selectWorkflow)
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

const renderBar = (
  status: string,
  theme: Theme,
  selectWorkflow: (_: string) => void
) => {
  const handleMouseOver = ({ workflowID }: { workflowID: string }) => {
    selectWorkflow(workflowID);
  };

  const handleMouseReset = () => {
    selectWorkflow("");
  };

  return (
    <Bar
      label={"foo"}
      dataKey={`value.${status}`}
      key={status}
      stackId="a"
      name={status}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseReset}
      fill={statusColor(theme, status)}
    />
  );
};
