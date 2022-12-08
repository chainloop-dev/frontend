import { TimeWindow } from "@hooks/metrics";
import { Card, CardContent, Grid, styled, Typography } from "@mui/material";
import { RadialBar, PolarAngleAxis, RadialBarChart } from "recharts";

interface Props {
  value: number;
  timeWindow: TimeWindow;
  // to calculate percentages
  total?: number;
  caption: string;
  color?: string;
}

export const TotalRuns = (props: Props) => {
  const TotalMetricsCard = styled(CardContent)(`
  padding: 15px;
  &:last-child {
    padding-bottom: 0;
  };
  height: 170px;
`);

  return (
    <Card>
      <TotalMetricsCard>
        <Typography color="textSecondary" variant="overline">
          {`${props.caption} (${props.timeWindow})`}
        </Typography>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          height="70%"
        >
          <Grid item>
            <Typography
              color="textPrimary"
              variant="h1"
              textAlign="right"
              sx={{
                color: props.color,
              }}
            >
              {props.value}
            </Typography>
          </Grid>
          <Grid item>
            {!!props.total && (
              <PercentChart
                color={props.color}
                value={props.value}
                total={props.total}
              />
            )}
          </Grid>
        </Grid>
      </TotalMetricsCard>
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
  const percentRate = getPercent(value, total);
  const data: Array<DataItemI> = [
    {
      name: "val",
      value: percentRate,
    },
  ];

  const circleSize = 110;
  return (
    <RadialBarChart
      width={circleSize}
      height={circleSize}
      barSize={8}
      data={data}
      innerRadius={30}
      startAngle={90}
      endAngle={-270}
    >
      <PolarAngleAxis
        type="number"
        domain={[0, 1]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        background
        dataKey="value"
        cornerRadius={circleSize / 2}
        fill={color}
        isAnimationActive={false}
      />
      <text
        x={circleSize / 2}
        y={circleSize / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="progress-label"
      >
        {toPercent(percentRate)}
      </text>
    </RadialBarChart>
  );
};

const getPercent = (value: number, total: number) => {
  return total > 0 ? value / total : 0;
};

const toPercent = (decimal: number, fixed = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;
