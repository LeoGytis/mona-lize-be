import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import menuRoutes from './routes/menuRoutes.js';

const app = express();

const port = encodeURIComponent(process.env.PORT);
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const dbURI = `mongodb+srv://${username}:${password}@mona-lize.oxkq4p6.mongodb.net/?retryWrites=true&w=majority&appName=mona-lize`;

mongoose
	.connect(dbURI)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => console.log(err));

// Apply basic middleware first
app.use(
	cors({
		origin: '*', // Allow all origins temporarily for testing
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'X-Requested-With',
			'Accept',
		],
		credentials: true,
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);

// Add CORS debugging middleware
app.use((req, res, next) => {
	console.log('Request Origin:', req.headers.origin);
	console.log('Request Method:', req.method);
	console.log('Request Headers:', req.headers);
	next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// Define routes
app.use('/menu', menuRoutes);

// Apply error handling middleware last
// app.use(notFound);
// app.use(errorHandler);
