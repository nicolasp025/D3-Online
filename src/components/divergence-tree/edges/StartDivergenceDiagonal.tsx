import { TREE_CONFIG } from "../tree-config";

/**
 * Returns the template for the \ diagonal (starting from the point on right bottom).
 * @returns A jsx element.
 */
const StartDivergenceDiagonal = () => {
    return (
        <line
            x1={TREE_CONFIG.LINE_X}
            y1={
                TREE_CONFIG.CIRCLE_POSITION -
                TREE_CONFIG.SPACE_BETWEEN -
                TREE_CONFIG.ANGLE_CORRECTOR +
                TREE_CONFIG.OFFSET
            }
            x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y2={TREE_CONFIG.CIRCLE_POSITION}
        />
    );
};

export default StartDivergenceDiagonal;
