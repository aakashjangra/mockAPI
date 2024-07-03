import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createNewUser, loginUser, protect } from './utils/auth';
import router from './router';

const app = express()

const PORT = 5000;

app.use(cors()); //CORS, to allow every origin to request
app.use(morgan('dev')); //api request logger
app.use(express.json()); //request body json parser

app.get("/", (req, res) => {
  res.send("Hello");
})

app.post("/register", createNewUser)

app.post("/login", loginUser)

app.use("/api", protect , router);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})