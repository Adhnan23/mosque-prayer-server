import createHttpError from "http-errors";

const notFoundHandler = (req, res) => {
  throw createHttpError(
    404,
    `Route ${req.method} ${req.originalUrl} not found`
  );
};

export default notFoundHandler;
