const sendResponse = (res, statusCode, message, data = null) => {
  const responsePayload = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  };

  console.log(`📤 Response ${statusCode}:`, responsePayload);
  res.status(statusCode).json(responsePayload);
};

export const successResponse = (res, message, data = null) => sendResponse(res, 200, message, data);
export const badRequestResponse = (res, message = 'Invalid request') => sendResponse(res, 400, message);
export const unauthorizedResponse = (res, message = 'Unauthorized') => sendResponse(res, 401, message);
export const notFoundResponse = (res, message = 'Not found') => sendResponse(res, 404, message);
export const serverErrorResponse = (res, message = 'Server error') => sendResponse(res, 500, message);

// Example usage:
// successResponse(res, 'Data retrieved successfully', { id: 1, name: 'John Doe' });
// badRequestResponse(res, 'Missing required parameters');
// unauthorizedResponse(res, 'Invalid token');
// notFoundResponse(res, 'User not found');
// serverErrorResponse(res, 'An unexpected error occurred');