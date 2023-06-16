import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ApiResponse {
  public static notFound(res: Response, entity: string) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ ok: false, message: `${entity} was not found` });
  }

  public static success(res: Response, message: string, data: any) {
    return res.status(StatusCodes.OK).send({ ok: false, message, data });
  }

  public static notProvided(res: Response, field: string) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      ok: false,
      message: `${field} was not provided`,
    });
  }

  public static serverError(res: Response, error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      ok: false,
      message: error.toString(),
    });
  }
}
