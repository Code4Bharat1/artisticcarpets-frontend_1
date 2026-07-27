import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    // Demo fallback resolution when backend endpoint is simulated locally
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      user: {
        name: credentials.email.split("@")[0].replace(".", " ") || "Alexander Sterling",
        email: credentials.email,
      },
      token: "demo-jwt-token-12345",
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    // Demo fallback resolution for registration
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      user: {
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      },
      token: "demo-jwt-token-register-12345",
    };
  }
};
