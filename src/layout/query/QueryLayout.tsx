import { startDebug } from "../../services/api";

const QueryLayout = () => {
  return <button onClick={() => startDebug("a", "b", "c")}>test button</button>;
};

export default QueryLayout;
