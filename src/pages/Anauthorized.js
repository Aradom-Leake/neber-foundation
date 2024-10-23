import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
const Anauthorized = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        justifyItems: "center",
        justifyContent: "center",
      }}
      spacing={2}
    >
      <Alert severity="error" sx={{ justifyContent: "center" }}>
        <AlertTitle>
          <Typography variant="h3">Error</Typography>
        </AlertTitle>
        <Typography variant="h2">401 Unauthorized.</Typography>
      </Alert>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/">
          <Typography variant="h4">Go Back to home</Typography>
        </Link>
      </Box>
    </Stack>
  );
};

export default Anauthorized;
