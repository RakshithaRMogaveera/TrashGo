import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "./CollectorMenu.css";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function CollectorMenu() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("collectorToken");
    setOpen(false);
    navigate("/collector/login?logout=true");
  };

  return (
    <>
      {/* ---------------- Desktop Navbar ---------------- */}

      <Box className="collector-desktop-navbar">

        <Typography
          variant="h5"
          className="collector-desktop-logo"
          onClick={() =>
            navigate("/collector/dashboard")
          }
        >
          ♻️ TrashGo
        </Typography>

        <Box className="collector-desktop-menu">

          <Box
            className={`collector-desktop-menu-item ${
              location.pathname ===
              "/collector/dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/collector/dashboard")
            }
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </Box>

          <Box
            className={`collector-desktop-menu-item ${
              location.pathname ===
              "/collector/available-bookings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(
                "/collector/available-bookings"
              )
            }
          >
            <AssignmentIcon />
            <span>Available Bookings</span>
          </Box>

          <Box
            className={`collector-desktop-menu-item ${
              location.pathname ===
              "/collector/my-bookings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/collector/my-bookings")
            }
          >
            <HistoryIcon />
            <span>My Bookings</span>
          </Box>
<Box
  className={`collector-desktop-menu-item ${
    location.pathname ===
    "/collector/profile"
      ? "active"
      : ""
  }`}
  onClick={() =>
    navigate("/collector/profile")
  }
>
  <PersonIcon />
  <span>Profile</span>
</Box>
          <Box
            className="collector-desktop-menu-item logout"
            onClick={handleLogout}
          >
            <LogoutIcon />
            <span>Logout</span>
          </Box>

        </Box>

      </Box>

      {/* ---------------- Mobile Menu Button ---------------- */}

      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          className="collector-menu-button"
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* ---------------- Mobile Drawer ---------------- */}

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            className:
              "collector-menu-drawer",
          },
        }}
      >
        <Box className="collector-menu-content">

          <Typography
            variant="h4"
            className="collector-menu-logo"
          >
            ♻️ TrashGo
          </Typography>

          <List>

            <ListItemButton
              selected={
                location.pathname ===
                "/collector/dashboard"
              }
              onClick={() => {
                navigate(
                  "/collector/dashboard"
                );
                setOpen(false);
              }}
              className="collector-menu-item"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>

              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
              selected={
                location.pathname ===
                "/collector/available-bookings"
              }
              onClick={() => {
                navigate(
                  "/collector/available-bookings"
                );
                setOpen(false);
              }}
              className="collector-menu-item"
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>

              <ListItemText primary="Available Bookings" />
            </ListItemButton>

            <ListItemButton
              selected={
                location.pathname ===
                "/collector/my-bookings"
              }
              onClick={() => {
                navigate(
                  "/collector/my-bookings"
                );
                setOpen(false);
              }}
              className="collector-menu-item"
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>

              <ListItemText primary="My Bookings" />
            </ListItemButton>

<ListItemButton
  selected={
    location.pathname ===
    "/collector/profile"
  }
  onClick={() => {
    navigate("/collector/profile");
    setOpen(false);
  }}
  className="collector-menu-item"
>
  <ListItemIcon>
    <PersonIcon />
  </ListItemIcon>

  <ListItemText primary="Profile" />
</ListItemButton>


            <ListItemButton
              onClick={handleLogout}
              className="collector-menu-logout"
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>

              <ListItemText primary="Logout" />
            </ListItemButton>

          </List>

        </Box>
      </Drawer>
    </>
  );
}

export default CollectorMenu;