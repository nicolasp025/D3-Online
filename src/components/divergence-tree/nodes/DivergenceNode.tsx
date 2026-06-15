import type { D3StackFrame } from "../../../models/stack";
import { TREE_CONFIG } from "../../../config/tree-config";
import TreeNode from "./TreeNode";

interface DivergenceNodeProps {
    frame: D3StackFrame | null;
}

/**
 * Returns the divergence node to be displayed in the table.
 * @param isStateDiv True if the divergence node is also a state divergence.
 * @returns A jsx element.
 */
const DivergenceNode: React.FC<DivergenceNodeProps> = ({ frame }) => {
    return (
        <TreeNode
            frame={frame}
            defaultClassName="flow-div"
            cx={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
        />
    );
};

export default DivergenceNode;
