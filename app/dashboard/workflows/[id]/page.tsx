"use client";

import { useWorkflows } from "@lib/apiclient/workflows";
import { useAuth } from "@contexts/auth";
import WithLoader from "@components/with-loader";
import React, { useEffect, useState } from "react";
import { WorkflowItem } from "@pb/controlplane/v1/response_messages";
import { Container } from "@mui/material";
import WorkflowSummary from "@components/workflow-view/summary";
import WorflowRuns from "@components/workflow-view/workflow-runs";
import { Box } from "@mui/system";

export default function Page({ params }: { params: { id: string } }) {
  const [workflow, setWorkflow] = useState<WorkflowItem>();
  const { apiClient } = useAuth();
  const { isLoading, data } = useWorkflows(apiClient);

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
    <WithLoader loading={isLoading || !workflow}>
      <Container maxWidth={false}>
        <Box mb="20px">
          <WorkflowSummary wf={workflow!}></WorkflowSummary>
        </Box>
        {workflow && <WorflowRuns workflowID={workflow?.id} />}
      </Container>
    </WithLoader>
  );
}
