import Inspector from "../../components/inspector/Inspector";
import { originalStack } from "../../fakedata";
import "../../models/queries/index";
import { D3ExecutionPath } from "../../models/queries/index";

const QueryLayout = () => {
  const complex = new D3ExecutionPath({ name: "test" }, 0, 5);
  return <Inspector forObject={complex} />;
};

export default QueryLayout;
