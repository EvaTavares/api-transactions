import express, { NextFunction, Request, Response } from "express";
import { users } from "./database/users";
import { UserController } from "./controllers/user.controller";
import { User } from "./models/user";
import { TransactionController } from "./controllers/transactions.controller";
import { StatusCodes } from "http-status-codes";
import { UserMiddleware } from "./middleware/user.middleware";

const app = express();
app.use(express.json());

//Rota de usuários
//listar usuários
app.get("/users", new UserController().getAllUsers);

// listar por id
app.get("/users/:id", new UserController().listUserId);

// criar usuario
app.post("/users", new UserController().createUser);

// atualizar usuário
app.put("/users/:id", new UserController().update);

// deletar usuário
app.delete("/users/:id", new UserController().delete);

//Criar Transaction
app.post(
  "/user/:userId/transactions",
  [UserMiddleware.validateUser],
  new TransactionController().createTransactions
);

app.get(
  "/user/:userId/transactions/:idTransaction",
  [UserMiddleware.validateUser],
  new TransactionController().listTransaction
);

app.get(
  "/users/:userId/transactions",
  [UserMiddleware.validateUser],
  new TransactionController().listBalance
);

app.put(
  "/user/:userId/transactions/:idTransaction",
  [UserMiddleware.validateUser],
  new TransactionController().updateBalance
);

app.delete(
  "/user/:userId/transactions/:idTransaction",
  [UserMiddleware.validateUser],
  new TransactionController().deleteTransaction
);

app.listen(3333, () => {
  console.log("API is running");
});
