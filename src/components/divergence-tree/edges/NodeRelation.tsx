import { TREE_CONFIG } from "../tree-config";

interface NodeRelationProps {
  hasPrevious: boolean;
  hasNext: boolean;
}

const NodeRelation: React.FC<NodeRelationProps> = ({
  hasPrevious,
  hasNext,
}) => {
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
