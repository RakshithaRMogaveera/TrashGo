import axiosInstance from "../api/axios";

export const loginUser = async (
  loginData
) => {
  const response =
    await axiosInstance.post(
      "/users/login",
      loginData
    );

  return response.data;
};

export const registerUser =
  async (userData) => {
    const response =
      await axiosInstance.post(
        "/users/signup",
        userData
      );

    return response.data;
  };

