// Login validation schema following Yup interface and contract for React Hook Form
export const loginSchema = {
  validate: async (data) => {
    const errors = {};
    const email = (data.email || "").trim();
    const password = (data.password || "").trim();

    if (!email) {
      errors.email = "Email Address is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      const err = new Error("Validation Failed");
      err.inner = Object.entries(errors).map(([path, msg]) => ({
        path,
        type: "validation",
        message: msg,
      }));
      throw err;
    }

    return data;
  },
};

export const yupResolver = (schema) => async (data) => {
  try {
    const values = await schema.validate(data, { abortEarly: false });
    return {
      values,
      errors: {},
    };
  } catch (err) {
    const errorMap = {};
    if (err.inner && Array.isArray(err.inner)) {
      err.inner.forEach((currentError) => {
        if (currentError.path && !errorMap[currentError.path]) {
          errorMap[currentError.path] = {
            type: currentError.type || "validation",
            message: currentError.message,
          };
        }
      });
    }
    return {
      values: {},
      errors: errorMap,
    };
  }
};
