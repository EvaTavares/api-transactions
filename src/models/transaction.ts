import { v4 as createUuid } from "uuid";

export class Transaction {
  private _id: string;
  constructor(
    private _title: string,
    private _value: number,
    private _type: string
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
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
      id: this._id,
      title: this._title,
      value: this._value,
      type: this._type,
    };
  }
}
