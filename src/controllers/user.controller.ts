import { users } from "../database/users";
import { Request, Response } from "express";
import { User } from "../models/user";
import { StatusCodes } from "http-status-codes";

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

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Users were sucessfully listed",
        // data: result.map((growdever) => growdever.toJson()),
        data: result.map((user) => {
          return {
            id: user.toJson().id,
            name: user.toJson().name,
            email: user.toJson().email,
            cpf: user.toJson().cpf,
          };
        }),
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = users.find((user) => user.id === id);

      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).send({
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
  }

  public createUser(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;

      const cpfValid = users.some((user) => user.cpf === cpf);

      if (cpfValid) {
        return res.status(404).send({
          ok: false,
          messege: "CPF already registered",
        });
      }

      if (!name) {
        return res.status(400).send({
          ok: false,
          message: "Nome was not provided",
        });
      }
      if (!email) {
        return res.status(400).send({
          ok: false,
          message: "E-mail was not provided",
        });
      }
      if (!age) {
        return res.status(400).send({
          ok: false,
          message: "Idade was not provided",
        });
      }

      const user = new User(name, cpf, email, age);
      users.push(user);

      return res.status(201).send({
        ok: true,
        message: "User was successfully created",
        data: user.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email } = req.body;

      const user = users.find((user) => user.id === id);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "User was not found" });
      }

      if (!email || user.email === email) {
        return res.status(400).send({ ok: false, message: "Email is invalid" });
      }

      user.email = email;
      return res
        .status(201)
        .send({ ok: true, message: "Email was successfully updated" });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex < 0) {
        return res
          .status(404)
          .send({ ok: false, message: "user was not found." });
      }

      const deletedUser = users.splice(userIndex, 1);

      return res.status(200).send({
        ok: true,
        message: "user was successfully deleted",
        data: deletedUser[0].toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
