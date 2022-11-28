import { Icon, IconifyIcon } from "@iconify/react";
import gitlabIcon from "@iconify/icons-mdi/gitlab";
import githubIcon from "@iconify/icons-mdi/github";

export const RunnerTypeIcon = ({ runnerType }: { runnerType: string }) => {
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
    return <></>;
  }

  return <Icon icon={icon} />;
};
