import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API Routes first
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Static file handling for production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
    // Catch-all route should be placed last
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html"));
    });

    app.use((req, res, next) => {
    console.log(`Request made to: ${req.url}`);
    next();
});
}


server.listen(PORT, () => {
  console.log("Server is running on port :" + PORT);
  connectDB();
});
