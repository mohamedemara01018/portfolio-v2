


function appError(statusCode, statusText, message) {
    let error = new Error();
    error.statusCode = statusCode || 500;
    error.statusText = statusText || 'rejected';
    error.message = message || 'internal server error';
    return error
}

export default appError