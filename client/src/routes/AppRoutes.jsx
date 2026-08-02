import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CollectorLogin from "../pages/CollectorLogin";
import CollectorSignup from "../pages/CollectorSignup";
import AdminLogin from "../pages/AdminLogin";
import UserDashboard from "../pages/UserDashboard";
import CollectorDashboard from "../pages/CollectorDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import BookPickup from "../pages/BookPickup";
import BookingHistory from "../pages/BookingHistory";
import CollectorMyBookings from "../pages/CollectorMyBookings";
import UPIPayment from "../pages/UPIPayment";
import UserProfile from "../pages/UserProfile";
import AvailableBookings from "../pages/AvailableBookings";
import CollectorProfile from "../pages/CollectorProfile";
import AdminBookings from "../pages/AdminBookings";
import AdminCollectors from "../pages/AdminCollectors";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/collector/login" element={<CollectorLogin />} />
      <Route path="/collector/signup" element={<CollectorSignup />} />
      <Route path="/collector/dashboard" element={<CollectorDashboard />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route
  path="/collector/my-bookings"
  element={<CollectorMyBookings />}
/>
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/book-pickup"
  element={
    <ProtectedRoute>
      <BookPickup />
    </ProtectedRoute>
  }
/>
<Route
  path="/booking-history"
  element={
    <ProtectedRoute>
      <BookingHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/upi-payment"
  element={<UPIPayment />}
/>

<Route
  path="/profile"
  element={<UserProfile />}
/>
<Route
  path="/collector/profile"
  element={<CollectorProfile />}
/>
<Route
  path="/collector/available-bookings"
  element={<AvailableBookings />}
/>
<Route
  path="/admin/bookings"
  element={<AdminBookings />}
/>

<Route
  path="/admin/collectors"
  element={<AdminCollectors />}
/>
</Routes>

  );
}

export default AppRoutes;