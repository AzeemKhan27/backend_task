import User from '../models/user.js';
import redisClient from '../config/redis.js';

const saveUserToSecondCollection = async (userData) => {
    userData.modified_at = new Date();
    const user = new User(userData);
    await user.save();
};

export { saveUserToSecondCollection }; 