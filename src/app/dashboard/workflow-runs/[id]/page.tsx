"use client";

import { useAuth } from "src/contexts/auth";
import WorkflowSummary from "src/components/workflow-view/summary";
import { Box } from "@mui/system";
import { useWorkflowRunDescribe } from "src/lib/apiclient/workflow-runs";
import RunDetail from "src/components/workflow-view/workflow-runs/detail";

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
