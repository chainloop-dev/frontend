import Link from "next/link";
import PropTypes from "prop-types";
import {
  Grid,
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  Button,
  Link as MaterialLink,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import NavItem from "../nav-item";
import { useEffect } from "react";

const items = [
  {
    href: "/dashboard",
    icon: <DashboardIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/dashboard/workflows",
    icon: <ListAltIcon fontSize="small" />,
    title: "Workflows",
  },
  {
    href: "/dashboard/workflow-runs",
    icon: <DonutLargeIcon fontSize="small" />,
    title: "Workflow Runs",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  // Close the floating panel on load
  useEffect(
    () => {
      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Grid container spacing={2} sx={{ p: 3 }} alignItems="center">
            <Grid item>
              <MaterialLink
                href="/dashboard"
                component={Link}
                underline="none"
                color="inherit"
              >
                <AllInclusiveIcon sx={{ height: 42, width: 42 }} />
              </MaterialLink>
            </Grid>
            <Grid item>
              <MaterialLink
                href="/dashboard"
                component={Link}
                underline="none"
                color="inherit"
              >
                <Typography variant="subtitle1">ChainLoop</Typography>
              </MaterialLink>
            </Grid>
          </Grid>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            mb: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider
          sx={{
            borderColor: "#2D3748",
          }}
        />
        <Button
          color="secondary"
          component="a"
          target="_blank"
          href="https://docs.chainloop.dev"
          endIcon={<OpenInNewIcon />}
          sx={{
            px: "3px",
            color: "grey.300",
          }}
        >
          Documentation
        </Button>
      </Box>
    </>
  );

  // Stick panel
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "grey.900",
            color: "grey.300",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  // Floating panel
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "grey.900",
          color: "grey.300",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
