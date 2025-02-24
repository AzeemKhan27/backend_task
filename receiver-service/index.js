const express = require("express");
const mongoose = require("mongoose");
const Redis = require("redis");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Redis Publisher
const redisClient = Redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
redisClient.on("error", (err) => console.error("Redis error", err));

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
    id: String,
    user: String,
    class: String,
    age: Number,
    email: String,
    inserted_at: Date,
});
const User = mongoose.model("User", userSchema);

// Joi Schema for Validation
const userValidationSchema = Joi.object({
    user: Joi.string().required(),
    class: Joi.string().required(),
    age: Joi.number().integer().required(),
    email: Joi.string().email().required(),
});

// API Endpoint
app.post("/receiver", async (req, res) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newUser = new User({
        id: uuidv4(),
        ...req.body,
        inserted_at: new Date(),
    });

    await newUser.save();

    // Publish to Redis
    redisClient.publish("user_events", JSON.stringify(newUser));

    res.status(201).json({ message: "User saved and event published", user: newUser });
});

app.listen(process.env.PORT, () => console.log(`Receiver service running on port ${process.env.PORT}`));
