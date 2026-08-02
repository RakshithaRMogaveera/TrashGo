import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Rating,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  IconButton,
  Select,
  FormControl,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import { useEffect, useState } from "react";
import {
  getUserBookings,
  cancelBooking,
  submitRating,
} from "../services/bookingService";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FilterListIcon from "@mui/icons-material/FilterList";
import { updatePaymentStatus } from "../services/bookingService";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import "./BookingHistory.css";
import {
  Menu,
  Badge,
} from "@mui/material";

const InfoItem = ({ icon, title, value, color = "#16a34a" }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.2,
      mb: 1,
    }}
  >
    <Avatar
      sx={{
        bgcolor: `${color}15`,
        color,
        width: 34,
        height: 34,

        "& svg": {
          fontSize: 20,
        },
      }}
    >
      {icon}
    </Avatar>

    <Box>
      <Typography
        sx={{
          fontSize: 12,
          color: "#6b7280",
          lineHeight: 1.1,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "0.98rem",
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);
function BookingHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All Bookings");
  
  const [selectedRating, setSelectedRating] = useState({});
  const [reviewText, setReviewText] = useState({});
  const [notificationAnchor, setNotificationAnchor] =
  useState(null);
const [profileAnchor, setProfileAnchor] = useState(null);
const acceptedBookings = bookings.filter(
  (booking) => booking.bookingStatus === "Accepted"
);
  const [cancelSuccess, setCancelSuccess] =
    useState(false);
  const bookingSteps = [
    "Pending",
    "Accepted",
    "Reached Pickup",
    "Collected",
    "Reached Dumping Area",
    "Completed",
  ];
  useEffect(() => {
    fetchBookings();
  }, []);
  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to load bookings");
    }
  };
  const handleSubmitRating = async (bookingId) => {
    try {
      await submitRating(
        bookingId,
        selectedRating[bookingId],
        reviewText[bookingId],
      );
      alert("Rating submitted successfully");
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit rating");
    }
  };
  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setCancelSuccess(true);
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to cancel booking");
    }
  };
  const handlePayment = async (bookingId) => {
    try {
      await updatePaymentStatus(bookingId);
      alert("Payment marked as successful");
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };
 if (cancelSuccess) {
  return (
    <Box className="booking-history-cancel-page">
      <Paper className="booking-history-cancel-card">

        <Typography
          variant="h1"
          mb={2}
        >
          ✅
        </Typography>

        <Typography className="booking-history-cancel-title">
          Booking Cancelled
        </Typography>

        <Typography className="booking-history-cancel-text">
          Your booking has been
          cancelled successfully.
        </Typography>

        <Button
          variant="contained"
          className="booking-history-cancel-btn"
          onClick={() =>
            setCancelSuccess(false)
          }
        >
          OK
        </Button>

      </Paper>
    </Box>
  );
}

const filteredBookings =
  filter === "All Bookings"
    ? bookings
    : bookings.filter(
        (booking) =>
          booking.bookingStatus === filter
      );

return (
  <Box className="booking-history-page">

    <UserMenu />

    <Box className="booking-history-content">

      <Box className="booking-history-header">

        <Box>

          <Typography className="booking-history-title">
            Booking History
          </Typography>

          <Typography className="booking-history-subtitle">
            Track your waste pickup requests and their status
          </Typography>

        </Box>


         <Box className="booking-history-actions">

  <FormControl
    size="small"
    className="booking-history-filter"
  >
    <Select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <FilterListIcon />
        </InputAdornment>
      }
      MenuProps={{
        PaperProps: {
          sx: {
            width: {
              xs: 120,
              sm: 160,
              md: 180,
            },
            maxWidth: "90vw",
          },
        },
      }}
      className="booking-history-select"
    >
      <MenuItem value="All Bookings">
        All Bookings
      </MenuItem>

      <MenuItem value="Pending">
        Pending
      </MenuItem>

      <MenuItem value="Completed">
        Completed
      </MenuItem>

      <MenuItem value="Cancelled">
        Cancelled
      </MenuItem>
    </Select>
  </FormControl>

  <IconButton
    onClick={(e) =>
      setNotificationAnchor(e.currentTarget)
    }
    className="booking-history-notification-btn"
  >
    <Badge
      badgeContent={acceptedBookings.length}
      color="error"
    >
      <NotificationsNoneIcon />
    </Badge>
  </IconButton>

  <Avatar
    src="/images/user.jpg"
    onClick={(e) =>
      setProfileAnchor(e.currentTarget)
    }
    className="booking-history-avatar"
  />

</Box>

</Box>

<Menu
  anchorEl={notificationAnchor}
  open={Boolean(notificationAnchor)}
  onClose={() => setNotificationAnchor(null)}
  PaperProps={{
    className: "booking-history-notification-menu",
  }}
>
  {acceptedBookings.length === 0 ? (
    <MenuItem>
      No new notifications
    </MenuItem>
  ) : (
    acceptedBookings.map((booking) => (
      <MenuItem
        key={booking._id}
        onClick={() =>
          setNotificationAnchor(null)
        }
      >
        <Box>
          <Typography fontWeight={600}>
            Booking Accepted
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Your booking #
            {booking._id.slice(-5)} has been accepted by a collector.
          </Typography>
        </Box>
      </MenuItem>
    ))
  )}
</Menu>

<Menu
  anchorEl={profileAnchor}
  open={Boolean(profileAnchor)}
  onClose={() => setProfileAnchor(null)}
  PaperProps={{
    className: "booking-history-profile-menu",
  }}
>
  <MenuItem
    onClick={() => {
      setProfileAnchor(null);
      navigate("/profile");
    }}
  >
    View Your Profile
  </MenuItem>
</Menu>

{bookings.length === 0 ? (

  <Paper className="booking-history-empty-card">
    <Typography variant="h6">
      No bookings found
    </Typography>
  </Paper>

) : (

  filteredBookings.map((booking) => (
    <Paper
      key={booking._id}
      elevation={0}
      className="booking-history-card"
    >

            <Box className="booking-history-card-header">

  <Box className="booking-history-card-left">

    <Chip
      label={`#TG${booking._id.slice(-5)}`}
      className="booking-history-id-chip"
    />

    <Typography color="text.secondary">
      📅{" "}
      {new Date(booking.createdAt).toLocaleString()}
    </Typography>

  </Box>

 <Chip
  label={
    booking.bookingStatus === "Cancelled"
      ? booking.cancelledBy === "Collector"
        ? "Cancelled by Collector"
        : "Cancelled"
      : booking.bookingStatus
  }
  color={
    booking.bookingStatus === "Completed"
      ? "success"
      : booking.bookingStatus === "Pending"
      ? "warning"
      : booking.bookingStatus === "Cancelled"
      ? "error"
      : "info"
  }
  className="booking-history-status-chip"
/>

</Box>

<Box className="booking-history-info-grid">

  <Box className="booking-history-info-column">

    <InfoItem
      icon={<LocationOnIcon />}
      title="Pickup Location"
      value={booking.pickupLocation.address}
      color="#22c55e"
    />

    <InfoItem
      icon={<DeleteSweepIcon />}
      title="Dumping Location"
      value={booking.dumpingLocation.address}
      color="#a855f7"
    />

  </Box>

<Box className="booking-history-info-column">

  <InfoItem
    icon={<RecyclingIcon />}
    title="Waste Type"
    value={booking.trashType}
    color="#22c55e"
  />

  <InfoItem
    icon={<LocalShippingIcon />}
    title="Mode"
    value={booking.mode}
    color="#3b82f6"
  />

  <InfoItem
    icon={<Inventory2Icon />}
    title="No. of Bags"
    value={booking.numberOfBags}
    color="#84cc16"
  />

</Box>

<Box className="booking-history-info-column">

  <InfoItem
    icon={<CurrencyRupeeIcon />}
    title="Amount"
    value={`₹${booking.fare}`}
    color="#16a34a"
  />

  <InfoItem
    icon={<CreditCardIcon />}
    title="Payment Method"
    value={booking.paymentMethod}
    color="#22c55e"
  />

  <InfoItem
    icon={<CheckCircleIcon />}
    title="Payment Status"
    value={booking.paymentStatus}
    color={
      booking.paymentStatus === "Paid"
        ? "#22c55e"
        : "#f59e0b"
    }
  />

</Box>

</Box>

{/*----------------collector section------------------- */}

{booking.collector && (
  <Box className="booking-history-collector">

    {/* LEFT */}

    <Box className="booking-history-collector-left">

      <Avatar className="booking-history-collector-avatar">
        {booking.collector.name.charAt(0)}
      </Avatar>
<Box>

  <Typography className="booking-history-collector-name">
    {booking.collector.name}
  </Typography>

  <Typography className="booking-history-collector-role">
    Assigned Collector
  </Typography>

</Box>

</Box>

{/* RIGHT */}
<Box className="booking-history-collector-right">

  <Box className="booking-history-collector-item">

    <Typography className="booking-history-collector-label">
      Vehicle
    </Typography>

    <Typography className="booking-history-collector-value">

      {booking.collector.vehicleType === "Bike" ? (
        <>
          <TwoWheelerIcon
            sx={{
              fontSize: 18,
              color: "#2563eb",
              mr: 0.5,
            }}
          />
          Bike
        </>
      ) : booking.collector.vehicleType === "Auto" ? (
        <>
          <LocalShippingIcon
            sx={{
              fontSize: 18,
              color: "#16a34a",
              mr: 0.5,
            }}
          />
          Auto
        </>
      ) : (
        booking.collector.vehicleType
      )}

    </Typography>

  </Box>

  <Box className="booking-history-collector-item">

    <Typography className="booking-history-collector-label">
      Phone
    </Typography>

    <Typography className="booking-history-collector-value">
      📞 {booking.collector.phoneNumber}
    </Typography>

  </Box>

</Box>

</Box>
)}

<Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mb={1}
>
  <Typography
    variant="h6"
    fontWeight="bold"
  >
    Booking Status
  </Typography>


            </Box>

{booking.bookingStatus !== "Cancelled" && (
  <Box className="booking-history-stepper">

    <Stepper
      activeStep={bookingSteps.indexOf(
        booking.bookingStatus
      )}
      alternativeLabel
      className="booking-history-stepper-content"
    >
      {bookingSteps.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>

  </Box>
)}

{booking.bookingStatus === "Pending" && (
  <Button
    variant="outlined"
    color="error"
    onClick={() =>
      handleCancelBooking(
        booking._id
      )
    }
    className="booking-history-cancel-btn-outline"
  >
    Cancel Booking
  </Button>
)}

{booking.bookingStatus === "Completed" &&
  !booking.rating && (
    <Box className="booking-history-rating-section">

      <Typography
        variant="h6"
        mb={2}
      >
        ⭐ Rate Your Experience
      </Typography>

      <Rating
        value={
          selectedRating[
            booking._id
          ] || 0
        }
        onChange={(
          event,
          newValue
        ) =>
          setSelectedRating({
            ...selectedRating,
            [booking._id]:
              newValue,
          })
        }
      />

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Share your feedback"
        className="booking-history-feedback"
        value={
          reviewText[
            booking._id
          ] || ""
        }
        onChange={(e) =>
          setReviewText({
            ...reviewText,
            [booking._id]:
              e.target.value,
          })
        }
      />
                   <Button
  variant="contained"
  className="booking-history-submit-review-btn"
  onClick={() =>
    handleSubmitRating(
      booking._id
    )
  }
>
  Submit Review
</Button>

</Box>
)}

{booking.rating && (
  <Typography className="booking-history-user-rating">
    ⭐ Your Rating: {booking.rating}/5
  </Typography>
)}

</Paper>
))
)}
</Box>
</Box>
);
}

export default BookingHistory;