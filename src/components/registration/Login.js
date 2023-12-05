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
                  SwapCat
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
