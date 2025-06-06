import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
import menuRoutes from './routes/menuRoutes.js';

const app = express();

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
// const dbURI = `mongodb+srv://${username}:${password}@nodeblog.wo7j5.mongodb.net/mona-lize?retryWrites=true&w=majority&appName=nodeblog`;
const dbURI = `mongodb+srv://${username}:${password}@mona-lize.oxkq4p6.mongodb.net/?retryWrites=true&w=majority&appName=mona-lize`;
// mongodb+srv://leogytis:kj0PRQqim3LgtEVQ@mona-lize.oxkq4p6.mongodb.net/

mongoose

	.connect(dbURI)
	.then(() => {
		app.listen(3001);
	})
	.catch((err) => console.log(err));

// Apply basic middleware first
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// Define routes
app.use('/menu', menuRoutes);

// Apply error handling middleware last
app.use(notFound);
app.use(errorHandler);
