import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import UserMenu from "../components/UserMenu";

import {
  Delete,
  History,
  Person,
  Logout,
} from "@mui/icons-material";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import "./UserDashboard.css";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import RecyclingRoundedIcon from "@mui/icons-material/RecyclingRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SpaRoundedIcon from "@mui/icons-material/Spa";
function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const backgrounds = [
    "/images/bg1.jpg",
    "/images/bg2.jpg",
    "/images/bg3.jpg",
  ];

  const [currentBg, setCurrentBg] =
    useState(0);

  const [loggedOut, setLoggedOut] =
    useState(false);

  useEffect(() => {
    const params =
      new URLSearchParams(
        location.search
      );

    if (
      params.get("logout") ===
      "true"
    ) {
      localStorage.clear();

      setLoggedOut(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [location, navigate]);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setCurrentBg(
          (prev) =>
            (prev + 1) %
            backgrounds.length
        );
      }, 3000);

    return () =>
      clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    setLoggedOut(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

 if (loggedOut) {
  return (
    <Box className="logout-page">
      <Paper className="logout-card">
        <Typography
          variant="h1"
          className="logout-emoji"
        >
          👋
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          color="#166534"
        >
          Logged Out Successfully
        </Typography>

        <Typography className="logout-message">
          Thank you for using
          TrashGo. Redirecting to
          login page...
        </Typography>
      </Paper>
    </Box>
  );
}
 return (
  <Box
    className="dashboard-page"
    style={{
      "--dashboard-bg": `url(${backgrounds[currentBg]})`,
    }}
  >
    <UserMenu />

    <Box className="dashboard-hero-wrapper">

      {/*-------------------Hero------------------------*/}

      <Paper
        elevation={0}
        className="dashboard-hero-card"
      >

        {/* Top Right Dots */}

        <Box className="dashboard-hero-dots" />
         {/* Bottom Left Dots */}

<Box className="dashboard-hero-dots-bottom" />

<Box className="dashboard-hero-grid">
           {/* LEFT SIDE */}
            <Box className="hero-left">
<Typography className="hero-title">
  Welcome to
</Typography>
<Box className="hero-brand-wrapper">

            <Typography className="hero-brand">
                TrashGo
            </Typography>

            <Box
                component="span"
                className="hero-brand-icon"
            >
                ♻️
            </Box>

  </Box>

        <Typography className="hero-subtitle">
            Smart Waste Collection Made Simple
        </Typography>

        <Box className="hero-divider-line" />

        <Typography className="hero-description">
            TrashGo is a smart waste management platform designed to connect
            citizens with waste collection services in a quick, convenient
            and eco-friendly manner. Easily schedule waste pickups,
            monitor collection history and contribute towards building
            cleaner and greener communities.
        </Typography>

        <Box className="hero-tags">

            {[
                "🌿 Eco",
                "⚡ Quick",
                "🛡 Reliable",
                "👥 Community",
            ].map((item)=>(
                <Box
                    key={item}
                    className="hero-tag"
                >
                    {item}
                </Box>
            ))}

        </Box>

</Box>
<Box className="hero-divider" />

           {/* RIGHT SIDE */}

<Box className="hero-right">

  {/* Top Card */}

  <Paper
    elevation={0}
    className="impact-card"
  >
    <Box className="impact-card-content">

      <Box className="impact-icon">
        🌿
      </Box>

      <Typography className="impact-title">
        Together We've
        <br />
        Created Impact
      </Typography>

    </Box>
  </Paper>

              {/* Statistics */}

<Box className="hero-stats-grid">

  {[
    {
      icon: (
        <LocalShippingRoundedIcon
          sx={{
            color: "#7df16b",
            fontSize: 34,
          }}
        />
      ),
      value: "1280+",
      label: "Pickups Completed",
      color: "#7dff67",
    },

    {
      icon: (
        <GroupsRoundedIcon
          sx={{
            color: "#ffd84d",
            fontSize: 34,
          }}
        />
      ),
      value: "860+",
      label: "Happy Users",
      color: "#ffd84d",
    },

    {
      icon: (
        <SpaRoundedIcon
          sx={{
            color: "#7df16b",
            fontSize: 34,
          }}
        />
      ),
      value: "2.4T",
      label: "Waste Collected",
      color: "#76ff69",
    },

    {
      icon: (
        <PublicRoundedIcon
          sx={{
            color: "#66d9ff",
            fontSize: 34,
          }}
        />
      ),
      value: "25+",
      label: "Areas Covered",
      color: "#59b8ff",
    },
  ].map((item) => (
    <Paper
      key={item.label}
      elevation={0}
      className="hero-stat-card"
    >
      <Typography className="hero-stat-icon-text">

        <Box className="hero-stat-icon-box">
          {item.icon}
        </Box>

      </Typography>

      <Typography className="hero-stat-value">
        {item.value}
      </Typography>

      <Typography
        className="hero-stat-label"
        style={{ color: item.color }}
      >
        {item.label}
      </Typography>
    </Paper>
  ))}

</Box>

</Box>

</Box>
</Paper>
</Box>

{/*-------------------------------------- action card---------------------------- */}
<Box className="dashboard-action-grid">

  {/* ---------------- BOOK PICKUP ---------------- */}
<Paper
  elevation={0}
  onClick={() => navigate("/book-pickup")}
  className="pickup-card"
>

  {/* Background Image */}
  <Box className="card-image">
    <img
      src="/images/pickup.png"
      alt="Book Pickup"
    />
  </Box>

  {/* Content */}
  <Box className="action-card-content">

    <Box className="action-card-header">

      <Typography className="action-card-tag">
        Smart Collection
      </Typography>

      <Delete
        sx={{
          fontSize: 34,
          color: "#6ee76a",
        }}
      />

    </Box>

    <Box className="action-card-body">

      <Typography
        variant="h5"
        fontWeight={700}
        mb={1}
      >
        Book Pickup
      </Typography>

      <Typography className="action-card-description">
        Schedule doorstep waste collection within seconds
        and contribute towards a cleaner environment.
      </Typography>

    </Box>

    <Box className="action-card-footer">

      <Box>

        <Typography className="action-card-caption">
          Average Time
        </Typography>

        <Typography fontWeight={700}>
          2–5 mins
        </Typography>

      </Box>

      <Button
        variant="contained"
        className="pickup-btn"
      >
        Book Now
      </Button>

    </Box>

  </Box>

</Paper>

  {/* ---------------- HISTORY ---------------- */}
<Paper
  elevation={0}
  onClick={() => navigate("/booking-history")}
  className="history-card"
>

  {/* Background Image */}
  <Box className="card-image">
    <img
      src="/images/history.png"
      alt="Booking History"
    />
  </Box>

  {/* Content */}
  <Box className="action-card-content">

    {/* Header */}
    <Box className="action-card-header">

      <Typography className="action-card-tag">
        Collection Records
      </Typography>

      <History
        sx={{
          fontSize: 34,
          color: "#60a5fa",
        }}
      />

    </Box>

    {/* Body */}
    <Box className="action-card-body">

      <Typography
        variant="h5"
        fontWeight={700}
        mb={1}
      >
        Booking History
      </Typography>

      <Typography className="action-card-description">
        Track completed pickups, monitor service history
        and stay updated on every request.
      </Typography>

    </Box>

    {/* Footer */}
    <Box className="action-card-footer">

      <Box>

        <Typography className="action-card-caption">
          Records
        </Typography>

        <Typography fontWeight={700}>
          View Anytime
        </Typography>

      </Box>

      <Button
        variant="contained"
        className="history-btn"
      >
        View History
      </Button>

    </Box>

  </Box>

</Paper>
  {/* ---------------- PROFILE ---------------- */}
<Paper
  elevation={0}
  onClick={() => navigate("/profile")}
  className="dashboard-profile-card"
>

  {/* Background Image */}
  <Box className="card-image">
    <img
      src="/images/profile.png"
      alt="Profile"
    />
  </Box>

  {/* Content */}
  <Box className="action-card-content">

    {/* Header */}
    <Box className="action-card-header">

      <Typography className="action-card-tag">
        Personal Account
      </Typography>

      <Person
        sx={{
          fontSize: 34,
          color: "#c084fc",
        }}
      />

    </Box>

    {/* Body */}
    <Box className="action-card-body">

      <Typography
        variant="h5"
        fontWeight={700}
        mb={1}
      >
        Profile
      </Typography>

      <Typography className="action-card-description">
        Manage your personal information,
        preferences and account settings securely.
      </Typography>

    </Box>

    {/* Footer */}
    <Box className="action-card-footer">

      <Box>

        <Typography className="action-card-caption">
          Account
        </Typography>

        <Typography fontWeight={700}>
          Personalized
        </Typography>

      </Box>

      <Button
        variant="contained"
        className="profile-btn"
      >
        Manage Profile
      </Button>

    </Box>

  </Box>

</Paper>
</Box>

</Box>
);

}

export default UserDashboard;