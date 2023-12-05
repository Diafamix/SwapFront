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

const Register = () => {
  const [password, setPassword] = React.useState("");
  const [leyenda, setLeyenda] = React.useState("");
  const [errorpassword, setErrorPassword] = React.useState(false);
  const [state, setState] = React.useState(false);
  const [error, setError] = React.useState()

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      username: Yup.string()
        .required("Username is required"),
      password: Yup.string()
        .required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: values => {
      console.log(values);
      sendRegistration(values);
    },
  });

  const sendRegistration = (values) => {
    axios
      .post("http://localhost:8080/autentication/register", null, {
        //Test if the connection is established correctly
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        params: { mail: values.email, username: values.username, password: values.password }
      })
      .then((data) => {
        console.log(data)
        if (data.data.status.error_message.length > 0) {
          settingError(data.data.status.error_message)
        } else
          setState(true)
      })
      .catch((e) => {
        console.log(e)
        settingError(e.response.data.status.error_message)
      }
      );
  }

  const settingError = (msg) => {
    setError(msg)
    setTimeout(() => {
      setError(undefined)
    }, 5000);
  }

  if (state === true) {
    return <Navigate to="/login"></Navigate>
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
                <Typography color="white" variant="h4">
                  Create a new account
                </Typography>
                <Typography color="primary" gutterBottom variant="body2">
                  Use your email to create a new account
                </Typography>
              </Box>
              <CssTextField
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label="Username"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
                variant="outlined"
              />
              <CssTextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
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
                <Checkbox
                  checked={formik.values.policy}
                  name="policy"
                  onChange={formik.handleChange}
                />
                <Typography color="white" variant="body2">
                  I have read the{" "}
                  <NextLink href="#" passHref>
                    <Link
                      color="primary"
                      underline="always"
                      variant="subtitle2"
                    >
                      Terms and Conditions
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
              {!error ? null : <FormHelperText error>{error}</FormHelperText>}
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
              <Typography color="white" variant="body2">
                Have an account?{" "}
                <Link href="/Login" variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </Typography>
            </form>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Register;
