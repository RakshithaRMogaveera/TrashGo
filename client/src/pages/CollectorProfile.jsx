import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import CollectorMenu from "../components/CollectorMenu";
import { useNavigate } from "react-router-dom";
import {
  useState,
  useEffect,
} from "react";
import "./CollectorProfile.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  getCollectorProfile,
  updateCollectorProfile,
  changeCollectorPassword,
} from "../services/collectorService";

const InfoItem = ({
  icon,
  title,
  value,
  color = "#16a34a",
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 2,
      p: 2,
      borderRadius: 3,
      background: "rgba(255,255,255,0.45)",
      border: "1px solid rgba(255,255,255,0.5)",
    }}
  >
    <Box
      sx={{
        color,
        mt: "2px",
      }}
    >
      {icon}
    </Box>

    <Box sx={{ flex: 1 }}>
      <Typography
        variant="caption"
        sx={{
          color: "#64748b",
          display: "block",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontWeight: 600,
          color: "#1f2937",
          wordBreak: "break-word",
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);
function CollectorProfile() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [snackbarSeverity, setSnackbarSeverity] =
    useState("success");

 const [collector, setCollector] =
  useState(
    JSON.parse(
      localStorage.getItem("collector")
    ) || {}
  );

  const [editMode, setEditMode] =
    useState(false);

 const [editedName, setEditedName] =
  useState(collector?.name || "");

const [editedPhone, setEditedPhone] =
  useState(collector?.phoneNumber || "");

const [editedVehicleNumber, setEditedVehicleNumber] =
  useState(collector?.vehicleNumber || "");
useEffect(() => {
  fetchCollectorProfile();
}, []);

const fetchCollectorProfile = async () => {
  try {
    const data = await getCollectorProfile();

    setCollector(data);

    setEditedName(data.name);

    setEditedPhone(data.phoneNumber);

    setEditedVehicleNumber(
      data.vehicleNumber || ""
    );

    localStorage.setItem(
      "collector",
      JSON.stringify(data)
    );
  } catch (error) {
    console.log(error);
  }
};
  const handleChangePassword =
  async () => {

    if (
      currentPassword ===
      newPassword
    ) {
      setSnackbarMessage(
        "Current password and new password cannot be the same"
      );

      setSnackbarSeverity(
        "error"
      );

      setOpenSnackbar(true);

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setSnackbarMessage(
        "Passwords do not match"
      );

      setSnackbarSeverity(
        "error"
      );

      setOpenSnackbar(true);

      return;
    }

    try {

      await changeCollectorPassword(
        currentPassword,
        newPassword
      );

      setSnackbarMessage(
        "Password updated successfully"
      );

      setSnackbarSeverity(
        "success"
      );

      setOpenSnackbar(true);

      setCurrentPassword("");

      setNewPassword("");

      setConfirmPassword("");

      setShowPasswordForm(
        false
      );

    } catch (error) {

      setSnackbarMessage(
        error.response?.data
          ?.message ||
          "Failed to update password"
      );

      setSnackbarSeverity(
        "error"
      );

      setOpenSnackbar(true);

    }
  };

const handleUpdateProfile =
  async () => {
    try {
      const data =
        await updateCollectorProfile(
          editedName,
          editedPhone,
          editedVehicleNumber
        );

      const updatedCollector =
        data.collector;

      localStorage.setItem(
        "collector",
        JSON.stringify(
          updatedCollector
        )
      );

      setCollector(
        updatedCollector
      );

      setSnackbarMessage(
        "Profile updated successfully"
      );

      setSnackbarSeverity(
        "success"
      );

      setOpenSnackbar(true);

      setEditMode(false);
    } catch (error) {
      setSnackbarMessage(
        error.response?.data
          ?.message ||
          "Failed to update profile"
      );

      setSnackbarSeverity(
        "error"
      );

      setOpenSnackbar(true);
    }
  };

return (
  <Box className="collector-profile-page">
    <CollectorMenu />

    <Box className="collector-profile-container">
      <Box className="collector-profile-layout">

        {/* ================= LEFT (75%) ================= */}

        <Box className="collector-profile-main">

          <Paper
            elevation={0}
            className="collector-profile-card"
          >
            <Box className="collector-profile-glow-one" />
            <Box className="collector-profile-glow-two" />

            {/* ---------------- Hero ---------------- */}

            <Box className="collector-profile-hero">

              <Box className="collector-profile-avatar-wrapper">

                <Avatar
                  src="/images/collector.png"
                  className="collector-profile-avatar"
                />

              </Box>

              <Box className="collector-profile-heading">

                <Typography className="collector-profile-name">
                  {collector?.name}
                </Typography>

                <Typography className="collector-profile-role">
                  Verified TrashGo Collector
                </Typography>

                <Typography className="collector-profile-tagline">
                  Helping keep cities cleaner by collecting waste
                  safely and responsibly.
                </Typography>

              </Box>

            </Box>

            {/* ---------------- Details Card ---------------- */}

            <Paper
              elevation={0}
              className="collector-details-card"
            >

              {editMode ? (

                <Box className="collector-details-edit">

                  <TextField
                    fullWidth
                    label="Name"
                    value={editedName}
                    onChange={(e) =>
                      setEditedName(e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={editedPhone}
                    onChange={(e) =>
                      setEditedPhone(e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Vehicle Number"
                    value={editedVehicleNumber}
                    onChange={(e) =>
                      setEditedVehicleNumber(
                        e.target.value.toUpperCase()
                      )
                    }
                  />

                </Box>

              ) : (
              
<>
  {/* Full Name */}

  <Box className="collector-detail-row">

    <Box className="collector-detail-icon">
      <BadgeOutlinedIcon sx={{ fontSize: 20 }} />
    </Box>

    <Typography className="collector-detail-label">
      Full Name
    </Typography>

    <Typography className="collector-detail-value">
      {collector?.name}
    </Typography>

  </Box>

  <Divider />

  {/* Phone */}

  <Box className="collector-detail-row">

    <Box className="collector-detail-icon">
      <LocalPhoneOutlinedIcon sx={{ fontSize: 20 }} />
    </Box>

    <Typography className="collector-detail-label">
      Phone Number
    </Typography>

    <Typography className="collector-detail-value">
      {collector?.phoneNumber}
    </Typography>

  </Box>

  <Divider />

  {/* Vehicle Type */}

  <Box className="collector-detail-row">

    <Box className="collector-detail-icon">
      <RecyclingOutlinedIcon sx={{ fontSize: 20 }} />
    </Box>

    <Typography className="collector-detail-label">
      Vehicle Type
    </Typography>

    <Typography className="collector-detail-value">
      {collector?.vehicleType}
    </Typography>

  </Box>

  <Divider />

  {/* Vehicle Number */}

  <Box className="collector-detail-row">

    <Box className="collector-detail-icon">
      <RecyclingOutlinedIcon sx={{ fontSize: 20 }} />
    </Box>

    <Typography className="collector-detail-label">
      Vehicle Number
    </Typography>

    <Typography className="collector-detail-value">
      {collector?.vehicleNumber || "Not Provided"}
    </Typography>

  </Box>

  <Divider />

  {/* District */}

  <Box className="collector-detail-row">

    <Box className="collector-detail-icon">
      <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />
    </Box>

    <Typography className="collector-detail-label">
      District
    </Typography>

    <Typography className="collector-detail-value">
      {collector?.district}
    </Typography>

  </Box>

  <Divider />

  {/* Taluk */}

  <Box className="collector-detail-row">

    <Box className="collector-detail-icon">
      <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />
    </Box>

    <Typography className="collector-detail-label">
      Taluk
    </Typography>

    <Typography className="collector-detail-value">
      {collector?.taluk}
    </Typography>

  </Box>

  <Divider />

  {/* Role */}

  <Box className="collector-detail-row">

    <Box className="collector-detail-icon">
      <RecyclingOutlinedIcon sx={{ fontSize: 20 }} />
    </Box>

    <Typography className="collector-detail-label">
      Role
    </Typography>

    <Typography className="collector-detail-value">
      Collector
    </Typography>

  </Box>

</>

)}
</Paper>

<Box className="collector-action-area">

  <Button
    fullWidth
    variant={editMode ? "outlined" : "contained"}
    onClick={() => setEditMode(!editMode)}
    startIcon={!editMode && <EditOutlinedIcon />}
    className={
      editMode
        ? "collector-cancel-btn"
        : "collector-edit-btn"
    }
  >
    {editMode
      ? "Cancel Editing"
      : "Edit Profile"}
  </Button>

  {editMode && (

    <Button
      fullWidth
      variant="contained"
      color="success"
      onClick={handleUpdateProfile}
      className="collector-save-btn"
    >
      Save Changes
    </Button>

  )}

</Box>

</Paper>

</Box>

{/* ================= RIGHT (25%) ================= */}

<Box className="collector-profile-sidebar">

  {/* Security Card */}

  <Paper
    elevation={0}
    className="collector-security-card"
  >

    <Box
      className={`collector-security-header ${
        showPasswordForm
          ? "collector-security-header-open"
          : ""
      }`}
    >

      <Box>

        <Box className="collector-security-title-row">

          <LockOutlinedIcon
            sx={{
              color: "#c98d14",
            }}
          />

          <Typography className="collector-security-title">
            Security
          </Typography>

        </Box>

        <Typography
          className="collector-security-subtitle"
        >
          Keep your collector account protected.
        </Typography>

      </Box>

      <Button
        variant="outlined"
        className="collector-security-btn"
        onClick={() =>
          setShowPasswordForm(!showPasswordForm)
        }
      >
        {showPasswordForm
          ? "Close"
          : "Change Password"}
      </Button>

    </Box>

    {showPasswordForm && (

      <Box className="collector-password-form">

        <TextField
          fullWidth
          label="Current Password"
          type={
            showCurrentPassword
              ? "text"
              : "password"
          }
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
          className="collector-password-field"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowCurrentPassword(
                        !showCurrentPassword
                      )
                    }
                  >
                    {showCurrentPassword ? (
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
          label="New Password"
          type={
            showNewPassword
              ? "text"
              : "password"
          }
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          className="collector-password-field"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowNewPassword(
                        !showNewPassword
                      )
                    }
                  >
                    {showNewPassword ? (
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
          label="Confirm Password"
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          className="collector-password-field"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
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
          fullWidth
          variant="contained"
          className="collector-password-btn"
          onClick={handleChangePassword}
        >
          Update Password
        </Button>

      </Box>

    )}

  </Paper>

  {/* Dashboard */}

  <Paper
    elevation={0}
    className="collector-dashboard-card"
  >

    <Button
      fullWidth
      variant="contained"
      className="collector-dashboard-btn"
      onClick={() =>
        navigate("/collector/dashboard")
      }
    >
      Back to Dashboard
    </Button>

  </Paper>

  {/* Thank You */}

  <Paper
    elevation={0}
    className="collector-thankyou-card"
  >

    <Typography className="collector-thankyou-title">
      🚛 Thank You!
    </Typography>

    <Typography className="collector-thankyou-text">

      Every pickup you complete makes the
      environment cleaner and healthier.

      Thank you for being one of TrashGo's
      everyday heroes.

    </Typography>

  </Paper>

</Box>

</Box>

<Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
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
  >
    {snackbarMessage}
  </Alert>

</Snackbar>

</Box>

</Box>


);
}

export default CollectorProfile;