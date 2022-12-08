import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { humanizedRunnerType } from "@utils/workflow-run";
import { TimeWindow } from "@hooks/metrics";
import { CSSProperties } from "react";

interface Props {
  total: { [key: string]: number };
  timeWindow: TimeWindow;
}

interface DataItemI {
  name: string;
  value: number;
}

export const TotalRunsByRunnerType = (props: Props) => {
  var data: [DataItemI?] = [];

  var total: number = 0;
  for (const status in props.total) {
    total += props.total[status];
  }

  for (const status in props.total) {
    data.push({
      name: humanizedRunnerType(status),
      value: getPercent(props.total[status], total),
    });
  }

  // Sort by name
  data.sort((a, b) => (a!.name > b!.name ? -1 : 0));

  return (
    <Card>
      <CardContent sx={{ width: "100%" }}>
        <Typography color="textSecondary" gutterBottom variant="overline">
          {`Runner Type (${props.timeWindow})`}
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
              endAngle={0}
              paddingAngle={3}
            />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
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
