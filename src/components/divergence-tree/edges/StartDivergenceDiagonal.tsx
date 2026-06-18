import { TREE_CONFIG } from "../../../config/tree-config";

/**
 * Returns the template for the \ diagonal (starting from the point on right bottom).
 * @returns A jsx element.
 */
const StartDivergenceDiagonal = () => {
  /**
   * All this is just for a good visual connection when there is no node
   * on the first position in divergence (which should not happen since node are placed at the start).
   */
  const dx = TREE_CONFIG.SPACE_BETWEEN;
  const dy =
    TREE_CONFIG.SPACE_BETWEEN +
    TREE_CONFIG.ANGLE_CORRECTOR -
    TREE_CONFIG.OFFSET;
  const length = Math.sqrt(dx * dx + dy * dy);
  const extension = 1 / length;

  return (
    <line
      x1={TREE_CONFIG.LINE_X}
      y1={
        TREE_CONFIG.CIRCLE_POSITION -
        TREE_CONFIG.SPACE_BETWEEN -
        TREE_CONFIG.ANGLE_CORRECTOR +
        TREE_CONFIG.OFFSET
      }
      x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN + dx * extension}
      y2={TREE_CONFIG.CIRCLE_POSITION + 1 + dy * extension}
      strokeWidth={TREE_CONFIG.LINE_WIDTH}
    />
  );
};

export default StartDivergenceDiagonal;
