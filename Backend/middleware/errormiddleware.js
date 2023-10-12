const errorHandler = (err, req, res, next) => {
    // Get the current HTTP status code
    let statusCode = res.statusCode;

    // Get the error message from the 'err' object
    let message = err.message;

    // Check for a specific type of error related to Mongoose (CastError with kind ObjectId)
    if (err.name === "CastError" && err.kind === "ObjectId") {
        // If it's a CastError with kind ObjectId, set the message to "Resource not found"
        message = "Resource not found";

        // Change the StatusCode to 404, indicating that the resource was not found
        statusCode = 404;
    }

    // Send a JSON response back to the client with 'message' and 'stack' properties
    res.status(statusCode).json({
        message, // The error message or "Resource not found" if it's a specific type of error
        stack: process.env.NODE_ENV === "production" ? "😔" : err.stack // In production, return a sad face emoji; otherwise, return the error stack trace
    });
}

export default errorHandler;
