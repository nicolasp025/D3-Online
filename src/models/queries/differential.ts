import type {
  D3Divergence,
  D3FlowDivergence,
  D3StateDivergence,
} from "../divergence";
import { D3ExecutionQuery, D3Query } from "../query";
import type { D3Method, D3Object } from "../reflexivity";
import type { D3StackFrame } from "../stack";

/** ------------------ Queries on Entities ------------------ */

export class D3ExecutionArgumentsEquivalence extends D3ExecutionQuery {
  description = "Returns the list of frames where the arguments are different.";
  parameters: D3Method;
  result: D3StackFrame[] | undefined;

  constructor(method: D3Method, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "sendersEquivalence";
    this.parameters = method;
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3ExecutionObjectEquivalence extends D3ExecutionQuery {
  description = "Returns true if the specified objects are equivalents.";
  parameters: { obj1: D3Object; obj2: D3Object };
  result: boolean | undefined;

  constructor(obj1: D3Object, obj2: D3Object, start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "sendersEquivalence";
    this.parameters = { obj1: obj1, obj2: obj2 };
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

/** ------------------ Queries on Divergences ------------------ */

export class D3ExecutionFirstDivergence extends D3ExecutionQuery {
  description = "Returns the first divergence in the specified range.";
  parameters = null;
  result: D3Divergence | undefined;

  constructor(start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "firstDivergence";
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3ExecutionFirstStateDivergence extends D3ExecutionQuery {
  description = "Returns the first state divergence in the specified range.";
  parameters = null;
  result: D3StateDivergence | undefined;

  constructor(start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "firstStateDivergence";
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}

export class D3ExecutionFirstFlowDivergence extends D3ExecutionQuery {
  description = "Returns the first flow divergence in the specified range.";
  parameters = null;
  result: D3FlowDivergence | undefined;

  constructor(start: number, stop: number) {
    super(start, stop);
    this.path = this.path + "firstFlowDivergence";
    this.result = undefined;
  }

  static {
    D3Query.registerQuery(this);
  }
}
