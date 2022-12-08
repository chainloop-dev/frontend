import { Card, CardContent, Typography, useTheme } from "@mui/material";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { statusColor } from "@utils/workflow-run";
import { CSSProperties } from "react";
import { TimeWindow } from "@hooks/metrics";

interface Props {
  total: { [key: string]: number };
  timeWindow: TimeWindow;
}

interface DataItemI {
  name: string;
  value: number;
}

export const TotalRunsByStatus = (props: Props) => {
  const theme = useTheme();
  var data: [DataItemI?] = [];

  var total: number = 0;
  for (const status in props.total) {
    total += props.total[status];
  }

  for (const status in props.total) {
    data.push({ name: status, value: getPercent(props.total[status], total) });
  }

  // Sort by name
  data.sort((a, b) => (a!.name > b!.name ? -1 : 0));

  return (
    <Card>
      <CardContent sx={{ width: "100%" }}>
        <Typography color="textSecondary" gutterBottom variant="overline">
          {`Run Status (${props.timeWindow})`}
        </Typography>
        <ResponsiveContainer height={150}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              isAnimationActive={false}
              outerRadius={80}
              startAngle={180}
              cy="90%"
              paddingAngle={3}
              endAngle={0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={statusColor(theme, entry?.name!)}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  const finalStyle: CSSProperties = {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap",
  };

  if (active && payload) {
    return (
      <div style={finalStyle}>{`${payload[0].name}: ${toPercent(
        payload[0].value
      )}`}</div>
    );
  }

  return null;
};

const getPercent = (value: number, total: number) => {
  return total > 0 ? value / total : 0;
};

const toPercent = (decimal: number, fixed = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;
