import { useDivergence } from "../../../contexts/DivergenceContext";
import { TREE_CONFIG } from "../tree-config";
import { getFlowDiv } from "../tree-util";

interface NodeRelationProps {
    index: number;
}

const NodeRelation: React.FC<NodeRelationProps> = ({ index }) => {
    const { flowDivergences } = useDivergence();

    const hasPrevious = getFlowDiv(index - 1, flowDivergences) != null;
    const hasNext = getFlowDiv(index + 1, flowDivergences) != null;

    return (
        <line
            x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y1={hasPrevious ? "-2%" : TREE_CONFIG.CIRCLE_POSITION}
            x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y2={hasNext ? "100%" : TREE_CONFIG.CIRCLE_POSITION}
        />
    );
};

export default NodeRelation;
