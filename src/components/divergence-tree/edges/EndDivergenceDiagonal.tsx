import { TREE_CONFIG } from "../../../config/tree-config";

/**
 * Returns the template for the / diagonal (starting from the point on right top).
 * @returns A jsx element.
 */
const EndDivergenceDiagonal = () => {
  /**
   * All this is just for a good visual connection when there is no node
   * on the last position in divergence.
   */
  const dx = TREE_CONFIG.SPACE_BETWEEN;
  const dy =
    TREE_CONFIG.SPACE_BETWEEN +
    TREE_CONFIG.ANGLE_CORRECTOR -
    TREE_CONFIG.OFFSET +
    1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const extension = 1 / length;

  return (
    <line
      x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN + dx * extension}
      y1={TREE_CONFIG.CIRCLE_POSITION - 1 - dy * extension}
      x2={TREE_CONFIG.LINE_X}
      y2={
        TREE_CONFIG.CIRCLE_POSITION +
        TREE_CONFIG.SPACE_BETWEEN +
        TREE_CONFIG.ANGLE_CORRECTOR -
        TREE_CONFIG.OFFSET
      }
      strokeWidth={TREE_CONFIG.LINE_WIDTH}
    />
  );
};

export default EndDivergenceDiagonal;
