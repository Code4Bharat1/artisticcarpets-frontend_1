import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  // Backend expects { identifier, password } — map email -> identifier
  const response = await axiosInstance.post("/auth/user/login", {
    identifier: credentials.email || credentials.identifier,
    password: credentials.password,
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/user/register", userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (email, resetToken, newPassword) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    email,
    resetToken,
    newPassword,
  });
  return response.data;
};

export const googleAuth = async (token) => {
  const response = await axiosInstance.post("/auth/user/google", { token });
  return response.data;
};
