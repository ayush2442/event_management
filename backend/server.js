// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const socketIo = require("socket.io");
// const authRoutes = require("./routes/authRoutes");
// const eventRoutes = require("./routes/eventRoutes");
// const Event = require("./models/Event");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/auth", authRoutes);
// app.use("/events", eventRoutes);

// // Socket.IO for real-time updates
// io.on("connection", (socket) => {
//   console.log("New client connected");
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const WebSocketManager = require("./utils/websocket");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Initialize WebSocket manager
const wsManager = new WebSocketManager(io);
app.set('io', io);
app.set('wsManager', wsManager);

// Routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/event_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));