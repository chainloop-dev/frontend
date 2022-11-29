import { useAuth } from "@contexts/auth";
import WithLoader from "../../../with-loader";

import { useWorkflowRunDescribe } from "@lib/apiclient/workflowRuns";
import WorkflowRunSummary from "./summary";
import AttestationInfo from "./attestation-info";
import { Typography } from "@mui/material";

export const RunDetail = ({ runID }: { runID: string }) => {
  const { apiClient } = useAuth();
  const { isLoading, data } = useWorkflowRunDescribe(runID, apiClient);

  const run = data?.result?.workflowRun;
  const attestation = data?.result?.attestation;

  return (
    <WithLoader loading={isLoading}>
      {run && <WorkflowRunSummary run={run} />}
      {attestation && <AttestationInfo attestation={attestation} />}
      {!attestation && (
        <Typography variant="h5" align="center" m={4}>
          The attestation crafting is in progress. Not been received yet.
        </Typography>
      )}
    </WithLoader>
  );
};
