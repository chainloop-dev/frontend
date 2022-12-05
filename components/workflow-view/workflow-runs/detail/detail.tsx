import { useAuth } from "@contexts/auth";
import { useWorkflowRunDescribe } from "@lib/apiclient/workflow-runs";
import WorkflowRunSummary from "./summary";
import AttestationInfo from "./attestation-info";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

export const RunDetail = ({ runID }: { runID: string }) => {
  const { apiClient } = useAuth();
  const { data } = useWorkflowRunDescribe(runID, apiClient);

  const run = data?.result?.workflowRun;
  const attestation = data?.result?.attestation;
  const contract = run?.contractVersion;

  return (
    <Card raised>
      <CardHeader title="Workflow Run Info" />
      <Divider />
      <CardContent sx={{ paddingTop: "20px" }}>
        {run && <WorkflowRunSummary run={run} />}
        {attestation && contract && (
          <AttestationInfo contract={contract} attestation={attestation} />
        )}
        {!attestation && (
          <Typography variant="h5" align="center" m={4}>
            The attestation crafting is in progress. Not been received yet.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
