import { Icon, IconifyIcon } from "@iconify/react";
import gitlabIcon from "@iconify/icons-mdi/gitlab";
import githubIcon from "@iconify/icons-mdi/github";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

interface Props {
  runnerType: string;
  width?: string;
  height?: string;
}

export const RunnerTypeIcon = (props: Props) => {
  const { runnerType, ...other } = props;
  var icon: IconifyIcon | null = null;
  switch (runnerType) {
    case "GITHUB_ACTION":
      icon = githubIcon;
      break;
    case "GITLAB_PIPELINE":
      icon = gitlabIcon;
      break;
  }

  if (!icon) {
    return <AccountTreeIcon />;
  }

  return <Icon icon={icon} {...other} />;
};
