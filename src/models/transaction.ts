import { v4 as createUuid } from "uuid";

enum StatusTransaction {
  INCOME = "income",
  REPROVADO = "reprovado",
}
export class Transaction {
  private _idTransaction: string;
  constructor(
    private _title: string,
    private _value: number,
    private _type: StatusTransaction
  ) {
    this._idTransaction = createUuid();
  }

  public get idTransaction() {
    return this._idTransaction;
  }

  public get title() {
    return this._title;
  }

  public get value() {
    return this._value;
  }

  public get type() {
    return this._type;
  }

  public toJson() {
    return {
      id: this._idTransaction,
      title: this._title,
      value: this._value,
      type: this._type,
    };
  }
}
