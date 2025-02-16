import express from 'express';
import connectDB from './config/db.js';
import receiverRoutes from './routes/receiverRoutes.js';
import listenerRoutes from './routes/listenerRoutes.js';
import redisClient from './config/redis.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api', receiverRoutes);
app.use('/api', listenerRoutes);

redisClient.subscribe('userChannel', async (message) => {
    const userData = JSON.parse(message);
    await saveUserToSecondCollection(userData);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});