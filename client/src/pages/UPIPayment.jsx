import {
  Box,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../services/bookingService";
import UserMenu from "../components/UserMenu";
import "./UPIPayment.css";
function UPIPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  const [paymentDone, setPaymentDone] =
    useState(false);

  const handlePaymentSuccess =
    async () => {
      try {
        await createBooking({
          ...bookingData,
          paymentStatus: "Paid",
        });

        setPaymentDone(true);
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data?.message ||
            "Failed to create booking"
        );
      }
    };

  if (paymentDone) {
  return (
    <Box className="payment-success-page">

      <Paper className="payment-success-card">

        <Typography
          variant="h2"
          className="payment-success-icon"
        >
          ✅
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          color="#166534"
        >
          Payment Successful
        </Typography>

        <Typography className="payment-success-text">
          Your pickup request has
          been successfully booked.
        </Typography>

        <Button
          variant="contained"
          className="payment-success-btn"
          onClick={() =>
            navigate("/booking-history")
          }
        >
          OK
        </Button>

      </Paper>

    </Box>
  );
}

 return (
  <Box className="upi-payment-page">

    <UserMenu />

    <Paper
      elevation={0}
      className="upi-payment-card"
    >

      <Typography
        variant="h3"
        fontWeight="bold"
        className="upi-payment-title"
      >
        💳 UPI Payment
      </Typography>

      <Typography className="upi-payment-subtitle">
        Scan the QR code and
        complete your payment
      </Typography>

       <Box className="upi-qr-box">

  <img
    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=TrashGo-UPI`}
    alt="UPI QR"
    className="upi-qr-image"
  />

</Box>

<Box className="upi-amount-box">

  <Typography
    variant="h5"
    fontWeight="bold"
    color="#166534"
  >
    Amount: ₹
    {bookingData?.fare}
  </Typography>

</Box>

<Button
  fullWidth
  size="large"
  onClick={handlePaymentSuccess}
  className="upi-payment-btn"
>
  ✅ Payment Successful
</Button>

<Typography className="upi-payment-note">
  After successful payment,
  your pickup request will be
  confirmed automatically.
</Typography>

</Paper>
</Box>
);
}

export default UPIPayment;