import { users } from "../database/users";
import { Request, Response } from "express";
import { User } from "../models/user";
import { Transaction } from "../models/transaction";

export class TransactionController {
  public createTransactions(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, value, type } = req.body;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "User was not found" });
      }

      if (!title) {
        return res.status(400).send({
          ok: false,
          message: "title was not provided",
        });
      }
      if (!value) {
        return res.status(400).send({
          ok: false,
          message: "Value was not provided",
        });
      }
      if (!type) {
        return res.status(400).send({
          ok: false,
          message: "Type was not provided",
        });
      }

      const newTransaction = new Transaction(title, value, type);
      user.transactions?.push(newTransaction);

      return res.status(200).send({
        ok: true,
        message: "Transaction were sucessfully listed",
        data: newTransaction.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listTransaction(req: Request, res: Response) {
    try {
      const { userId, idTransaction } = req.params;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "User was not found" });
      }

      const transactionValid = user.transactions.find(
        (transaction) => transaction.idTransaction === idTransaction
      );

      if (!transactionValid) {
        return res
          .status(404)
          .send({ ok: false, message: "user was not found." });
      }

      return res.status(200).send({
        ok: true,
        message: "Transaction was sucessfully listed",
        data: transactionValid.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listBalance(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const { type, title } = req.query;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "User was not found" });
      }

      const filterTitle = user.transactions.filter(
        (transaction) => transaction.title === title
      );
      const filterType = user.transactions.filter(
        (transaction) => transaction.type === type
      );

      let income = 0;
      let outcome = 0;

      for (const transaction of user.transactions) {
        if (transaction.type === "income") {
          income += transaction.value;
        } else {
          outcome += transaction.value;
        }
      }

      if (title) {
        return res.status(200).send({
          ok: true,
          message: "Title was sucessfully listed",
          data: filterTitle,
          balance: { income, outcome, total: income - outcome },
        });
      }

      if (type) {
        return res.status(200).send({
          ok: true,
          message: "Type was sucessfully listed",
          data: filterType,
          balance: { income, outcome, total: income - outcome },
        });
      }

      const listTransactions = user.transactions.map((transaction) =>
        transaction.toJson()
      );

      return res.status(200).send({
        ok: true,
        message: "Transaction was sucessfully listed",
        data: listTransactions,
        balance: { income, outcome, total: income - outcome },
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
