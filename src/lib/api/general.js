export const generateResponseSuccess = ({ message, data }) => {
  return {
    status: "success",
    message,
    data,
  };
};

export const generateResponseError = (message) => {
  return {
    status: "error",
    message,
  };
};
