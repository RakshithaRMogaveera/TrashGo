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
import { registerUser } from "../services/authService";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Signup.css";

function Signup() {
  const [name, setName] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [snackbarSeverity, setSnackbarSeverity] =
    useState("success");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {
      setSnackbarMessage(
        "Passwords do not match"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      await registerUser({
        name,
        phoneNumber,
        password,
      });

      setSnackbarMessage(
        "Account created successfully 🎉"
      );

      setSnackbarSeverity(
        "success"
      );

      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);

      setSnackbarMessage(
        error.response?.data?.message ||
        "Signup failed"
      );

      setSnackbarSeverity("error");

      setOpenSnackbar(true);
    }
  };
return (
  <Box className="signup-page">

    <Container
      maxWidth={false}
      className="signup-container"
    >

      <Paper
        elevation={10}
        className="signup-card"
      >

        <Box className="signup-logo-wrapper">

          <Typography className="signup-logo-icon">
            ♻️
          </Typography>

           <Typography
  fontWeight={700}
  className="signup-logo-text"
>
  TrashGo
</Typography>

</Box>

<Typography
  align="center"
  className="signup-subtitle"
>
  Create Your Account
</Typography>

<Box
  component="form"
  onSubmit={handleSignup}
  className="signup-form"
>
            <TextField
  placeholder="Full Name"
  InputLabelProps={{ shrink: false }}
  fullWidth
  value={name}
  onChange={(e) =>
    setName(
      e.target.value
    )
  }
/>

<TextField
  placeholder="Phone Number"
  InputLabelProps={{ shrink: false }}
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
  fullWidth
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            className="signup-password-toggle"
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
           <TextField
  placeholder="Confirm Password"
  InputLabelProps={{ shrink: false }}
  type={
    showConfirmPassword
      ? "text"
      : "password"
  }
  fullWidth
  value={confirmPassword}
  onChange={(e) =>
    setConfirmPassword(
      e.target.value
    )
  }
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            className="signup-password-toggle"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
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
  className="signup-btn"
>
  Create Account
</Button>

</Box>
          <Box
  className="signup-login-wrapper"
>
  <Typography className="signup-login-text">
    Already have an account?{" "}
    <Typography
      component="span"
      onClick={() => navigate("/")}
      className="signup-login-link"
    >
      Login
    </Typography>
  </Typography>
</Box>

<Typography
  align="center"
  className="signup-footer-text"
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
    severity={snackbarSeverity}
    variant="filled"
    className="signup-alert"
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

</Paper>
</Container>
</Box>
);
}

export default Signup;