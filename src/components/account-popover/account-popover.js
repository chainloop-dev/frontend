"use client";

import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useAuth } from "@contexts/auth";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const { currentUser, logout } = useAuth();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {currentUser.email}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={logout}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
