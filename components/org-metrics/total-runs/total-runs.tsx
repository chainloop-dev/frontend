import { Card, CardContent, Grid, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  value: number;
  // to calculate percentages
  total?: number;
  caption: string;
  color?: string;
}

export const TotalRuns = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom variant="overline">
          {props.caption}
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography
              color="textPrimary"
              variant="h2"
              textAlign="center"
              sx={{ color: props.color, paddingTop: "10px" }}
            >
              {props.value}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {props.total && (
              <PercentChart
                color={props.color}
                value={props.value}
                total={props.total}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

interface DataItemI {
  name: string;
  value: number;
}

const PercentChart = ({
  color,
  value,
  total,
}: {
  color?: string;
  value: number;
  total: number;
}) => {
  const data: Array<DataItemI> = [
    {
      name: "val",
      value: getPercent(value, total),
    },
    {
      name: "remainder",
      value: getPercent(total - value, total),
    },
  ];

  return (
    <ResponsiveContainer height={100}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={20}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fillOpacity={entry.name == "remainder" ? "10%" : 100}
              fill={color}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
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
    return <div style={finalStyle}>{toPercent(payload[0].value)}</div>;
  }

  return null;
};
const getPercent = (value: number, total: number) => {
  return total > 0 ? value / total : 0;
};

const toPercent = (decimal: number, fixed = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;
