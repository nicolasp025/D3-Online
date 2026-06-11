import { useDivergence } from "../../../contexts/DivergenceContext";
import type { D3StackFrame } from "../../../models/stack";
import { TREE_CONFIG } from "../tree-config";

interface TreeNodeProps {
    frame: D3StackFrame | null;
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
    frame,
    defaultClassName = "",
    cx = TREE_CONFIG.LINE_X,
}) => {
    const { stateDivergences } = useDivergence();

    /**
     * Return true if the specified frame position corresponds to a state divergence position.
     * @param position The frame position.
     * @returns
     */
    const isStateDiv = (position: number) => {
        return stateDivergences.some((div) => div.originalPosition == position);
    };

    if (frame == null) {
        return <></>;
    }

    return (
        <circle
            className={isStateDiv(frame.position) ? "state-div" : defaultClassName}
            cx={cx}
            cy={TREE_CONFIG.CIRCLE_POSITION}
            r={TREE_CONFIG.DOT_RADIUS}
        />
    );
};

export default TreeNode;
