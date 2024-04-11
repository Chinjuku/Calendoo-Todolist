// run ts-node index.ts
import cors from "cors"
import express from "express";
const { MongoClient, ServerApiVersion } = require('mongodb');
import { allUsers, createUser, loginUser } from "./controller/user"
import { createList } from "./controller/list";
import { createContact } from "./controller/contact";
import { createNote, deleteNote, updateNote } from "./controller/note";
import { createProject, showProject } from "./controller/project";
import { createBoard, showBoard } from "./controller/board";
import { authenticateUser, authorization, protectUser } from "./controller/auth"

const app = express();
const cookieParser = require("cookie-parser");
const port = 8888;
const uri = "mongodb+srv://cjchinjung123:Dg8xsx1XhhSa0zRq@cluster0.rnxkkbo.mongodb.net/mydb"

app.use(express.json());
app.use(cors())
app.use(cookieParser());
// User
app.post('/createUser', createUser);
app.get('/loginUser', loginUser);
app.get('/user', allUsers);
app.post('/google-auth', authenticateUser);
app.get("/protected", authorization, protectUser);
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