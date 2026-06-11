import { TREE_CONFIG } from "../tree-config";

/**
 * Returns the template for the / diagonal (starting from the point on right top).
 * @returns A jsx element.
 */
const EndDivergenceDiagonal = () => {
    return (
        <line
            x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y1={TREE_CONFIG.CIRCLE_POSITION}
            x2={TREE_CONFIG.LINE_X}
            y2={
                TREE_CONFIG.CIRCLE_POSITION +
                TREE_CONFIG.SPACE_BETWEEN +
                TREE_CONFIG.ANGLE_CORRECTOR -
                TREE_CONFIG.OFFSET
            }
        />
    );
};

export default EndDivergenceDiagonal;
