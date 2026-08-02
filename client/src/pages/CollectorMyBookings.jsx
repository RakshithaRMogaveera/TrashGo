import {
  Box,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./CollectorMyBookings.css";
import {
  getCollectorBookings,
  updateBookingStatus,
  unassignBooking,
} from "../services/collectorService";
import CollectorMenu from "../components/CollectorMenu";
import {
  markCashCollected,
} from "../services/collectorService";

function CollectorMyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getCollectorBookings();
      setBookings(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (
    bookingId,
    status
  ) => {
    try {
      await updateBookingStatus(
        bookingId,
        status
      );

      fetchBookings();

      alert(
        `Booking marked as ${status}`
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

const handleUnassignBooking = async (
  bookingId
) => {
  try {
    await unassignBooking(
      bookingId
    );

    alert(
      "Booking unassigned successfully"
    );

    fetchBookings();
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        "Failed to unassign booking"
    );
  }
};
const handleCashCollected =
  async (bookingId) => {
    try {
      await markCashCollected(
        bookingId
      );

      fetchBookings();

      alert(
        "Cash marked as collected"
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <Box className="collector-bookings-page">

    <CollectorMenu />

    {/*================ HERO ================*/}

    <Box className="collector-bookings-hero">

      <Box>

        <Typography className="collector-bookings-heading">
          My Bookings
        </Typography>

        <Typography className="collector-bookings-subtitle">
          Manage your assigned pickups, update progress and complete deliveries.
        </Typography>

      </Box>

      <Box className="collector-bookings-count">

        <Typography className="booking-count-number">
          {bookings.length}
        </Typography>

        <Typography className="booking-count-label">
          Active Bookings
        </Typography>

      </Box>

    </Box>

    {bookings.length === 0 ? (

      <Box className="collector-empty-state">

        <Typography className="collector-empty-icon">
          📭
        </Typography>

        <Typography className="collector-empty-title">
          No Active Bookings
        </Typography>

        <Typography className="collector-empty-subtitle">
          Accept bookings from the Available Bookings page.
        </Typography>

      </Box>

    ) : (

      bookings.map((booking) => (

        <Box
          key={booking._id}
          className="collector-booking-card"
        >

          {/* Left */}

          <Box className="collector-booking-left">

            <Typography className="booking-user-name">
              👤 {booking.user?.name}
            </Typography>

            <Typography className="booking-phone">
              📞 {booking.user?.phoneNumber}
            </Typography>

            <Typography className="booking-location pickup">
              📍 Pickup:
              {" "}
              {booking.pickupLocation?.address}
            </Typography>

            <Typography className="booking-location dump">
              🗑 Dumping:
              {" "}
              {booking.dumpingLocation?.address}
            </Typography>

          </Box>

          {/* Center */}

          <Box className="collector-booking-middle">

            <Chip
              label={booking.trashType}
              className="trash-chip"
            />

            <Chip
              label={booking.mode}
              className="mode-chip"
            />

            <Chip
              label={`${booking.numberOfBags} Bags`}
              className="bag-chip"
            />

          </Box>

          {/* Right */}

          <Box className="collector-booking-right">

            <Typography className="booking-fare">
              ₹{booking.fare}
            </Typography>

            <Chip
              label={booking.bookingStatus}
              color={
                booking.bookingStatus === "Completed"
                  ? "success"
                  : "primary"
              }
            />

            <Box className="collector-booking-actions">

              {booking.bookingStatus ===
              "Completed" ? (

                <Chip
                  label="Completed"
                  color="success"
                />

              ) : (

                <>

                  {booking.bookingStatus ===
                    "Accepted" && (

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        handleUnassignBooking(
                          booking._id
                        )
                      }
                    >
                      Unassign
                    </Button>

                  )}

                  <Button
                    variant="contained"
                    onClick={() =>
                      handleStatusUpdate(
                        booking._id,
                        booking.bookingStatus ===
                          "Accepted"
                          ? "Reached Pickup"
                          : booking.bookingStatus ===
                            "Reached Pickup"
                          ? "Collected"
                          : booking.bookingStatus ===
                            "Collected"
                          ? "Reached Dumping Area"
                          : "Completed"
                      )
                    }
                  >

                    {booking.bookingStatus ===
                    "Accepted"
                      ? "Reached Pickup"
                      : booking.bookingStatus ===
                        "Reached Pickup"
                      ? "Collected"
                      : booking.bookingStatus ===
                        "Collected"
                      ? "Reached Dumping Area"
                      : "Mark Completed"}

                  </Button>

                </>

              )}

            </Box>

            {booking.paymentMethod ===
              "Cash" &&
              booking.paymentStatus ===
                "Pending" && (

              <Button
                variant="contained"
                color="success"
                className="collector-cash-btn"
                onClick={() =>
                  handleCashCollected(
                    booking._id
                  )
                }
              >
                Cash Collected
              </Button>

            )}

          </Box>

        </Box>

      ))

    )}

  </Box>
);

}

export default CollectorMyBookings;