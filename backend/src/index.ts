// run ts-node index.ts , npm start
import cors from "cors"
import express from "express";
import googleAuthRoutes from './routes/auth/google-auth';
import authRoutes from './routes/auth/simple-auth';
import boardRoutes from './routes/board';
import projectRoutes from './routes/project';
import noteRoutes from './routes/note';
import contactRoutes from './routes/contact';
import listRoutes from './routes/list';
import taskRoutes from './routes/task';
import tasklistRoutes from './routes/tasklist';

require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 8888;
const uri = "mongodb+srv://cjchinjung123:Dg8xsx1XhhSa0zRq@cluster0.rnxkkbo.mongodb.net/mydb"

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(cookieParser());

// User
app.use("/api/google-auth", googleAuthRoutes)
app.use("/api/user", authRoutes)

// Contacts
app.use('/api/contact', contactRoutes)

// Lists
app.use('/api/list', listRoutes);

// Notes
app.use('/api/note', noteRoutes)

// Projects
app.use('/api/project', projectRoutes)

// Boards
app.use('/api/board', boardRoutes)

// Tasks
app.use('/api/task', taskRoutes)

// TaskLists
app.use('/api/tasklist', tasklistRoutes)

// const WebSocket = require("ws");
// const http = require("http");
// const server = http.createServer();
// const wss = new WebSocket.Server({ server });

// Test port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})
// Test Connect MongoDB Server
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

function handleMsgs(arg0: any, ws: WebSocket) {
  throw new Error("Function not implemented.");
}
