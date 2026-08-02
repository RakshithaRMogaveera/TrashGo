import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import {
  getAvailableBookings,
  acceptBooking,
} from "../services/collectorService";

import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import CollectorMenu from "../components/CollectorMenu";
import "./AvailableBookings.css";
import { useNavigate } from "react-router-dom";

function AvailableBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
const [successOpen, setSuccessOpen] =
  useState(false);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getAvailableBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };
const handleAccept = async (bookingId) => {
  try {
    await acceptBooking(bookingId);

    setSuccessOpen(true);
  } catch (error) {
    console.error(error);
  }
};

  return (
  <Box className="available-bookings-page">

    <CollectorMenu />

    {/* ================= HERO ================= */}
<Box className="available-hero">

  {/* LEFT */}

  <Box className="available-hero-left">

    <Typography className="available-heading">
      Available Bookings
    </Typography>

    <Typography className="available-subtitle">
      Accept nearby pickup requests and start earning by helping keep the city clean.
    </Typography>

  </Box>

  {/* RIGHT */}

  <Box className="available-hero-right">

    <Box className="summary-card">

      <Typography className="summary-value">
        Live
      </Typography>

      <Typography className="summary-label">
        Booking Status
      </Typography>

    </Box>

    <Box className="summary-card">

      <Typography className="summary-value">
        {bookings.length}
      </Typography>

      <Typography className="summary-label">
        Available Requests
      </Typography>

    </Box>

  </Box>

</Box>

    {/* ================= BOOKINGS ================= */}

    {bookings.length === 0 ? (

      <Box className="empty-bookings">

        <Typography className="empty-icon">
          📭
        </Typography>

        <Typography className="empty-title">
          No Bookings Available
        </Typography>

        <Typography className="empty-subtitle">
          New pickup requests will appear here automatically.
        </Typography>

      </Box>

    ) : (

      bookings.map((booking) => (

        <Card
          key={booking._id}
          className="booking-card"
        >

          <CardContent className="booking-content">

            <Box className="booking-grid">

              {/* LEFT COLUMN */}

              <Box className="left-section">

                <Box className="user-info">

                  <Box className="avatar-circle">
                    <PersonIcon className="avatar-icon" />
                  </Box>

                  <Box>

                    <Typography
                      variant="h6"
                      className="user-name"
                    >
                      {booking.user?.name}
                    </Typography>

                    <Typography className="user-phone">
                      {booking.user?.phoneNumber}
                    </Typography>

                  </Box>

                </Box>

                <Box className="location-block">

                  <Typography className="location-title pickup-title">
                    Pickup Location
                  </Typography>

                  <Box className="location-row">

                    <LocationOnIcon color="success" />

                    <Typography>
                      {booking.pickupLocation?.address}
                    </Typography>

                  </Box>

                </Box>

                <Box>

                  <Typography className="location-title dump-title">
                    Dumping Location
                  </Typography>

                  <Box className="location-row">

                    <DeleteIcon color="error" />

                    <Typography>
                      {booking.dumpingLocation?.address}
                    </Typography>

                  </Box>

                </Box>

              </Box>

              {/* CENTER COLUMN */}

              <Box className="middle-section">

                <Box className="info-box waste-box">
                  {booking.trashType}
                </Box>

                <Box className="info-box mode-box">
                  {booking.mode}
                </Box>

                <Box className="info-box bag-box">
                  {booking.numberOfBags} Bags
                </Box>

              </Box>

              {/* RIGHT COLUMN */}

              <Box className="right-section">

                <Typography className="fare">
                  ₹{booking.fare}
                </Typography>

                <Box className="status-chip">
                  {booking.bookingStatus}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  className="accept-btn"
                  onClick={() =>
                    handleAccept(booking._id)
                  }
                >
                  Accept Booking
                </Button>

              </Box>

            </Box>

          </CardContent>

        </Card>

      ))

    )}
<Dialog
  open={successOpen}
  PaperProps={{
    sx: {
      borderRadius: "28px",
      overflow: "hidden",
      width: 430,
      background:
        "linear-gradient(145deg,#ffffff,#f6fff8)",
      boxShadow:
        "0 30px 80px rgba(0,0,0,.22)",
    },
  }}
>

  <Box
    sx={{
      height: 8,
      background:
        "linear-gradient(90deg,#17b26a,#47d16c)",
    }}
  />

  <DialogContent
    sx={{
      p: 5,
      textAlign: "center",
    }}
  >

    <Box
      sx={{
        width: 95,
        height: 95,
        mx: "auto",
        mb: 3,
        borderRadius: "50%",
        background:
          "linear-gradient(135deg,#18c37e,#4cd964)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          "0 12px 35px rgba(24,195,126,.35)",
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontSize: "3rem",
        }}
      >
        ✓
      </Typography>
    </Box>

    <Typography
      sx={{
        fontSize: "1.8rem",
        fontWeight: 700,
        color: "#1d2939",
      }}
    >
      Booking Accepted!
    </Typography>

    <Typography
      sx={{
        mt: 1.5,
        color: "#667085",
        lineHeight: 1.7,
        fontSize: "1rem",
      }}
    >
      Great! This booking has been assigned to you.
      You can now manage its progress from
      <b> My Bookings</b>.
    </Typography>

  </DialogContent>

  <DialogActions
    sx={{
      pb: 4,
      px: 4,
      justifyContent: "center",
    }}
  >

    <Button
      onClick={() => {
        setSuccessOpen(false);
        navigate("/collector/my-bookings");
      }}
      variant="contained"
      sx={{
        px: 6,
        py: 1.4,
        borderRadius: "999px",
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: 700,
        background:
          "linear-gradient(90deg,#0e8f4b,#20c05c)",
        boxShadow:
          "0 12px 28px rgba(32,192,92,.35)",
        transition: ".25s",

        "&:hover": {
          transform: "translateY(-2px)",
          background:
            "linear-gradient(90deg,#0b7e42,#18b256)",
        },
      }}
    >
      Go to My Bookings →
    </Button>

  </DialogActions>

</Dialog>

  </Box>
);
}

export default AvailableBookings;