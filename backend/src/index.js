import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";

// Load environment variables
dotenv.config();

// Get the port from the environment or use 5001
const PORT = process.env.PORT || 5001;

// Get the current directory using `import.meta.url`
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.json());
app.use(cookieParser());

// Enable CORS for development
app.use(
  cors({
    origin: "http://localhost:5173",  // Change this based on your frontend's local URL
    credentials: true,
  })
);

// Use routes for authentication and messages
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files and fallback for production
if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend/dist (production build of React)
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  // Handle all GET requests and serve the React index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../frontend/dist", "index.html"));
  });
}

// Start the server and connect to the database
server.listen(PORT, () => {
  console.log("Server is running on port :" + PORT);
  connectDB();
});
