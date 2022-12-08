"use client";

import { useWorkflows } from "@hooks/workflows";
import { useAuth } from "@contexts/auth";
import React, { useEffect, useState } from "react";
import { WorkflowItem } from "@pb/controlplane/v1/response_messages";
import WorkflowSummary from "@components/workflow-view/summary";
import WorflowRuns from "@components/workflow-view/workflow-runs";
import { Box } from "@mui/system";

export default function Page({ params }: { params: { id: string } }) {
  const [workflow, setWorkflow] = useState<WorkflowItem>();
  const { apiClient } = useAuth();
  const { data } = useWorkflows(apiClient);

  useEffect(() => {
    if (data == null) return;

    // TODO(miguel): Add describe API endpoint
    // This does not work with pagination
    const found = data.result.find((wf) => wf.id == params.id);
    if (found) {
      setWorkflow(found);
    }
  }, [data]);

  return (
    <>
      <Box mb="20px">
        {workflow && <WorkflowSummary wf={workflow!}></WorkflowSummary>}
      </Box>
      {workflow && <WorflowRuns workflowID={workflow?.id} />}
    </>
  );
}
