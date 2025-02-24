const mongoose = require("mongoose");
const Redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Redis Subscriber
const redisClient = Redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
redisClient.on("error", (err) => console.error("Redis error", err));

// Define Mongoose Schema for Processed Data
const processedUserSchema = new mongoose.Schema({
    id: String,
    user: String,
    class: String,
    age: Number,
    email: String,
    inserted_at: Date,
    modified_at: Date,
});
const ProcessedUser = mongoose.model("ProcessedUser", processedUserSchema);

// Subscribe to Redis Channel
redisClient.subscribe("user_events");
redisClient.on("message", async (channel, message) => {
    if (channel === "user_events") {
        const userData = JSON.parse(message);

        const processedUser = new ProcessedUser({
            ...userData,
            modified_at: new Date(),
        });

        await processedUser.save();
        console.log("User processed:", processedUser);
    }
});

console.log("Listener service running...");
