
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.css";
function Login() {
  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [snackbarSeverity, setSnackbarSeverity] =
    useState("success");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        phoneNumber,
        password,
      });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSnackbarMessage(
        "Login successful 🎉"
      );

      setSnackbarSeverity(
        "success"
      );

      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);

      setSnackbarMessage(
        error.response?.data?.message ||
        "Login failed"
      );

      setSnackbarSeverity("error");

      setOpenSnackbar(true);
    }
  };

 return (
  <Box className="login-page">

    <Container
      maxWidth={false}
      className="login-container"
    >

      <Paper
        elevation={0}
        className="login-card"
      >

        <Box className="login-logo-wrapper">

          <Typography className="login-logo-icon">
            ♻️
          </Typography>

           <Typography
  fontWeight={700}
  className="login-logo-text"
>
  TrashGo
</Typography>

</Box>

<Typography
  align="center"
  className="login-subtitle"
>
  Login as User !
</Typography>

<Box
  component="form"
  onSubmit={handleLogin}
  className="login-form"
>

  <TextField
    placeholder="Phone Number"
    InputLabelProps={{ shrink: false }}
    variant="outlined"
    fullWidth
    value={phoneNumber}
    onChange={(e) =>
      setPhoneNumber(
        e.target.value
      )
    }
  />
           <TextField
  placeholder="Password"
  InputLabelProps={{ shrink: false }}
  type={
    showPassword
      ? "text"
      : "password"
  }
  variant="outlined"
  fullWidth
  value={password}
  onChange={(e) =>
    setPassword(
      e.target.value
    )
  }
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            className="login-password-toggle"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword ? (
              <VisibilityOff />
            ) : (
              <Visibility />
            )}
          </IconButton>
        </InputAdornment>
      ),
    },
  }}
/>

<Button
  type="submit"
  fullWidth
  variant="contained"
  className="login-btn"
>
  Login
</Button>

</Box>

         <Box className="login-signup-wrapper">
  <Typography className="login-signup-text">
    Don't have an account? 
    <Typography
      component="span"
      onClick={() =>
        navigate("/signup")
      }
      className="login-signup-link"
    >
        SignUp
    </Typography>
  </Typography>
</Box>

<Typography
  align="center"
  className="login-footer-text"
>
  Clean City • Smart Collection
</Typography>

<Snackbar
  open={openSnackbar}
  autoHideDuration={2000}
  onClose={() =>
    setOpenSnackbar(false)
  }
  anchorOrigin={{
    vertical: "top",
    horizontal: "center",
  }}
>
  <Alert
    onClose={() =>
      setOpenSnackbar(false)
    }
    severity={snackbarSeverity}
    variant="filled"
    className="login-alert"
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

</Paper>
</Container>
</Box>
);
}

export default Login;