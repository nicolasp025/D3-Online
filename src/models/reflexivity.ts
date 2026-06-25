export type D3ModifiedMethod = {
  name: string;
  originalSource: string;
  modifiedSource: string;
};

export type D3Variable = {
  name: string;
  value: D3Object;
}

export type D3Object = {
  id: number;
  variables: D3Variable[];
  value: string;
};

export type D3Method = {
  name: string;
};
