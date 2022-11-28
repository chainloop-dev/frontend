import { Icon as Iconify } from "@iconify/react";

export const RunnerTypeIcon = ({ runnerType }: { runnerType: string }) => {
  var icon: string = "";
  switch (runnerType) {
    case "GITHUB_ACTION":
      icon = "github";
      break;
    case "GITLAB_PIPELINE":
      icon = "gitlab";
      break;
  }

  return <Iconify icon={`mdi:${icon}`} />;
};
