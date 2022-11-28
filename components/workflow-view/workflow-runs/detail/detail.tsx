import { useAuth } from "../../../../contexts/auth";
import WithLoader from "../../../with-loader";

import { useWorkflowRunDescribe } from "../../../../lib/apiclient/workflowRuns";
import WorkflowRunSummary from "./summary";
import AttestationInfo from "./attestation-info";

export const RunDetail = ({ runID }: { runID: string }) => {
  const { apiClient } = useAuth();
  const { isLoading, data } = useWorkflowRunDescribe(runID, apiClient);

  const run = data?.result?.workflowRun;
  const attestation = data?.result?.attestation;

  return (
    <WithLoader loading={isLoading}>
      {run && <WorkflowRunSummary run={run} />}
      {attestation && <AttestationInfo attestation={attestation} />}
    </WithLoader>
  );
};
