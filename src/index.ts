import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./controllers/user.controller";
import { TransactionController } from "./controllers/transactions.controller";
import { UserMiddleware } from "./middleware/user.middleware";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Rota de usuários
//Listar usuários
app.get("/users", new UserController().getAllUsers);

// Listar por id
app.get("/users/:id", new UserController().listUserId);

// Criar usuário
app.post("/users", new UserController().createUser);

// Atualizar usuário
app.put("/users/:id", new UserController().update);

// Deletar usuário
app.delete("/users/:id", new UserController().delete);

//Criar Transaction
app.post(
  "/user/:userId/transactions",
  [UserMiddleware.validateUser],
  new TransactionController().createTransactions
);

//Listar transactions
app.get(
  "/user/:userId/transactions/:idTransaction",
  [UserMiddleware.validateUser],
  new TransactionController().listTransaction
);

//Listar Balance
app.get(
  "/users/:userId/transactions",
  [UserMiddleware.validateUser],
  new TransactionController().listBalance
);

//Editar transaction
app.put(
  "/user/:userId/transactions/:idTransaction",
  [UserMiddleware.validateUser],
  new TransactionController().updateBalance
);

//Deletar transaction
app.delete(
  "/user/:userId/transactions/:idTransaction",
  [UserMiddleware.validateUser],
  new TransactionController().deleteTransaction
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
