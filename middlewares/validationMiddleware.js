export const validateUser = (req, res, next) => {
    const { user, class: userClass, age, email } = req.body;
    if (!user || !userClass || age === undefined || !email) {
        return res.status(400).json({ error: 'Invalid user data' });
    }
    next();
};