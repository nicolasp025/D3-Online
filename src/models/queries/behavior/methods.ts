import { D3ExecutionQuery } from "../../query";
import type { D3Method, D3Object } from "../../reflexivity";

export class D3ExecutionResult extends D3ExecutionQuery {
  description =
    "Returns the specified method's result between the specified range.";
  parameters: D3Method;
  result: any | undefined;

  constructor(method: D3Method, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "executionResult";
    this.parameters = method;
    this.result = undefined;
  }
}

export class D3ArgumentsValues extends D3ExecutionQuery {
  description =
    "Returns the specified method's arguments values between the specified range.";
  parameters: D3Method;
  result: D3Object[] | undefined;

  constructor(method: D3Method, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "argumentsValues";
    this.parameters = method;
    this.result = undefined;
  }
}
