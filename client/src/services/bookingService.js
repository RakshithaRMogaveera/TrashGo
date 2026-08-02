import axiosInstance from "../api/axios";

// Create Booking
export const createBooking = async (
  bookingData
) => {
  const token =
    localStorage.getItem("token");

  const response =
    await axiosInstance.post(
      "/bookings",
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

// Get User Booking History
export const getUserBookings =
  async () => {
    const token =
      localStorage.getItem("token");

    const response =
      await axiosInstance.get(
        "/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
  export const cancelBooking = async (
  bookingId
) => {
  const token =
    localStorage.getItem("token");

  const response =
    await axiosInstance.put(
      `/bookings/cancel/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const submitRating = async (
  bookingId,
  rating,
  review
) => {
  const token =
    localStorage.getItem("token");

  const response =
    await axiosInstance.put(
      `/bookings/rate/${bookingId}`,
      {
        rating,
        review,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const updatePaymentStatus =
  async (bookingId) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axiosInstance.put(
        `/bookings/payment/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };