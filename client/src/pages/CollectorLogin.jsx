import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginCollector } from "../services/collectorService";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./CollectorLogin.css";


function CollectorLogin() {
  const [phoneNumber, setPhoneNumber] =
    useState("");
const navigate = useNavigate();

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

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await loginCollector({
      phoneNumber,
      password,
    });

    localStorage.setItem(
      "collectorToken",
      data.token
    );

    setSnackbarMessage(
      "Collector login successful"
    );

    setSnackbarSeverity(
      "success"
    );

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate(
        "/collector/dashboard"
      );
    }, 1500);
  } catch (error) {
    console.error(error);

    setSnackbarMessage(
      error.response?.data?.message ||
        "Login failed"
    );

    setSnackbarSeverity(
      "error"
    );

    setOpenSnackbar(true);
  }
};
{/*--------------------------------here it starts--------------------------- */}
 return (
  <Box className="collector-login-page">

    <Paper
      elevation={0}
      className="collector-login-card"
    >

      <Box className="collector-login-circle-top" />

      <Box className="collector-login-circle-bottom" />
  <Box className="collector-login-panel-bg" />

<Box className="collector-login-panel-inner" />

<Box className="collector-login-logo">

  <Typography className="login-logo-icon">
            ♻️
          </Typography>

  <Typography className="login-logo-text">
    TrashGo
  </Typography>

</Box>

<Typography className="collector-login-title">
  Collector Login
</Typography>
<Typography className="collector-login-subtitle">
  Access your collector dashboard
</Typography>

<Box
  component="form"
  onSubmit={handleLogin}
  className="collector-login-form"
>
  <TextField
    label="Phone Number"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    fullWidth
    required
    variant="outlined"
  />

  <TextField
    label="Password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    fullWidth
    required
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              className="collector-login-password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
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
  className="collector-login-btn"
>
  Log in
</Button>

<Box className="collector-login-footer">

  <Typography className="collector-login-footer-text">
    Don't have a collector account?{" "}

    <Typography
      component="span"
      onClick={() =>
        navigate("/collector/signup")
      }
      className="collector-login-link"
    >
      Create Account
    </Typography>
  </Typography>

</Box>

</Box>
</Paper>

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
    className="collector-login-alert"
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

</Box>
);

}

export default CollectorLogin;