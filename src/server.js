import 'dotenv/config';
import express from 'express';
const app = express();
import { ENV } from './config/env.js';
import morgan from 'morgan';

const port = ENV?.PORT;


// import routes
import apiRoutes from './routes/app.route.js';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Routes
app.use('/api/v1', apiRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ----> ${port}`);
})