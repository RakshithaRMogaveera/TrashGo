import axios from "axios";

const API =
  "http://localhost:5000/api/users";

export const changePassword =
  async (
    currentPassword,
    newPassword
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API}/change-password`,
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
  export const updateProfile =
  async (
    name,
    phoneNumber
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API}/update-profile`,
        {
          name,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };