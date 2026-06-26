import { originalStack } from "../../fakedata";
import { useInspector } from "../../hooks/useInspector";
import "../../models/queries/index";
import { D3ExecutionPath } from "../../models/queries/index";

const QueryLayout = () => {
  const { openInspectorOn } = useInspector();

  const complex = new D3ExecutionPath({ name: "test" }, 0, 5);
  return <button onClick={() => openInspectorOn(originalStack)}>test</button>;
};

export default QueryLayout;
