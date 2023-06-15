import { Router } from "express";
import { TransactionController } from "../controllers/transactions.controller";

export const transactionRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  //Criar Transaction
  app.post("/", new TransactionController().createTransactions);

  //Listar transactions
  app.get("/:idTransaction", new TransactionController().listTransaction);

  app.get("/", new TransactionController().listBalance);

  //Editar transaction
  app.put("/:idTransaction", new TransactionController().updateBalance);

  //Deletar transaction
  app.delete("/:idTransaction", new TransactionController().deleteTransaction);

  return app;
};
