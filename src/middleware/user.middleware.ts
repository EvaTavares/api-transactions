import { NextFunction, Request, Response } from "express";

export class UserMiddleware {
  public static validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(404).send({ ok: false, message: "Id was not found" });
      }

      throw new Error("deu error");
      next();
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
