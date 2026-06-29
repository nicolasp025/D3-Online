export type QueryClass = new (...args: any[]) => D3Query;

export abstract class D3Query {
  static queries: QueryClass[] = [];

  abstract path: string;
  name: string = "New Query";
  abstract description: string;

  abstract parameters: any;
  abstract result: any;

  done: boolean = false;

  protected static registerQuery(cls: QueryClass) {
    D3Query.queries.push(cls);
  }

  async send() {
    // Send request to back
    this.done = true;
  }
}

export class D3EmptyQuery extends D3Query {
  path: string = "";
  description = "Empty query";
  parameters = null;
  result = null;
}

export abstract class D3SourceQuery extends D3Query {
  path: string = "source/";
}

export abstract class D3ExecutionQuery extends D3Query {
  path: string = "execution/";
  stepRange: { start: number; stop: number };

  constructor(start: number, stop: number) {
    super();
    this.stepRange = { start: start, stop: stop };
  }
}
