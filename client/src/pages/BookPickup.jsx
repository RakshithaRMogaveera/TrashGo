import { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { createBooking } from "../services/bookingService";
import { karnatakaLocations } from "../data/karnatakaLocations";
import { useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import "./BookPickup.css";

function BookPickup() {
 const [district, setDistrict] =
  useState("");

const [taluk, setTaluk] =
  useState("");

const [pickupLocation, setPickupLocation] =
  useState("");

const [dumpingLocation, setDumpingLocation] =
  useState("");

  const [trashType, setTrashType] =
    useState("");

  const [bookingSuccess, setBookingSuccess] =
    useState(false);

  const [mode, setMode] = useState("");
  const navigate = useNavigate();
  const [numberOfBags, setNumberOfBags] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [estimatedFare, setEstimatedFare] =
    useState(0);

  const calculateFare = (
    selectedTrashType,
    selectedMode,
    bags
  ) => {
    const bagCount = Number(bags) || 0;

    let pricePerBag = 0;

   if (selectedTrashType === "Regular Waste") {
  if (selectedMode === "Bike") {
    pricePerBag = 40;
  } else if (selectedMode === "Auto") {
    pricePerBag = 60; // Change if you want a different fare
  }
}
     else if (
      selectedTrashType ===
      "Electronic Waste"
    ) {
      pricePerBag = 100;
    } else if (
      selectedTrashType ===
      "Furniture Waste"
    ) {
      pricePerBag = 100;
    } else if (
      selectedTrashType ===
      "Construction Waste"
    ) {
      pricePerBag = 100;
    }

    const fare =
      pricePerBag * bagCount;

    setEstimatedFare(fare);
  };
  const handleUPIPayment = () => {
    navigate("/upi-payment", {
      state: {
       pickupLocation: {
  address: `${pickupLocation}, ${taluk}, ${district}`,
  latitude: 0,
  longitude: 0,
},

taluk,

dumpingLocation: {
  address: dumpingLocation,
  latitude: 0,
  longitude: 0,
},

        trashType,
        mode,
        numberOfBags,
        paymentMethod,
        fare: estimatedFare,
      },
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const data = await createBooking({
      pickupLocation: {
  address: `${pickupLocation}, ${taluk}, ${district}`,
  latitude: 0,
  longitude: 0,
},

taluk,

dumpingLocation: {
  address: dumpingLocation,
  latitude: 0,
  longitude: 0,
},

        trashType,
        mode,
        numberOfBags,
        paymentMethod,
      });

      console.log(data);

      setBookingSuccess(true);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Booking failed"
      );
    }
  };
  if (bookingSuccess) {
  return (
    <Box className="booking-success-page">

      <Paper className="booking-success-card">

        <Typography
          variant="h2"
          className="booking-success-icon"
        >
          🎉
        </Typography>

        <Typography
          variant="h4"
          className="booking-success-title"
        >
          Booking Confirmed
        </Typography>

        <Typography className="booking-success-text">
          Your waste pickup request has been successfully created.
        </Typography>


          <Button
  variant="contained"
  onClick={() =>
    navigate("/booking-history")
  }
  className="booking-history-btn"
>
  View Booking History
</Button>

</Paper>
</Box>
);
}

return (
  <Box className="book-pickup-page">

    <UserMenu />

    <Container
      maxWidth="sm"
      className="book-pickup-container"
    >

      <Paper
        elevation={0}
        className="book-pickup-card"
      >
        <span className="border-light top"></span>
  <span className="border-light right"></span>
  <span className="border-light bottom"></span>
  <span className="border-light left"></span>

         <Box className="book-pickup-header">

  <Box className="book-pickup-logo">
    ♻️
  </Box>

  <Typography className="book-pickup-title">
    Book Pickup
  </Typography>

  <Typography className="book-pickup-subtitle">
    Fill in the details to schedule your pickup
  </Typography>

</Box>

<Box
  component="form"
  onSubmit={handleBooking}
  className="book-pickup-form"
>
  <TextField
  select
  required
  fullWidth
  label="District"
  value={district}
  onChange={(e) => {
    setDistrict(e.target.value);
    setTaluk("");
    setDumpingLocation("");
  }}
>
  {Object.keys(karnatakaLocations).map((district) => (
    <MenuItem key={district} value={district}>
      {district}
    </MenuItem>
  ))}
</TextField>

<TextField
  select
  required
  fullWidth
  label="Taluk"
  value={taluk}
  disabled={!district}
  onChange={(e) => {
    const selectedTaluk = e.target.value;

    setTaluk(selectedTaluk);

    setDumpingLocation(
      `${selectedTaluk} Municipal Solid Waste Processing Centre`
    );
  }}
>
  {(karnatakaLocations[district] || []).map((taluk) => (
    <MenuItem key={taluk} value={taluk}>
      {taluk}
    </MenuItem>
  ))}
</TextField>

<TextField
  label="Detailed Pickup Address"
  value={pickupLocation}
  onChange={(e) =>
    setPickupLocation(e.target.value)
  }
  fullWidth
  required
  placeholder="Example: Near Bus Stand, Ward 3"
/>

<TextField
  label="Dumping Location"
  value={dumpingLocation}
  fullWidth
  InputProps={{
    readOnly: true,
  }}
/>

<TextField
  select
  label="Trash Type"
  value={trashType}
  onChange={(e) => {
    setTrashType(e.target.value);
    setMode("");
    setEstimatedFare(0);
  }}
  fullWidth
  required
>
  <MenuItem value="Regular Waste">
    Regular Waste
  </MenuItem>

  <MenuItem value="Electronic Waste">
    Electronic Waste
  </MenuItem>

  <MenuItem value="Furniture Waste">
    Furniture Waste
  </MenuItem>

  <MenuItem value="Construction Waste">
    Construction Waste
  </MenuItem>
</TextField>

           <TextField
  select
  label="Mode"
  value={mode}
 onChange={(e) => {
  console.log(e.target.value);
  setMode(e.target.value);

  calculateFare(
    trashType,
    e.target.value,
    numberOfBags
  );
}}
  fullWidth
  required
>
 {trashType === "Regular Waste"
  ? [
      <MenuItem key="bike" value="Bike">
        Bike
      </MenuItem>,
      <MenuItem key="auto" value="Auto">
        Auto
      </MenuItem>,
    ]
  : trashType && (
      <MenuItem key="auto" value="Auto">
        Auto
      </MenuItem>
    )}
</TextField>

<TextField
  label="Number of Bags"
  type="number"
  value={numberOfBags}
  onChange={(e) => {
    setNumberOfBags(e.target.value);

    calculateFare(
      trashType,
      mode,
      e.target.value
    );
  }}
  fullWidth
  required
/>

<Box className="book-pickup-fare-box">

  <Typography className="book-pickup-fare-label">
    Estimated Fare
  </Typography>

  <Typography className="book-pickup-fare-value">
    ₹{estimatedFare}
  </Typography>

</Box>

<TextField
  select
  label="Payment Method"
  value={paymentMethod}
  onChange={(e) =>
    setPaymentMethod(e.target.value)
  }
  fullWidth
  required
>
  <MenuItem value="Cash">
    Cash
  </MenuItem>

  <MenuItem value="UPI">
    UPI
  </MenuItem>
</TextField>

        <Button
  variant="contained"
  size="large"
  onClick={() => {
    if (paymentMethod === "UPI") {
      handleUPIPayment();
    }
  }}
  type={
    paymentMethod === "Cash"
      ? "submit"
      : "button"
  }
  className="book-pickup-btn"
>
  {paymentMethod === "UPI"
    ? "Proceed To Payment"
    : "Book Pickup"}
</Button>

{/* CLOSE FORM BOX */}
</Box>

{/* CLOSE PAPER */}
</Paper>

{/* CLOSE CONTAINER */}
</Container>

{/* CLOSE OUTER BOX */}
</Box>
);
}

export default BookPickup;