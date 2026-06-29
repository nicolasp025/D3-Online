import { D3ExecutionQuery, D3Query } from "../../query";
import type { D3Object, D3Variable } from "../../reflexivity";

export class D3SystemState extends D3ExecutionQuery {
  description = "Returns the system state between the specified range.";
  parameters = null;
  result: D3Object[] | undefined;

  constructor(start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "systemState";
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3VariableValues extends D3ExecutionQuery {
  description =
    "Returns the list of instance variables values for the specified object between the specified range.";
  parameters: D3Object;
  result: D3Variable[] | undefined;

  constructor(object: D3Object, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "variableValues";
    this.parameters = object;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3RuntimeType extends D3ExecutionQuery {
  description =
    "Returns the runtime type for the specified entity between the specified range.";
  parameters: D3Object;
  result: string | undefined;

  constructor(object: D3Object, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "runtimeType";
    this.parameters = object;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3CollectionContent extends D3ExecutionQuery {
  description =
    "Returns the specified collection's content between the specified range.";
  parameters: D3Object;
  result: D3Object[] | undefined;

  constructor(object: D3Object, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "collectionContent";
    this.parameters = object;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}
