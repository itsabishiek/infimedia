import { Alert, Snackbar } from "@mui/material";
import React from "react";

const AlertBar = ({ alert, setAlert }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        variant="outlined"
        elevation={10}
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
