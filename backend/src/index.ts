// run ts-node index.ts , npm start
import cors from "cors"
import express from "express";
import { allUsers, createUser, loginUser } from "./routes/user"
import { createList } from "./routes/list";
import { createContact } from "./routes/contact";
import { createNote, deleteNote, updateNote } from "./routes/note";
import { createProject, showProject } from "./routes/project";
import { createBoard, showBoard } from "./routes/board";
import googleAuthRoutes from './routes/auth/google-auth';

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
app.use("/api/google-auth", googleAuthRoutes)

// User
app.post('/createUser', createUser);
app.get('/loginUser', loginUser);
app.get('/user', allUsers);
// app.post('/google-auth', authenticateUser);
// app.get("/protected", authorization, googleAuthRoutes);
// app.get("/logout", authorization, logoutUser);

// Contacts
app.post('/createContact', createContact);

//Lists
app.post('/createList', createList)

// Notes
app.post('/createNote', createNote)
app.put('/updateNote/:noteId', updateNote)
app.delete('/deleteNote/:noteId', deleteNote)

// Projects
app.post('/createProject', createProject)
app.get('/showProject/:userId', showProject)

// Boards
app.post('/createBoard', createBoard)
app.get('/showBoard/:projectId', showBoard)

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