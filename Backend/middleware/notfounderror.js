import { StatusCodes } from 'http-status-codes';

// Define a middleware function named 'notFound'
const notFound = (req, res, next) => {
  // Create an error with a message indicating the requested resource was not found
  const error = new Error(`Not found - ${req.originalURL}`);

  // Set the response status code to 404 (Not Found)
  res.status(StatusCodes.NOT_FOUND);

  // Pass the error to the next middleware or error handler
  next(error);
};

// Export the 'notFound' function as the default export of this module
export default notFound;
