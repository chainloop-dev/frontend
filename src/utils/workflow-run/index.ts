import { Theme } from "@mui/system";
import { WorkflowItem } from "@pb/controlplane/v1/response_messages";

export const statusColor = (theme: Theme, state: string) => {
  var c: string;
  switch (state) {
    case "error":
      c = theme.palette.error.main;
      break;
    case "canceled":
      c = theme.palette.warning.main;
      break;
    case "success":
      c = theme.palette.success.main;
      break;
    default:
      c = theme.palette.warning.main;
  }

  return c;
};

export const humanizedRunnerType = (runnerType: string): string => {
  switch (runnerType) {
    case "GITHUB_ACTION":
      return "Github Action";
    case "GITLAB_PIPELINE":
      return "Gitlab";
    default:
      return "not specified";
  }
};

export const namespacedName = (run: WorkflowItem) => (
  `${run.project}/${run.name}`
)