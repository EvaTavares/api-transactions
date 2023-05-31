import { v4 as createUuid } from "uuid";

enum StatusTransaction {
  INCOME = "income",
  OUTCOME = "outcome",
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
  public set title(title: string) {
    this._title = title;
  }

  public get value() {
    return this._value;
  }
  public set value(value: number) {
    this._value = value;
  }

  public get type() {
    return this._type;
  }
  public set type(type: StatusTransaction) {
    this._type = type;
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
