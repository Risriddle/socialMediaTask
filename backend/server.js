const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const Router = require("./routes/appRoutes");
const User = require("./models/User");
require("dotenv").config();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

const corsOptions={ origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],}
app.use(cors(corsOptions))
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB, {})
    .then(() => { console.log("Database connected"); })
    .catch((error) => { console.log("Error connecting to DB: ", error); });

app.use(express.json());


app.use("/api", (req, res, next) => {
    req.io = io; 
    next();
}, Router);

const getUsersData = async () => {
    const res = await User.find();
    return res;
};


io.on('connection', async (socket) => {
    console.log('Admin connected:', socket.id);

    socket.emit('allUsers', await getUsersData());

    socket.on('disconnect', () => {
        console.log('Admin disconnected:', socket.id);
    });
});

server.listen(port, () => { console.log(`Server is listening on: http://localhost:${port}`); });
