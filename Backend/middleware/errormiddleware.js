const errorHandler = (err, req, res, next) => {
    // Get the current HTTP status code
    let statusCode = res.statusCode;

    // Get the error message from the 'err' object
    let message = err.message;

    // Send a JSON response back to the client with 'message' and 'stack' properties
    res.status(statusCode).json({
        message, // The error message or "Resource not found" if it's a specific type of error
        stack: process.env.NODE_ENV === "production" ? "😔" : err.stack // In production, return a sad face emoji; otherwise, return the error stack trace
    });
}

export default errorHandler;
