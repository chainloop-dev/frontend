import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  total: number;
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
        <Typography
          color="textPrimary"
          variant="h2"
          textAlign="center"
          sx={{ color: props.color, paddingTop: "10px" }}
        >
          {props.total}
        </Typography>
      </CardContent>
    </Card>
  );
};
