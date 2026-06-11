import { useDivergence } from "../../../contexts/DivergenceContext";
import type { D3StackFrame } from "../../../models/stack";
import { TREE_CONFIG } from "../tree-config";
import { hasNextInDivergence, hasPreviousInDivergence } from "../tree-util";

interface NodeRelationProps {
    index: number;
    rows: (D3StackFrame | null)[];
}

const NodeRelation: React.FC<NodeRelationProps> = ({ index, rows }) => {
    const { flowDivergences } = useDivergence();

    return (
        <line
            x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y1={
                hasPreviousInDivergence(index, rows, flowDivergences)
                    ? "-2%"
                    : TREE_CONFIG.CIRCLE_POSITION
            }
            x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y2={
                hasNextInDivergence(index, rows, flowDivergences)
                    ? "100%"
                    : TREE_CONFIG.CIRCLE_POSITION
            }
        />
    );
};

export default NodeRelation;
