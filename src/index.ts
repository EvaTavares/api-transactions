import express, { NextFunction, Request, Response } from "express";
import { users } from "./database/users";
import { UserController } from "./controllers/user.controller";

const app = express();
app.use(express.json());
const middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("recebeu e passou");
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

    return res.status(200).send({
      ok: true,
      message: "users was sucessfully obtained",
      data: result.toJson(),
    });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
});

app.post("/users", (req: Request, res: Response, next) => {
  try {
    const { name, cpf, email, age } = req.body;

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
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
  next();
});

app.listen(3333, () => {
  console.log("API is running");
});
