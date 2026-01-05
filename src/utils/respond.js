export const respond = (success, message, data = null, error = null) => ({
  success,
  message,
  data,
  error,
});

export const respondSender = (
  res,
  success,
  statusCode,
  message,
  data = null,
  error = null
) => {
  res.status(statusCode).json(respond(success, message, data, error));
};
