import { saveUserToSecondCollection } from '../services/listenerService.js';

const listener = async (req, res) => {
    try {
        const userData = req.body;
        await saveUserToSecondCollection(userData);
        res.status(200).json({ message: 'User copied to second collection' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to copy user' });
    }
};

export { listener }; 