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
