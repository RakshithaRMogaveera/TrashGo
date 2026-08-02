import axiosInstance from "../api/axios";

export const loginCollector = async (collectorData) => {
  const response = await axiosInstance.post(
    "/collectors/login",
    collectorData
  );

  return response.data;
};
export const signupCollector = async (
  collectorData
) => {
  const response =
    await axiosInstance.post(
      "/collectors/signup",
      collectorData
    );

  return response.data;
};

export const getAvailableBookings = async () => {
  const token = localStorage.getItem("collectorToken");

  const response = await axiosInstance.get(
    "/bookings/available",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const acceptBooking = async (bookingId) => {
  const token = localStorage.getItem("collectorToken");

  const response = await axiosInstance.put(
    `/bookings/accept/${bookingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getCollectorBookings = async () => {
  const token = localStorage.getItem("collectorToken");

  const response = await axiosInstance.get(
    "/bookings/collector-bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const updateBookingStatus = async (
  bookingId,
  status
) => {
  const token = localStorage.getItem(
    "collectorToken"
  );

  const response =
    await axiosInstance.put(
      `/bookings/status/${bookingId}`,
      {
  bookingStatus: status,
},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const unassignBooking = async (
  bookingId
) => {
  const token = localStorage.getItem(
    "collectorToken"
  );

  const response =
    await axiosInstance.put(
      `/bookings/unassign/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const getCollectorStats =
  async () => {
    const token =
      localStorage.getItem(
        "collectorToken"
      );

    const response =
      await axiosInstance.get(
        "/bookings/collector-stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
  export const markCashCollected =
  async (bookingId) => {
    const token =
      localStorage.getItem(
        "collectorToken"
      );

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
  export const getCollectorProfile = async () => {
  const token = localStorage.getItem("collectorToken");

  const response = await axiosInstance.get(
    "/collectors/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const updateCollectorProfile = async (
  name,
  phoneNumber,
  vehicleNumber
) => {
  const token = localStorage.getItem("collectorToken");

  const response = await axiosInstance.put(
    "/collectors/profile",
    {
      name,
      phoneNumber,
      vehicleNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const changeCollectorPassword =
  async (
    currentPassword,
    newPassword
  ) => {
    const token =
      localStorage.getItem(
        "collectorToken"
      );

    const response =
      await axiosInstance.put(
        "/collectors/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };