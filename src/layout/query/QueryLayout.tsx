import "../../models/queries/index";
import { D3Query } from "../../models/query";

const QueryLayout = () => {
  return (
    <button onClick={() => console.log(D3Query.queries)}>test button</button>
  );
};

export default QueryLayout;
