import { useDivergenceTree } from "../../contexts/DivergenceTreeContext";
import type { D3StackFrame } from "../../models/stack";
import EndDivergenceDiagonal from "./edges/EndDivergenceDiagonal";
import NodeRelation from "./edges/NodeRelation";
import StartDivergenceDiagonal from "./edges/StartDivergenceDiagonal";
import DivergenceNode from "./nodes/DivergenceNode";
import TreeNode from "./nodes/TreeNode";
import MonacoDiffEditor from "../monaco/MonacoDiffEditor";
import type { D3FlowDivergence } from "../../models/divergence";
import { getLengthDifference } from "./tree-util";

interface DivergenceTreeRowProps {
    index: number;
    frame: D3StackFrame | null;
    modifiedFrame: D3StackFrame | null;
    hasPrevious: boolean;
    hasNext: boolean;
    isStateDivergence: boolean;
    flowDivergence: D3FlowDivergence | null;
}

/**
 * If the frame is null, that means we are in the case where the divergence is longer than the original path,
 * so we display a row where there is not any node on the original path, but there is a node on the divergence path.
 */
const DivergenceTreeRow: React.FC<DivergenceTreeRowProps> = ({
    index,
    frame,
    modifiedFrame,
    hasPrevious,
    hasNext,
    isStateDivergence,
    flowDivergence,
}) => {
    const { selectedRow, setSelectedRow, selectedRef } = useDivergenceTree();

    const isInDivergence = frame == null ? true : flowDivergence != null;

    /**
     * Returns the svg for the row.
     * @returns A ReactNode element.
     */
    const buildRowSvg = () => {
        if (frame == null) {
            return (
                <>
                    <NodeRelation hasPrevious={hasPrevious} hasNext={hasNext} />
                    {!hasNext && <EndDivergenceDiagonal />}
                    <DivergenceNode isStateDiv={isStateDivergence} />
                </>
            );
        }

        /*
         * In the case where the divergence is shorter than
         * the original path, we need to verify we don't excess the number of nodes in the divergence.
         */
        const noDivergenceNode =
            getLengthDifference(flowDivergence) > 0 &&
            index - flowDivergence.modifiedPosition.start >
            flowDivergence.modifiedPosition.stop -
            flowDivergence.modifiedPosition.start;

        return (
            <>
                {!hasPrevious && <StartDivergenceDiagonal />}
                {!hasNext && <EndDivergenceDiagonal />}
                <NodeRelation hasPrevious={hasPrevious} hasNext={hasNext} />
                {!noDivergenceNode && <DivergenceNode isStateDiv={isStateDivergence} />}
            </>
        );
    };

    /**
     * Changes the selected row when clicked.
     */
    const handleClickOnRow = () => {
        if (selectedRow === index) setSelectedRow(null);
        else setSelectedRow(index);
    };

    return (
        <div
            ref={selectedRow === index ? selectedRef : null}
            className={selectedRow === index ? "tree-row selected" : "tree-row"}
        >
            <svg className="tree-svg-wrapper" onClick={handleClickOnRow}>
                {frame != null && <TreeNode isStateDiv={isStateDivergence} />}
                {isInDivergence && buildRowSvg()}
            </svg>

            <div className="tree-row-content">
                <div className="tree-row-label" onClick={handleClickOnRow}>
                    {isInDivergence && !hasPrevious && flowDivergence.displayName}
                </div>
                {selectedRow === index && (
                    <MonacoDiffEditor
                        original={frame?.sourceCode ?? ""}
                        modified={modifiedFrame?.sourceCode ?? ""}
                    />
                )}
            </div>
        </div>
    );
};

export default DivergenceTreeRow;
