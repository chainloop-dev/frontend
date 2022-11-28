import { AttestationItem } from "@pb/controlplane/v1/response_messages";
import { Grid } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const AttestationInfo = ({
  attestation,
}: {
  attestation: AttestationItem;
}) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ fontSize: "12px" }}>
        <SyntaxHighlighter language="json" style={theme}>
          {JSON.stringify(statement(attestation), null, 2)}
        </SyntaxHighlighter>
      </Grid>
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
