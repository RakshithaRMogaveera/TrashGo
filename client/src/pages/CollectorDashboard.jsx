import { useEffect, useState } from "react";

import {
  getCollectorStats,
  getAvailableBookings,
} from "../services/collectorService";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import CollectorMenu from "../components/CollectorMenu";
import "./CollectorDashboard.css";
import {
  CurrencyRupee,
  Star,
  CheckCircle,
  LocalShipping,
} from "@mui/icons-material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

{/*--------functions---------*/}
function CollectorDashboard() {
  

  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalCompleted: 0,
    averageRating: 0,
  });
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  
  useEffect(() => {
    const token =
      localStorage.getItem(
        "collectorToken"
      );

    if (!token) {
      navigate(
        "/collector/login"
      );
    }
  }, [navigate]);

useEffect(() => {
  fetchStats();
  fetchBookings();
}, []);

  const fetchStats = async () => {
    try {
      const data =
        await getCollectorStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBookings = async () => {
  try {
    const data =
      await getAvailableBookings();

    setBookings(data);
  } catch (error) {
    console.error(error);
  }
};

//--------return function---------
return (
  <Box className="collector-dashboard-page">

    <CollectorMenu />

    <Box className="collector-dashboard-container">

      {/* LEFT SECTION */}

      <Box className="collector-dashboard-hero">
   <Box className="collector-dashboard-hero-content">

  {/* Logo */}

  <Typography className="collector-dashboard-logo">

    <Box
      component="span"
      className="collector-dashboard-logo-icon"
    >
      ♻️
    </Box>

    TrashGo

  </Typography>
  {/* Welcome */}

<Typography className="collector-dashboard-welcome">
  WELCOME,
</Typography>

<Typography className="collector-dashboard-name">
  SUPERHERO!
</Typography>

{/* Description */}

<Typography className="collector-dashboard-description">
  TrashGo empowers collectors to keep our communities clean through smart and efficient waste management.
  <br />
  <br />
  You're the driving force behind a cleaner tomorrow.
  <br />
  With TrashGo, manage assigned pickups, track completed collections, monitor your earnings, and help build healthier, greener communities.<br/> — one successful pickup at a time.
</Typography>

   {/* Button */}

<Button

  variant="contained"
  onClick={() =>
    navigate("/collector/available-bookings")
  }
  className="collector-dashboard-button"
>
  View Available Bookings
  <ArrowForwardRoundedIcon
    className="collector-dashboard-button-icon"
  />
</Button>

</Box>
</Box>

{/* RIGHT SECTION */}

<Box className="collector-dashboard-stat">

  {/*--------- Earnings Card ---------*/}

  <Card className="collector-dashboard-cards">

    <CardContent className="collector-dashboard-cards-content">
  <Box className="collector-inner-card">
      <CurrencyRupee
        className="collector-dashboard-icons earning-icon"
      />

      <Typography className="collector-dashboard-cards-label">
        Total Earnings
      </Typography>

      <Typography className="collector-dashboard-cards-value">
        ₹{stats.totalEarnings}
      </Typography>

      <Typography className="collector-dashboard-cards-subtitle earning-text">
        Collector Revenue
      </Typography>
</Box>
    </CardContent>

  </Card>

  {/*--------- Completed Pickups ---------*/}

  <Card className="collector-dashboard-cards">

  <CardContent className="collector-dashboard-cards-content">
<Box className="collector-inner-card">
  <CheckCircle
    className="collector-dashboard-icons completed-icons"
  />

  <Typography className="collector-dashboard-cards-label">
    Completed Pickups
  </Typography>

  <Typography className="collector-dashboard-cards-value">
    {stats.totalCompleted}
  </Typography>

  <Typography className="collector-dashboard-cards-subtitle completed-texts">
    Successfully Delivered
  </Typography>
</Box>
</CardContent>

</Card>

{/*--------- Average Rating ---------*/}

<Card className="collector-dashboard-cards">

  <CardContent className="collector-dashboard-cards-content">
<Box className="collector-inner-card">
    <Star
      className="collector-dashboard-icons ratings-icon"
    />

    <Typography className="collector-dashboard-cards-label">
      Average Rating
    </Typography>

    <Typography className="collector-dashboard-cards-value">
      {stats.averageRating}
    </Typography>

    <Typography className="collector-dashboard-cards-subtitle ratings-text">
      Excellent Service
    </Typography>
</Box>
  </CardContent>

</Card>

</Box>
</Box>
</Box>

);
}

export default CollectorDashboard;