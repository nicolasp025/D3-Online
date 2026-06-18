import { TREE_CONFIG } from "../../../config/tree-config";

interface TreeNodeProps {
  isStateDiv: boolean;
  defaultClassName?: string;
  cx?: number;
}

/**
 * Returns a tree node with the specified params.
 * @param isStateDiv If true, the node will have the classname state-div.
 * @param defaultClassName If isStateDiv if false, uses that classname.
 * @param cx The X coordinate to display the node at.
 * @returns The tree node with specified params.
 */
const TreeNode: React.FC<TreeNodeProps> = ({
  isStateDiv,
  defaultClassName = "",
  cx = TREE_CONFIG.LINE_X,
}) => {
  return (
    <circle
      className={isStateDiv ? "state-div" : defaultClassName}
      cx={cx}
      cy={TREE_CONFIG.CIRCLE_POSITION}
      r={TREE_CONFIG.DOT_RADIUS}
    />
  );
};

export default TreeNode;
