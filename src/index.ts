import express, { NextFunction, Request, Response } from "express";
import { users } from "./database/users";
import { UserController } from "./controllers/user.controller";
import { User } from "./models/user";
import { TransactionController } from "./controllers/transactions.controller";
import { StatusCodes } from "http-status-codes";

const app = express();
app.use(express.json());
const middleware = (req: Request, res: Response, next: NextFunction) => {
  next();
};
//Rota de usuários
//listar usuários
app.get("/users", [middleware], new UserController().getAllUsers);

// listar por id
app.get("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = users.find((user) => user.id === id);

    if (!result) {
      return res.status(404).send({
        ok: false,
        message: "User was not found",
      });
    }

    return res.status(StatusCodes.OK).send({
      ok: true,
      message: "users was sucessfully obtained",
      data: result.toJson(),
    });
  } catch (error: any) {
    // status
    return res.status(StatusCodes.BAD_GATEWAY).send({
      ok: false,
      message: error.toString(),
    });
  }
});

// criar usuario
app.post("/users", [middleware], new UserController().crateUser);

// atualizar usuário
app.put("/users/:id", [middleware], new UserController().update);

// deletar usuário
app.delete("/users/:id", [middleware], new UserController().delete);

//Criar Transaction
app.post(
  "/user/:userId/transactions",
  [middleware],
  new TransactionController().createTransactions
);

app.get(
  "/user/:userId/transactions/:idTransaction",
  [middleware],
  new TransactionController().listTransaction
);

app.get(
  "/users/:userId/transactions",
  [middleware],
  new TransactionController().listBalance
);

app.listen(3333, () => {
  console.log("API is running");
});
