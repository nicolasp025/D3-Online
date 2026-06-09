import { TREE_CONFIG } from "./tree-config";

/**
 * Returns a tree node with the specified params.
 * @param isStateDiv If true, the node will have the classname state-div.
 * @param defaultClassName If isStateDiv if false, uses that classname.
 * @param cx The X coordinate to display the node at.
 * @returns The tree node with specified params.
 */
export const treeNode = (
    isStateDiv: boolean,
    defaultClassName: string = "",
    cx: number = TREE_CONFIG.LINE_X,
) => {
    return (
        <circle
            className={isStateDiv ? "state-div" : defaultClassName}
            cx={cx}
            cy={TREE_CONFIG.CIRCLE_POSITION}
            r={TREE_CONFIG.DOT_RADIUS}
        />
    );
};

export const divergenceNode = (isStateDiv: boolean) => {
    return treeNode(
        isStateDiv,
        "flow-div",
        TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN,
    );
};

/**
 * Returns the template for the / diagonal (starting from the point on right top).
 * @returns A jsx element.
 */
export const endDivergenceDiagonal = () => {
    return (
        <line
            x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y1={TREE_CONFIG.CIRCLE_POSITION}
            x2={TREE_CONFIG.LINE_X}
            y2={
                TREE_CONFIG.CIRCLE_POSITION +
                TREE_CONFIG.SPACE_BETWEEN +
                TREE_CONFIG.ANGLE_CORRECTOR
            }
        />
    );
};

/**
 * Returns the template for the \ diagonal (starting from the point on right bottom).
 * @returns A jsx element.
 */
export const startDivergenceDiagonal = () => {
    return (
        <line
            x1={TREE_CONFIG.LINE_X}
            y1={
                TREE_CONFIG.CIRCLE_POSITION -
                TREE_CONFIG.SPACE_BETWEEN -
                TREE_CONFIG.ANGLE_CORRECTOR
            }
            x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y2={TREE_CONFIG.CIRCLE_POSITION}
        />
    );
};

/**
 * Returns the template for the vertical relation (used when previous frame was already in a flow divegence).
 * @returns A jsx element.
 */
export const verticalDivergenceTop = () => {
    return (
        <line
            x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y1="0%"
            x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y2={TREE_CONFIG.CIRCLE_POSITION}
        />
    );
};

/**
 * Returns the template for the vertical relation (used when next frame is also in the flow divergence).
 * @returns A jsx element.
 */
export const verticalDivergenceBottom = () => {
    return (
        <line
            x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y1={TREE_CONFIG.CIRCLE_POSITION}
            x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y2="100%"
        />
    );
};
