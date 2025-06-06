const errorHandler = (err, req, res) => {
	// Log error for debugging
	console.error('Error:', {
		message: err.message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
		status: err.status || 500,
	});

	// Handle different types of errors
	if (err.name === 'ValidationError') {
		return res.status(400).json({
			error: 'Validation Error',
			details: err.message,
		});
	}

	if (err.name === 'UnauthorizedError') {
		return res.status(401).json({
			error: 'Unauthorized',
			message: err.message,
		});
	}

	// Handle custom status errors
	if (err.status) {
		return res.status(err.status).json({
			error: err.message,
		});
	}

	// Default error
	res.status(500).json({
		error:
			process.env.NODE_ENV === 'production'
				? 'Internal Server Error'
				: err.message,
	});
};

export default errorHandler;
