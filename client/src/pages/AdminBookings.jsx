import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Chip,
  Divider,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RecyclingIcon from "@mui/icons-material/Recycling";

import { getAdminBookings } from "../services/adminService";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import "./AdminBookings.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
const navigate = useNavigate();
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getAdminBookings();
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchSearch =
      booking.user?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.collector?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.pickupLocation?.address
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      status === "All"
        ? true
        : booking.bookingStatus === status;

    return matchSearch && matchStatus;
  });

  return (
    <Box className="admin-bookings-page">

      <Box className="admin-bookings-header">

        <Box className="logo-area">
          <RecyclingIcon className="logo-icon" />

          <Typography className="logo-text">
            TrashGo
          </Typography>
        </Box>

        <Box>

          <Typography className="page-title">
            All Bookings
          </Typography>

          <Typography className="page-subtitle">
            Monitor every booking created in the system.
          </Typography>

        </Box>

      </Box>
<Box
  className="back-btn-wrapper"
  onClick={() => navigate("/admin/dashboard")}
>

  <IconButton className="back-btn">
    <ArrowBackIosNewIcon />
  </IconButton>

  <Typography className="back-text">
    Back to Dashboard
  </Typography>

</Box>
      <Box className="filter-section">

        <TextField
          placeholder="Search by User, Collector or Location"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-box"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="status-filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Reached Pickup">
            Reached Pickup
          </MenuItem>
          <MenuItem value="Collected">
            Collected
          </MenuItem>
          <MenuItem value="Reached Dumping Area">
            Reached Dumping Area
          </MenuItem>
          <MenuItem value="Completed">
            Completed
          </MenuItem>
          <MenuItem value="Cancelled">
            Cancelled
          </MenuItem>
        </TextField>

      </Box>

      <Grid container spacing={3}>

        {filteredBookings.map((booking) => (

          <Grid item xs={12} md={6} key={booking._id}>

            <Paper className="booking-card">

              <Box className="booking-top">

                <Box>

                  <Typography className="booking-user">
                    <PersonIcon sx={{ mr: .5 }} />
                    {booking.user?.name}
                  </Typography>

                  <Typography className="booking-collector">
                    <LocalShippingIcon sx={{ mr: .5 }} />
                    {booking.collector?.name || "Not Assigned"}
                  </Typography>

                </Box>

                <Chip
                  label={booking.bookingStatus}
                  className={`status-chip ${booking.bookingStatus
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                />

              </Box>

              <Divider sx={{ my: 2 }} />

              <Box className="booking-info">

                <Typography>
                  <LocationOnIcon className="info-icon" />
                  <b>Pickup :</b>&nbsp;
                  {booking.pickupLocation?.address}
                </Typography>

                <Typography>
                  <LocationOnIcon className="info-icon" />
                  <b>Dumping :</b>&nbsp;
                  {booking.dumpingLocation?.address}
                </Typography>

                <Typography>
                  <DeleteSweepIcon className="info-icon" />
                  {booking.trashType}
                </Typography>

                <Typography>
                  <DirectionsBikeIcon className="info-icon" />
                  {booking.mode}
                </Typography>

                <Typography>
                  <ShoppingBagIcon className="info-icon" />
                  {booking.numberOfBags} Bags
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
                  icon={<AssignmentTurnedInIcon />}
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

      </Grid>

    </Box>
  );
}

export default AdminBookings;