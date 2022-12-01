"use client";

import { useAuth } from "@contexts/auth";
import WithLoader from "@components/with-loader";
import React, { useEffect, useState } from "react";
import { WorkflowRunItem } from "@pb/controlplane/v1/response_messages";
import { Container } from "@mui/material";
import WorkflowSummary from "@components/workflow-view/summary";
import { Box } from "@mui/system";
import { useWorkflowRunDescribe } from "@lib/apiclient/workflowRuns";
import RunDetail from "@components/workflow-view/workflow-runs/detail";

export default function Page({ params }: { params: { id: string } }) {
  const [workflowRun, setWorkflowRun] = useState<WorkflowRunItem>();
  const { apiClient } = useAuth();
  const { isLoading, data: run } = useWorkflowRunDescribe(params.id, apiClient);

  // Load workflowRun from params
  useEffect(() => {
    if (run && run.result) {
      setWorkflowRun(run.result.workflowRun);
    }
  }, [run]);

  return (
    <WithLoader loading={isLoading}>
      <Container maxWidth={false}>
        <Box my="20px">
          {workflowRun?.workflow && (
            <WorkflowSummary wf={workflowRun?.workflow!}></WorkflowSummary>
          )}
        </Box>
        <Box>{workflowRun && <RunDetail runID={workflowRun?.id} />}</Box>
      </Container>
    </WithLoader>
  );
}
