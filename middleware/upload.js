import multer from 'multer';

// File filter
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(new Error('Not an image! Please upload only images.'), false);
	}
};

// Create multer upload instance with memory storage
const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
	},
});

export default upload;
