import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { transactionRoutes } from "./transaction.routes";

export const userRoutes = () => {
  const app = Router();

  //Listar usuários
  app.get("/", new UserController().getAllUsers);
  // Listar por id
  app.get("/:id", new UserController().listUserId);
  // Criar usuário
  app.post("/", new UserController().createUser);
  // Atualizar usuário
  app.put("/:id", new UserController().update);
  // Deletar usuário
  app.delete("/:id", new UserController().delete);

  app.use("/:userId/transactions", transactionRoutes());

  return app;
};
