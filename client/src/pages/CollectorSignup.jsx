import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signupCollector } from "../services/collectorService";
import { karnatakaLocations } from "../data/karnatakaLocations";
import "./CollectorSignup.css";
function CollectorSignup() {
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
  name: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  vehicleType: "",
  vehicleNumber: "",
  district: "",
  taluk: "",
});

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Passwords do not match"
      );
      setOpenSnackbar(true);
      return;
    }

    try {
  await signupCollector({
  name: formData.name,
  phoneNumber: formData.phoneNumber,
  password: formData.password,
  vehicleType: formData.vehicleType,
  vehicleNumber: formData.vehicleNumber,
  district: formData.district,
  taluk: formData.taluk,
});

      setSnackbarSeverity("success");
      setSnackbarMessage(
        "Registration successful. Waiting for admin approval."
      );

      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/collector/login");
      }, 1800);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error.response?.data?.message ||
          "Registration failed"
      );
      setOpenSnackbar(true);
    }
  };
{/*------------------hereit starts------------*/}
  return (
  <Box className="collector-signup-page">

    <Paper
      elevation={0}
      className="collector-signup-card"
    >

      {/* Decorative Circle */}

      <Box className="collector-circle-top" />

      <Box className="collector-circle-bottom" />
<Box className="collector-signup-logo">

<Typography className="signup-logo-icon">
            ♻️
          </Typography>
  <Typography className="signup-logo-text">
    TrashGo
  </Typography>

</Box>

        <Typography className="collector-signup-title">
  Collector Signup
</Typography>

<Typography className="collector-signup-subtitle">
  Register to become a TrashGo
  Collector
</Typography>

<Box
  component="form"
  onSubmit={handleSignup}
  className="collector-signup-form"
>
  <TextField
    fullWidth
    required
    label="Full Name"
    name="name"
    value={formData.name}
    onChange={handleChange}
  />

  <TextField
    fullWidth
    required
    label="Phone Number"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleChange}
  />

  <TextField
    fullWidth
    required
    label="Password"
    name="password"
    type={
      showPassword
        ? "text"
        : "password"
    }
    value={formData.password}
    onChange={handleChange}
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              className="collector-password-toggle"
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
  fullWidth
  required
  label="Confirm Password"
  name="confirmPassword"
  type={
    showConfirmPassword
      ? "text"
      : "password"
  }
  value={formData.confirmPassword}
  onChange={handleChange}
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            className="collector-password-toggle"
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

<TextField
  select
  required
  fullWidth
  label="Vehicle Type"
  name="vehicleType"
  value={formData.vehicleType}
  onChange={handleChange}
>
  
  <MenuItem value="Bike">
    Bike
  </MenuItem>
  <MenuItem value="Auto">
    Auto
  </MenuItem>
</TextField>

<TextField
  fullWidth
  label="Vehicle Number"
  name="vehicleNumber"
  value={formData.vehicleNumber}
  onChange={handleChange}
/>

<TextField
  select
  required
  fullWidth
  label="District"
  name="district"
  value={formData.district}
  onChange={(e) => {
    setFormData({
      ...formData,
      district: e.target.value,
      taluk: "",
    });
  }}
>
  {Object.keys(karnatakaLocations).map((district) => (
    <MenuItem key={district} value={district}>
      {district}
    </MenuItem>
  ))}
</TextField>
<TextField
  select
  required
  fullWidth
  label="Taluk"
  name="taluk"
  value={formData.taluk}
  onChange={handleChange}
  disabled={!formData.district}
>
  {(karnatakaLocations[formData.district] || []).map((taluk) => (
    <MenuItem key={taluk} value={taluk}>
      {taluk}
    </MenuItem>
  ))}
</TextField>

<Button
  type="submit"
  variant="contained"
  className="collector-signup-btn"
>
  Create Account
</Button>

<Typography
  align="center"
  className="collector-login-text"
>
  Already have an account?{" "}
  <Link
    to="/collector/login"
    className="collector-login-link"
  >
    Login
  </Link>
</Typography>

</Box>
</Paper>

<Snackbar
  open={openSnackbar}
  autoHideDuration={2500}
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
    onClose={() =>
      setOpenSnackbar(false)
    }
    className="collector-signup-alert"
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

</Box>
);
}

export default CollectorSignup;