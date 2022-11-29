import { AttestationItem } from "@pb/controlplane/v1/response_messages";
import { Box, Tabs, Tab, Divider } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ReactNode, useState } from "react";

export const AttestationInfo = ({
  attestation,
}: {
  attestation: AttestationItem;
}) => {
  const [selectedTab, selectTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    selectTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Tab label="Statement" />
        <Tab label="Envelope" />
      </Tabs>
      <TabPanel index={0} value={selectedTab}>
        <Codehighlighter data={statement(attestation)} />
      </TabPanel>
      <TabPanel index={1} value={selectedTab}>
        <Codehighlighter data={envelope(attestation)} />
      </TabPanel>
    </Box>
  );
};

const Codehighlighter = ({ data }: { data: any }) => (
  <SyntaxHighlighter language="json" style={theme}>
    {JSON.stringify(data, null, 2)}
  </SyntaxHighlighter>
);

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};
