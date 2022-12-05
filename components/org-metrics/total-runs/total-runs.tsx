import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  total: number;
}

export const TotalRuns = (props: Props) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom variant="overline">
        TOTAL RUNS (7 days)
      </Typography>
      <Typography color="textPrimary" variant="h4">
        {props.total}
      </Typography>
    </CardContent>
  </Card>
);
