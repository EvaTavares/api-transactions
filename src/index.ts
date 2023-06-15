import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Rota de usuários
app.use("/user", userRoutes());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
