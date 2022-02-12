import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";
import { loginRouter } from "./routes/login.js";
import { signUpRouter } from "./routes/signup.js";
import { forgotPasswordRouter } from "./routes/forgotPassword.js"
import { resetPasswordRouter } from "./routes/resetPassword.js"
import { auth } from "./middleware/auth.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Mongo DB connection
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb connected!");
    return client;
}
export const client = await createConnection();


app.get("/", (request, response) => {
    response.send("Hello World...");
})

// Authentication
app.use("/login", loginRouter)
app.use("/sign-up", signUpRouter)
app.use("/forgot-password", forgotPasswordRouter)
app.use("/reset-password", resetPasswordRouter)

app.use("/movies",moviesRouter);
app.use("/users",usersRouter);



app.listen(PORT, () => console.log("App is started in ", PORT));
