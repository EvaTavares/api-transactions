import { users } from "../database/users";
import { Request, Response } from "express";
import { Transaction } from "../models/transaction";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/http-response.adapter";

export class TransactionController {
  public createTransactions(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, value, type } = req.body;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      if (!title) {
        return ApiResponse.notProvided(res, "Title");
      }
      if (!value) {
        return ApiResponse.notProvided(res, "Value");
      }
      if (!type) {
        return ApiResponse.notProvided(res, "Type");
      }

      const newTransaction = new Transaction(title, value, type);
      user.transactions.push(newTransaction);

      return ApiResponse.success(
        res,
        "Transaction were sucessfully listed",
        newTransaction
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public listTransaction(req: Request, res: Response) {
    try {
      const { userId, idTransaction } = req.params;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      const transactionValid = user.transactions.find(
        (transaction) => transaction.idTransaction === idTransaction
      );

      if (!transactionValid) {
        return ApiResponse.notFound(res, "Transaction");
      }

      return ApiResponse.success(
        res,
        "Transaction was successfully listed",
        transactionValid
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
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
      return ApiResponse.serverError(res, error);
    }
  }

  public updateBalance(req: Request, res: Response) {
    try {
      const { userId, idTransaction } = req.params;
      const { type, value, title } = req.body;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "User was not found" });
      }

      const transactionIndex = user.transactions.find(
        (transaction) => transaction.idTransaction === idTransaction
      );

      if (!transactionIndex) {
        return res
          .status(404)
          .send({ ok: false, message: "Transaction was not found." });
      }

      if (!type || !title || !value) {
        return res
          .status(400)
          .send({ ok: false, message: "Transaction is invalid" });
      }

      transactionIndex.title = title;
      transactionIndex.type = type;
      transactionIndex.value = value;

      return res
        .status(201)
        .send({ ok: true, message: "Transação was successfully updated" });
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public deleteTransaction(req: Request, res: Response) {
    try {
      const { userId, idTransaction } = req.params;

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "User was not found." });
      }

      const transactionIndex = user.transactions.findIndex(
        (transaction) => transaction.idTransaction === idTransaction
      );

      if (transactionIndex === -1) {
        return res
          .status(404)
          .send({ ok: false, message: "Transaction was not found." });
      }

      const deletedTransaction = user.transactions.splice(transactionIndex, 1);

      return res.status(200).send({
        ok: true,
        message: "Transaction was delete",
        data: deletedTransaction[0].toJson(),
        // balance: { income, outcome, total: income - outcome },
      });
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
