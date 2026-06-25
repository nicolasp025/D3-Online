import { D3ExecutionQuery, D3Query } from "../../query";
import type { D3Method } from "../../reflexivity";
import type { D3StackFrame } from "../../stack";

export class D3ExecutionPath extends D3ExecutionQuery {
  description =
    "Returns the specified method calls in the frame between the specified range.";
  parameters: D3Method;
  result: D3StackFrame[] | undefined;

  constructor(method: D3Method, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "executionPath";
    this.parameters = method;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3IsRecursive extends D3ExecutionQuery {
  description =
    "Returns true if the specified method is recursive, false otherwise.";
  parameters: D3Method;
  result: boolean | undefined;

  constructor(method: D3Method, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "isRecursive";
    this.parameters = method;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3WhenCalled extends D3ExecutionQuery {
  description = "Returns the state when the specified method is called.";
  parameters: D3Method;
  result: D3StackFrame[] | undefined;

  constructor(method: D3Method, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "whenCalled";
    this.parameters = method;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}
