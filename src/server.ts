import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.all('*', async (req: express.Request, res: express.Response) => res.status(404).json({
    statusText: 'FAIL', statusValue: 404, message: 'Requested url is not available..',
}));


process.on('uncaughtException', (error: any) => {
    console.log('----- Uncaught exception -----', error);
    return;
});

process.on('unhandledRejection', (error: any) => {
    console.log('----- Unhandled Rejection at -----', error);
    return;
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
