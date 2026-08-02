import "./AdminLogin.css";

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
import { loginAdmin } from "../services/adminService";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function AdminLogin() {
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
    const data = await loginAdmin({
      phoneNumber,
      password,
    });

    localStorage.setItem(
      "adminToken",
      data.token
    );

    setSnackbarMessage(
      "Admin login successful 🎉"
    );

    setSnackbarSeverity("success");

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate("/admin/dashboard");
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
    <Box className="admin-login-page">

      <Container maxWidth="sm">

        <Paper
          elevation={0}
          className="admin-login-card"
        >

         <Box className="admin-logo-wrapper">

  <Typography className="admin-logo-icon">
    ♻️
  </Typography>

  <Typography className="admin-logo-text">
    TrashGo
  </Typography>

</Box>

<Typography className="admin-login-title">
  Admin Login
</Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            className="admin-login-form"
          >

            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
              required
              fullWidth
            />

      <TextField
  label="Password"
  type={
    showPassword
      ? "text"
      : "password"
  }
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  required
  fullWidth
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            edge="end"
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
              variant="contained"
              size="large"
              className="admin-login-btn"
            >
              Login
            </Button>

          </Box>
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
    sx={{
      borderRadius: "12px",
      fontWeight: 600,
    }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>
        </Paper>

      </Container>

    </Box>
  );
}

export default AdminLogin;