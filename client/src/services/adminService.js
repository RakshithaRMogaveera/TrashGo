import axios from "axios";

const API_URL =
  "http://localhost:5000/api/admin";

export const loginAdmin =
  async (adminData) => {
    const response =
      await axios.post(
        `${API_URL}/login`,
        adminData
      );

    return response.data;
  };

export const getAdminBookings =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/bookings`
      );

    return response.data;
  };
  export const getAllCollectors =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/collectors`
      );

    return response.data;
  };

export const approveCollector =
  async (collectorId) => {
    const response =
      await axios.put(
        `${API_URL}/approve-collector/${collectorId}`
      );

    return response.data;
  };