import { AttestationItem } from "@pb/controlplane/v1/response_messages";
import {
  Box,
  Tabs,
  Tab,
  TableContainer,
  Paper,
  TableBody,
  Table,
  Toolbar,
  Typography,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";

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
        <Tab label="Summary" />
        <Tab label="Statement" />
        <Tab label="Envelope" />
      </Tabs>
      <TabPanel index={0} value={selectedTab}>
        <AttestationSummary att={attestation} />
      </TabPanel>
      <TabPanel index={1} value={selectedTab}>
        <Codehighlighter data={statement(attestation)} />
      </TabPanel>
      <TabPanel index={2} value={selectedTab}>
        <Codehighlighter data={envelope(attestation)} />
      </TabPanel>
    </Box>
  );
};

const Codehighlighter = ({ data }: { data: any }) => (
  <Box sx={{ fontSize: "12px" }}>
    <SyntaxHighlighter language="json" style={theme}>
      {JSON.stringify(data, null, 2)}
    </SyntaxHighlighter>
  </Box>
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
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
};

const AttestationSummary = ({ att }: { att: AttestationItem }) => {
  return (
    <>
      {att.materials.length > 0 && (
        <Paper sx={{ margin: "10px", padding: "10px" }}>
          <Toolbar disableGutters>
            <Typography variant="h6">Materials</Typography>
          </Toolbar>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {att.materials.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell sx={{ minWidth: "200px" }}>{m.name}</TableCell>
                    <TableCell sx={{ minWidth: "100px" }}>{m.type}</TableCell>
                    <TableCell>{m.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {att.envVars.length > 0 && (
        <Paper sx={{ margin: "10px", padding: "10px" }}>
          <Toolbar disableGutters>
            <Typography variant="h6">Environment Variables</Typography>
          </Toolbar>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {att.envVars.map((e) => (
                  <TableRow key={e.name}>
                    <TableCell sx={{ minWidth: "200px" }}>{e.name}</TableCell>
                    <TableCell>{e.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};
