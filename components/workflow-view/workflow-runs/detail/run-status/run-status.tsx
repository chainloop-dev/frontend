import { Chip } from "@mui/material";

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
      label={status}
      size="small"
      color={selectedColor}
    />
  );
};
