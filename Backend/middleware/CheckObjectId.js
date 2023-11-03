// Import the 'isValidObjectId' function from the 'mongoose' library

import { isValidObjectId } from "mongoose";

// Define a middleware function 'checkObjectId' that takes 'req', 'res', and 'next' as parameters
function checkObjectId(req, res, next) {
  // Check if the request parameter 'id' is not a valid ObjectId
  if (!isValidObjectId(req.params.id)) {
    // Set the response status code to 404 (Not Found)
    res.status(404);
    // Throw an error with a message indicating that the provided 'id' is invalid
    throw new Error(`Invalid Object of: ${req.params.id}`);
  }
  // If 'id' is valid, call the 'next' function to move to the next middleware or route handler
  next();
}

// Export the 'checkObjectId' middleware function to make it available for use in other parts of your code
export default checkObjectId;
