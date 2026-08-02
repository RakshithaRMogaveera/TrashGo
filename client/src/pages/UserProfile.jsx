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
import UserMenu from "../components/UserMenu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./UserProfile.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  changePassword,
  updateProfile,
} from "../services/userService";
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
function UserProfile() {
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

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      ) || {}
    );

  const [editMode, setEditMode] =
    useState(false);

  const [editedName, setEditedName] =
    useState(user?.name || "");

  const [editedPhone, setEditedPhone] =
    useState(user?.phoneNumber || "");

  const handleChangePassword =
    async () => {

      if (
        currentPassword === newPassword
      ) {
        setSnackbarMessage(
          "Current password and new password cannot be the same"
        );

        setSnackbarSeverity("error");

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

        setSnackbarSeverity("error");

        setOpenSnackbar(true);

        return;
      }

      try {
        const data =
          await changePassword(
            currentPassword,
            newPassword
          );

        setSnackbarMessage(
          "Password updated successfully"
        );

        setSnackbarSeverity("success");

        setOpenSnackbar(true);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        setSnackbarMessage(
          error.response?.data?.message ||
          "Failed to update password"
        );

        setSnackbarSeverity("error");

        setOpenSnackbar(true);
      }
    };


  const handleUpdateProfile =
    async () => {
      try {
        const data =
          await updateProfile(
            editedName,
            editedPhone
          );

        const updatedUser =
          data.user;

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );

        setUser(updatedUser);

        setSnackbarMessage(
          "Profile updated successfully"
        );

        setSnackbarSeverity(
          "success"
        );

        setOpenSnackbar(true);

        setEditMode(false);
      } catch (error) {
        console.log(error);

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
 <Box className="profile-page">
    <UserMenu />

    <Box className="profile-container">
     

      {/* Left & Right Columns */}
      <Box className="profile-layout">
        {/* LEFT COLUMN */}
        <Box className="profile-left">
            <Paper
  elevation={0}
  className="profile-card"
>
  {/* Background Glow */}
 <Box className="profile-glow-top" />

  <Box className="profile-glow-bottom" />
{/* Profile */}

<Box className="profile-user-section">

  <Box className="profile-user-info">

    <Avatar
      src="/images/user.jpg"
      className="profile-avatar"
    />

    <Typography className="profile-user-name">
      {user?.name}
    </Typography>

    <Typography className="profile-user-role">
      TrashGo User 🌿
    </Typography>

  </Box>

</Box>

{/* DETAILS SECTION STARTS BELOW */}
{/* ---------------- Details Section ---------------- */}

<Paper
  elevation={0}
  className="profile-details-card"
>
  {editMode ? (
    <Box className="profile-details-edit">
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
      />
    </Box>
  ) : (
    <>
      {/* Full Name */}

      <Box className="profile-detail-row">

        <BadgeOutlinedIcon
          sx={{
            color: "#166534",
            fontSize: 18,
          }}
        />

        <Typography className="profile-detail-label">
          Full Name
        </Typography>

        <Typography className="profile-detail-value">
          {user?.name}
        </Typography>

      </Box>

      <Divider />

      {/* Phone */}

<Box className="profile-detail-row">

  <LocalPhoneOutlinedIcon
    sx={{
      color: "#166534",
      fontSize: 18,
    }}
  />

  <Typography className="profile-detail-label">
    Phone Number
  </Typography>

  <Typography className="profile-detail-value">
    {user?.phoneNumber}
  </Typography>

</Box>

<Divider />
      {/* Role */}

<Box className="profile-detail-row">

  <RecyclingOutlinedIcon
    sx={{
      color: "#166534",
      fontSize: 18,
    }}
  />

  <Typography className="profile-detail-label">
    Role
  </Typography>

  <Typography className="profile-detail-value">
    User
  </Typography>

</Box>

</>
)}
</Paper>

<Box className="profile-action-buttons">

  <Button
    fullWidth
    variant={editMode ? "outlined" : "contained"}
    onClick={() => setEditMode(!editMode)}
    startIcon={!editMode && <EditOutlinedIcon />}
    className={
      editMode
        ? "profile-edit-btn-outlined"
        : "profile-edit-btn"
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
      className="profile-save-btn"
    >
      Save Changes
    </Button>
  )}

</Box>
{/* CLOSE PROFILE CARD */}
</Paper>

{/* CLOSE LEFT COLUMN */}
</Box>

{/* RIGHT COLUMN STARTS */}
<Box className="profile-right">

  <Paper
    elevation={0}
    className="security-card"
  >

    <Box
      className={`security-header ${
        showPasswordForm
          ? "security-header-open"
          : ""
      }`}
    >

      <Box>

        <Box className="security-title-row">

          <LockOutlinedIcon
            sx={{
              color: "#b8790c",
            }}
          />

          <Typography
            variant="h6"
            className="security-title"
          >
            Security
          </Typography>

        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Keep your account safe and secure
        </Typography>

      </Box>

      <Button
        variant="outlined"
        onClick={() =>
          setShowPasswordForm(!showPasswordForm)
        }
        className="security-btn"
      >
        {showPasswordForm
          ? "Close"
          : "Change Password"}
      </Button>

    </Box>
 {showPasswordForm && (
  <Box className="password-form">

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
        setCurrentPassword(
          e.target.value
        )
      }
      className="password-field"
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
        setNewPassword(
          e.target.value
        )
      }
      className="password-field"
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
      label="Confirm New Password"
      type={
        showConfirmPassword
          ? "text"
          : "password"
      }
      value={confirmPassword}
      onChange={(e) =>
        setConfirmPassword(
          e.target.value
        )
      }
      className="password-field"
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
      onClick={handleChangePassword}
      className="update-password-btn"
    >
      Update Password
    </Button>

  </Box>
)}

</Paper>

<Paper
  elevation={0}
  className="dashboard-card"
>

  <Button
    fullWidth
    variant="contained"
    onClick={() => navigate("/dashboard")}
    className="dashboard-btn"
  >
    Back to Dashboard
  </Button>

</Paper>

<Paper
  elevation={0}
  className="thankyou-card"
>

  <Typography
    variant="h6"
    className="thankyou-title"
  >
    🌱 Thank You!
  </Typography>

  <Typography
    variant="body2"
    className="thankyou-text"
  >
    Every pickup you schedule contributes to a cleaner
    neighborhood and a greener future. Thank you for
    choosing TrashGo and supporting responsible waste
    management.
  </Typography>

</Paper>

</Box>
 {/* Right Column */}

</Box> {/* Two-column Layout */}

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
  className="profile-snackbar"
>
  <Alert
    severity={snackbarSeverity}
    variant="filled"
    onClose={() =>
      setOpenSnackbar(false)
    }
    className="profile-alert"
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

</Box> {/* Content Wrapper */}

</Box>
);
}

export default UserProfile;