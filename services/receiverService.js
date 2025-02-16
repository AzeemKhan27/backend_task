import User from '../models/user.js';
import redisClient from '../config/redis.js';

const saveUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    await redisClient.publish('userChannel', JSON.stringify(user));
};

export { saveUser };