import {
  List,
  ListItemText,
  ListItemButton,
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import { format } from "date-fns";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { ReactNode, useEffect, useState } from "react";
import { WorkflowRunItem } from "@pb/controlplane/v1/response_messages";

export const RunsListSidebar = ({
  runs,
  onSelect,
}: {
  runs: WorkflowRunItem[];
  onSelect: (s: string) => void;
}) => {
  const [currentRun, setCurrentRun] = useState("");

  // Select the first run if it's not set
  useEffect(() => {
    if (currentRun == "" && runs && runs.length > 0) {
      setCurrentRun(runs[0].id);
    }
  }, [runs, currentRun]);

  // Propagate the selection of the run to the parent
  useEffect(() => {
    if (currentRun != "") {
      onSelect(currentRun);
    }
  }, [currentRun]);

  const icon = (state: string): ReactNode => {
    var icon;
    switch (state) {
      case "error":
        icon = <ErrorIcon color="error" />;
        break;
      case "canceled":
        icon = <WarningIcon color="warning" />;
        break;
      case "success":
        icon = <CheckCircleIcon color="success" />;
        break;
      default:
        icon = <AutorenewIcon />;
    }

    return icon;
  };

  return (
    <List>
      {runs.map((run) => {
        const selected = run.id == currentRun;
        return (
          <ListItemButton
            key={run.id}
            divider
            selected={selected}
            onClick={() => setCurrentRun(run.id)}
          >
            <Tooltip title={run.state}>
              <ListItemIcon sx={{ label: "asd" }}>
                {icon(run.state)}
              </ListItemIcon>
            </Tooltip>
            <ListItemText>{format(run.createdAt!, "Pp")}</ListItemText>
          </ListItemButton>
        );
      })}
    </List>
  );
};
