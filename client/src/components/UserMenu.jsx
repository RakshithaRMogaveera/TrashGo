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
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

import "./UserMenu.css";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function UserMenu() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setOpen(false);
    navigate("/dashboard?logout=true");
  };

  return (
    <>
      {/* ---------------- Desktop Navbar ---------------- */}

      <Box className="desktop-navbar">

        <Typography
          variant="h5"
          className="desktop-logo"
          onClick={() => navigate("/dashboard")}
        >
          ♻️ TrashGo
        </Typography>

        <Box className="desktop-menu">

          <Box
            className={`desktop-menu-item ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
            onClick={() => navigate("/dashboard")}
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </Box>

          <Box
            className={`desktop-menu-item ${
              location.pathname === "/book-pickup" ? "active" : ""
            }`}
            onClick={() => navigate("/book-pickup")}
          >
            <DeleteIcon />
            <span>Book Pickup</span>
          </Box>

          <Box
            className={`desktop-menu-item ${
              location.pathname === "/booking-history" ? "active" : ""
            }`}
            onClick={() => navigate("/booking-history")}
          >
            <HistoryIcon />
            <span>Booking History</span>
          </Box>

          <Box
            className={`desktop-menu-item ${
              location.pathname === "/profile" ? "active" : ""
            }`}
            onClick={() => navigate("/profile")}
          >
            <PersonIcon />
            <span>Profile</span>
          </Box>

          <Box
            className="desktop-menu-item logout"
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
    className="user-menu-button"
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
            className: "user-menu-drawer",
          },
        }}
      >
        <Box className="user-menu-content">

          <Typography
            variant="h4"
            className="user-menu-logo"
          >
            ♻️ TrashGo
          </Typography>

          <List>

            <ListItemButton
              selected={location.pathname === "/dashboard"}
              onClick={() => {
                navigate("/dashboard");
                setOpen(false);
              }}
              className="user-menu-item"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>

              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
              selected={location.pathname === "/book-pickup"}
              onClick={() => {
                navigate("/book-pickup");
                setOpen(false);
              }}
              className="user-menu-item"
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>

              <ListItemText primary="Book Pickup" />
            </ListItemButton>

            <ListItemButton
              selected={location.pathname === "/booking-history"}
              onClick={() => {
                navigate("/booking-history");
                setOpen(false);
              }}
              className="user-menu-item"
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>

              <ListItemText primary="Booking History" />
            </ListItemButton>

            <ListItemButton
              selected={location.pathname === "/profile"}
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="user-menu-item"
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>

              <ListItemText primary="Profile" />
            </ListItemButton>

            <ListItemButton
              onClick={handleLogout}
              className="user-menu-logout"
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

export default UserMenu;