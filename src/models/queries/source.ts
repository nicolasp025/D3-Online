import { D3Query, D3SourceQuery } from "../query";
import type { D3Method, D3ModifiedMethod } from "../reflexivity";

export class D3SourceQueryOfCodeDiff extends D3SourceQuery {
  description = "Returns the list of modified methods between v1 and v2.";
  parameters = null;
  result: D3ModifiedMethod[] | undefined;

  constructor() {
    super();
    this.path = this.path + "codeDiff";
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3SourceOfMethodEquivalence extends D3SourceQuery {
  description =
    "Returns true if the specified method has been modified, false otherwise.";
  parameters: D3Method;
  result: boolean | undefined;

  constructor(method: D3Method) {
    super();
    this.path = this.path + "methodEquivalence";
    this.parameters = method;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3SourceSendersEquivalence extends D3SourceQuery {
  description =
    "Returns true if the specified method uses the same senders in both versions.";
  parameters: D3Method;
  result: boolean | undefined;

  constructor(method: D3Method) {
    super();
    this.path = this.path + "sendersEquivalence";
    this.parameters = method;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}
