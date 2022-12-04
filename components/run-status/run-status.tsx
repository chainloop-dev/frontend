import { capitalize, Chip } from "@mui/material";

export type IStatus = "error" | "canceled" | "success" | "intitialized";

export const WorkflowRunStatus = ({ status }: { status?: IStatus }) => {
  if (!status) return <></>;

  let stateToColor: { [key: string]: "error" | "warning" | "success" } = {
    error: "error",
    canceled: "warning",
    success: "success",
  };

  const selectedColor = stateToColor[status];
  return (
    <Chip
      sx={{ borderRadius: 0, mr: 1 }}
      label={hStatus(status)}
      size="small"
      color={selectedColor}
    />
  );
};

const hStatus = (state: string) => {
  var res = state;

  switch (state) {
    case "initialized":
      res = "in progress";
      break;
    case "error":
      res = "failure";
      break;
  }

  return capitalize(res);
};
