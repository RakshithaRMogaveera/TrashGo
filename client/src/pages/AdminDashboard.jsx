import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
} from "@mui/material";

import RecyclingIcon from "@mui/icons-material/Recycling";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  getAdminBookings,
  getAllCollectors,
  approveCollector,
} from "../services/adminService";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] =useState({
    totalBookings: 0,
    totalCollectors: 0,
    completedBookings: 0,
    totalRevenue: 0,
  });
const navigate = useNavigate();
  const [bookings, setBookings] =
    useState([]);

  const [collectors, setCollectors] =
    useState([]);

  useEffect(() => {
    fetchStats();
    fetchBookings();
    fetchCollectors();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats"
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const data =
        await getAdminBookings();

      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCollectors = async () => {
    try {
      const data =
        await getAllCollectors();

      setCollectors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (
    collectorId
  ) => {
    try {
      await approveCollector(
        collectorId
      );

      alert(
        "Collector approved successfully"
      );

      fetchCollectors();
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <Box className="admin-dashboard">

  <Box className="admin-header">

    <Box className="logo-area">
      <RecyclingIcon className="logo-icon" />

      <Typography className="logo-text">
        TrashGo
      </Typography>
    </Box>

    <Box>
      <Typography className="admin-title">
        <DashboardIcon
          sx={{
            verticalAlign: "middle",
            mr: 1,
          }}
        />
        Admin Dashboard
      </Typography>

      <Typography className="admin-subtitle">
        Manage bookings, collectors and monitor
        system performance.
      </Typography>
    </Box>

  </Box>

<Grid
  container
  spacing={3}
  className="stats-grid"
>
  <Grid item xs={12} sm={6} lg={3}>
    <Card className="stat-card bookings-card">
      <CardContent>
        <Box className="stat-top">
          <Box className="stat-icon bookings-icon">
            <Inventory2Icon />
          </Box>
        </Box>

        <Typography className="stat-number">
          {stats.totalBookings}
        </Typography>

        <Typography className="stat-label">
          Total Bookings
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} sm={6} lg={3}>
    <Card className="stat-card collectors-card">
      <CardContent>
        <Box className="stat-top">
          <Box className="stat-icon collectors-icon">
            <LocalShippingIcon />
          </Box>
        </Box>

        <Typography className="stat-number">
          {stats.totalCollectors}
        </Typography>

        <Typography className="stat-label">
          Total Collectors
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} sm={6} lg={3}>
    <Card className="stat-card completed-card">
      <CardContent>
        <Box className="stat-top">
          <Box className="stat-icon completed-icon">
            <TaskAltIcon />
          </Box>
        </Box>

        <Typography className="stat-number">
          {stats.completedBookings}
        </Typography>

       <Typography className="stat-label">
  Completed Pickups
</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} sm={6} lg={3}>
    <Card className="stat-card revenue-card">
      <CardContent>
        <Box className="stat-top">
          <Box className="stat-icon revenue-icon">
            <CurrencyRupeeIcon />
          </Box>
        </Box>

        <Typography className="stat-number">
          ₹{stats.totalRevenue}
        </Typography>

        <Typography className="stat-label">
          Total Revenue
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>

<Box className="dashboard-content">



  {/* LEFT SIDE */}

   <Box className="dashboard-left">

      <Box className="section-header">

        <Typography
          variant="h5"
          className="section-title"
        >
          <Inventory2Icon sx={{ mr: 1 }} />
          Recent Bookings
        </Typography>

        <Button
          className="view-all-btn"
          onClick={() =>
            navigate("/admin/bookings")
          }
        >
          View All →
        </Button>

      </Box>

      <Box className="booking-scroll">



        {bookings
          .slice(0, 3)
          .map((booking) => (

            <Grid
              item
              xs={12}
              key={booking._id}
            >

              <Paper className="booking-card">

                <Box className="booking-top">

                  <Box>

                    <Typography className="booking-user">
                      <PersonIcon
                        sx={{
                          fontSize: 18,
                          mr: .5,
                        }}
                      />
                      {booking.user?.name}
                    </Typography>

                    <Typography className="booking-collector">
                      <LocalShippingIcon
                        sx={{
                          fontSize: 17,
                          mr: .5,
                        }}
                      />
                      {booking.collector?.name ||
                        "Not Assigned"}
                    </Typography>

                  </Box>

                  <Chip
                    label={booking.bookingStatus}
                    className={`status-chip ${booking.bookingStatus
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  />

                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box className="booking-info">

                  <Typography>
                    <LocationOnIcon className="info-icon" />
                    {booking.pickupLocation?.address}
                  </Typography>

                  <Typography>
                    <DeleteSweepIcon className="info-icon" />
                    {booking.trashType}
                  </Typography>

                  <Typography>
                    <CurrencyRupeeIcon className="info-icon" />
                    ₹{booking.fare}
                  </Typography>

                  <Typography>
                    <PaymentsIcon className="info-icon" />
                    {booking.paymentMethod}
                  </Typography>

                </Box>

                <Box className="payment-row">

                  <Chip
                    label={booking.paymentStatus}
                    color={
                      booking.paymentStatus === "Paid"
                        ? "success"
                        : "warning"
                    }
                  />

                </Box>

              </Paper>

            </Grid>

          ))}

     
      </Box>

    </Box>

    {/* ========= COLLECTORS ========= */}

    <Box className="dashboard-right">

      <Box className="section-header">

        <Typography
          variant="h5"
          className="section-title"
        >
          <LocalShippingIcon sx={{ mr: 1 }} />
          Recent Collectors
        </Typography>

        <Button
          className="view-all-btn"
          onClick={() =>
            navigate("/admin/collectors")
          }
        >
          View All →
        </Button>

      </Box>

      <Box className="booking-scroll">



        {collectors
          .slice(0, 3)
          .map((collector) => (

            <Grid
              item
              xs={12}
              key={collector._id}
            >

              <Paper className="collector-card">

                <Box className="collector-profile">

                  <Box className="collector-avatar">
                    <PersonIcon />
                  </Box>

                  <Box>

                    <Typography className="collector-name">
                      {collector.name}
                    </Typography>

                    <Typography className="collector-phone">
                      <PhoneIcon
                        sx={{
                          fontSize: 16,
                          mr: .5,
                        }}
                      />
                      {collector.phoneNumber}
                    </Typography>

                  </Box>

                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Typography className="collector-detail">
                  <LocalShippingIcon className="info-icon" />
                  Vehicle : {collector.vehicleType}
                </Typography>

                <Box className="collector-footer">

                  {collector.isApproved ? (

                    <Chip
                      label="Approved"
                      color="success"
                    />

                  ) : (

                    <>
                      <Chip
                        label="Pending"
                        color="warning"
                      />

                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          handleApprove(
                            collector._id
                          )
                        }
                      >
                        Approve
                      </Button>
                    </>

                  )}

                </Box>

              </Paper>

            </Grid>

          ))}

      
</Box>
    </Box>

  </Box>

</Box>

);
}

export default AdminDashboard;