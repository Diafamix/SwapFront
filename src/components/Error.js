import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

const buttons = [
  <Link to={`/${"login"}`}>
    <Button key="Login">Sign In</Button>
  </Link>,
  <Link to={`/${"Register"}`}>
    <Button key="Register">Register Now</Button>
  </Link>,
  ,
];

export default function BasicAlerts() {
  return (
    <Stack
      sx={{
        width: "100%",
        alignItems: "center",
        margin: "200px auto",
      }}
      spacing={2}
    >
      <Alert variant="filled" severity="error">
        You need to be registered — check it out!
      </Alert>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          color="primary"
          variant="contained"
          aria-label="medium secondary button group"
        >
          {buttons}
        </ButtonGroup>
      </Box>
    </Stack>
  );
}
