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
}
