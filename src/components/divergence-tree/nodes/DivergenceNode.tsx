import { TREE_CONFIG } from "../../../config/tree-config";
import TreeNode from "./TreeNode";

interface DivergenceNodeProps {
  isStateDiv: boolean;
}

/**
 * Returns the divergence node to be displayed in the table.
 * @param isStateDiv True if the divergence node is also a state divergence.
 * @returns A jsx element.
 */
const DivergenceNode: React.FC<DivergenceNodeProps> = ({ isStateDiv }) => {
  return (
    <TreeNode
      isStateDiv={isStateDiv}
      defaultClassName="flow-div"
      cx={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
    />
  );
};

export default DivergenceNode;
