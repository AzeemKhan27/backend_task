import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    user: { type: String, required: true },
    class: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    inserted_at: { type: Date, required: true },
    modified_at: { type: Date, required: false },
});

const User = mongoose.model('User', userSchema);

export default User;