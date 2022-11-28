import { AttestationItem } from "../../../../../gen/controlplane/v1/response_messages";
import { Grid } from "@mui/material";

export const AttestationInfo = ({
  attestation,
}: {
  attestation: AttestationItem;
}) => {
  console.log(envelope(attestation));
  console.log(statement(attestation));

  return (
    <Grid container spacing={2} sx={{ mt: "5px" }}>
      <Grid item>{JSON.stringify(statement(attestation))}</Grid>
    </Grid>
  );
};

const envelope = (att: AttestationItem) => {
  const raw = new TextDecoder().decode(att.envelope);
  return JSON.parse(raw);
};

const statement = (att: AttestationItem) => {
  const intotoEnvelope = envelope(att);
  const statementRaw = Buffer.from(intotoEnvelope.payload, "base64").toString(
    "utf8"
  );
  return JSON.parse(statementRaw);
};
