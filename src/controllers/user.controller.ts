import { users } from "../database/users";
import { Request, Response } from "express";

export class UserController {
  //metodo
  public getAllUsers(req: Request, res: Response) {
    try {
      const { name, email, cpf } = req.query;

      let result = users;

      if (name) {
        result = users.filter((user) => user.name === name);
      }
      if (email) {
        result = users.filter((user) => user.email === email);
      }
      if (cpf) {
        result = users.filter((user) => user.cpf === cpf);
      }

      return res.status(200).send({
        ok: true,
        message: "Users were sucessfully listed",
        data: result.map((growdever) => growdever.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
