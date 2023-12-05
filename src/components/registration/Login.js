import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  createTheme,
  ThemeProvider,
  experimental_sx as sx,
} from "@mui/material/styles";
import Navbar from "../navbar/Navbar";
import {
  Box,
  Grid,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "primary",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "primary",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2196f3",
    },
  },
});

const theme = createTheme({
  components: {
    // Name of the component
    MuiInputBase: {
      styleOverrides: {
        input: sx({
          borderColor: "white",
          color: "white",
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: sx({
          borderColor: "white",
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: sx({
          color: "white",
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: sx({
          color: "white",
        }),
      },
    },
  },
});

const SignIn = () => {
  const [password, setPassword] = React.useState("");
  const [leyenda, setLeyenda] = React.useState("");
  const [errorpassword, setErrorPassword] = React.useState(false);
  const [state, setState] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255)
        .required("name is required"),
      password: Yup.string()
        .required("Password is required"),
    }),
    onSubmit: values => {
      console.log(values);
      sendLogin(values, () => settingError("Invalid login"));
    },
  });

  const settingError = (msg) => {
    setError(msg)
    setTimeout(() => {
        setError(undefined)
    }, 5000);
  }

  const sendLogin = (values, errHandler) => {
    console.log(values)
    axios
      .get("http://localhost:8080/authentication/login", {
        //Test if the connection is established correctly
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        params: { username: values.name, password: values.password }
      })
      .then((data) => {
        console.log(data.data.data)
        console.log(data.data.data.result)
        if (data.data.data.result === false) {
          errHandler()
          return;
        }

        sessionStorage.setItem("username", values.name);
        sessionStorage.setItem("password", values.password);
        console.log("successfully");
        setState(true);
      })
      .catch((e) => errHandler());
  }


  if (state === true) {
    return <Navigate to="/portfolio"></Navigate>
  }

  return (
    <>
      <Navbar></Navbar>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3, marginTop: "80px" }}>
                <Typography
                  variant="h3"
                  fontFamily="Digitalism"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    marginLeft: "160px"
                  }}
                >
                  Cryptonita
                </Typography>
              </Box>
              <CssTextField
                error={Boolean(
                  formik.touched.name && formik.errors.name
                )}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="name"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined"
              />
              <CssTextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: -1,
                }}
              >
              </Box>
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
              {error === undefined ? null :
              <FormHelperText error>Invalid login</FormHelperText>
              }
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  onSubmit={() => console.log("woww")}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign Up Now
                </Button>
              </Box>
              <Grid container>
                <Grid item xs>
                  <Link href="Retrieve" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Register" variant="body2">
                    {"You don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SignIn;
















































/* eslint-disable */

/** 
import * as React from "react";
import "antd/dist/antd.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { Link as Link2 } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
  experimental_sx as sx,
} from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Cryptonita
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "primary",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "primary",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#2196f3",
    },
  },
});

const theme = createTheme({
  components: {
    // Name of the component
    MuiInputBase: {
      styleOverrides: {
        input: sx({
          borderColor: "white",
          color: "white",
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: sx({
          borderColor: "white",
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: sx({
          color: "white",
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: sx({
          color: "white",
        }),
      },
    },
  },
});
**/
/** 
export default function SignIn() {
  const [password, setPassword] = React.useState("");
  const [leyenda, setLeyenda] = React.useState("");
  const [errorpassword, setErrorPassword] = React.useState(false);

  const [status, setStatus] = useState([false]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    axios
      .get("http://localhost:8080/authentication/login?username=" + email + "&password=" + password, {
        //Test if the connection is established correctly
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((data) => {
        console.log(data.data.data)
        console.log(data.data.data.result)
        if (data.data.data.result === false) return;

        sessionStorage.setItem("username", email);
        sessionStorage.setItem("password", password);
        console.log("successfully");
        setStatus(true);
      })
      .catch((e) => console.log(e));
  };

  if (sessionStorage.getItem("username") !== null) {  // Already logger in
    return <Navigate to="/Portfolio"></Navigate>
}

  if (status === true) return <Navigate to="/" />;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            fontFamily="Digitalism"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Cryptonita
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              sx={{
                color: "white",
              }}
            />
            <CssTextField
              error={errorpassword}
              helperText={leyenda}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continuar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="Retrieve" variant="body2">
                  Olvidó la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"No tienes una cuenta? Registrarse"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
} **/
