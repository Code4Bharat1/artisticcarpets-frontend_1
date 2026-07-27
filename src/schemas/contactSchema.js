// Self-contained schema validator adhering to Yup API structure for seamless React Hook Form integration
export const contactSchema = {
  validate: async (data) => {
    const errors = {};
    const fullName = (data.fullName || "").trim();
    const phone = (data.phone || "").trim();
    const message = (data.message || "").trim();

    if (!fullName) {
      errors.fullName = "Full Name is required";
    } else if (fullName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    }

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phone) {
      errors.phone = "Phone Number is required";
    } else if (!phoneRegex.test(phone) || phone.length < 7) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!message) {
      errors.message = "Message is required";
    } else if (message.length < 10) {
      errors.message = "Message must be at least 10 characters long";
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

// Resolver helper matching React Hook Form yupResolver contract
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
