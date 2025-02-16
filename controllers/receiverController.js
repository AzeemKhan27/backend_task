import { saveUser } from '../services/receiverService.js';
import crypto from 'crypto';

const receiver = async (req, res) => {
    try {
        const { user, class: userClass, age, email } = req.body;
        const id = crypto.randomUUID();
        const inserted_at = new Date();
        const userData = { id, user, userClass, age, email, inserted_at };
        await saveUser(userData);
        res.status(201).json({ message: 'User saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save user' });
    }
};

export { receiver }; 