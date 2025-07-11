import 'dotenv/config';
import express from 'express';
import { ENV } from './config/env.js';
import morgan from 'morgan';
import job from './config/cron.js';



const app = express();
const port = ENV?.PORT;

// Start cron job if the environment is production
if(ENV.NODE_ENV === 'production') job.start();


// import routes
import apiRoutes from './routes/app.route.js';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: "Server is healthy" });
})
// Routes
app.use('/api/v1', apiRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ----> ${port}`);
})