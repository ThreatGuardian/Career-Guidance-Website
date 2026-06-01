export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.name}: ${err.message}`);

  // Default error format
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    error: 'Internal Server Error',
    message: 'An unexpected error occurred. Please try again later.'
  };

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    errorResponse.error = 'Validation Error';
    errorResponse.message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json(errorResponse);
  }

  // Mongoose Duplicate Key (e.g., Email already exists)
  if (err.code === 11000) {
    errorResponse.error = 'Duplicate Key Error';
    errorResponse.message = 'A record with that information already exists.';
    return res.status(400).json(errorResponse);
  }

  // Groq API Failures or Rate Limits
  if (err.message && err.message.includes('Groq')) {
    errorResponse.error = 'AI Service Error';
    errorResponse.message = 'Failed to generate insights. The service might be busy.';
    if (err.message.includes('Rate limit')) {
      return res.status(429).json({ error: 'Rate Limit Exceeded', message: 'Too many requests to the AI service. Please wait.' });
    }
    return res.status(502).json(errorResponse);
  }

  // JWT Auth Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    errorResponse.error = 'Authentication Error';
    errorResponse.message = 'Invalid or expired session. Please log in again.';
    return res.status(401).json(errorResponse);
  }

  // Generic handled errors with custom messages
  if (err.isOperational) {
    errorResponse.error = err.errorName || 'Error';
    errorResponse.message = err.message;
    return res.status(statusCode).json(errorResponse);
  }

  // Send default 500 for unhandled exceptions
  res.status(statusCode).json(errorResponse);
};
