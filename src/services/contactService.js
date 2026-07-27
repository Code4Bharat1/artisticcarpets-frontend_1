import axiosInstance from "./axiosInstance";

export const submitContactInquiry = async (formData) => {
  // Simulating real API network post with Axios fallback for local demo
  try {
    const response = await axiosInstance.post("/contact", formData);
    return response.data;
  } catch (error) {
    // If backend endpoint is not active yet, simulate a successful response delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return {
      success: true,
      message: "Your inquiry has been received. Our concierge will reach out within 24 hours.",
      data: formData,
    };
  }
};
