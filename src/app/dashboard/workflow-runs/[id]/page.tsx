"use client";

import { useAuth } from "@contexts/auth";
import WorkflowSummary from "@components/workflow-view/summary";
import { Box } from "@mui/system";
import { useWorkflowRunDescribe } from "@hooks/workflow-runs";
import RunDetail from "@components/workflow-view/workflow-runs/detail";

export default function Page({ params }: { params: { id: string } }) {
  const { apiClient } = useAuth();
  const { data } = useWorkflowRunDescribe(params.id, apiClient);
  const workflowRun = data?.result?.workflowRun;

  return (
    <>
      <Box my="20px">
        {workflowRun?.workflow && (
          <WorkflowSummary wf={workflowRun?.workflow!}></WorkflowSummary>
        )}
      </Box>
      <Box>{workflowRun && <RunDetail runID={workflowRun?.id} />}</Box>
    </>
  );
}
