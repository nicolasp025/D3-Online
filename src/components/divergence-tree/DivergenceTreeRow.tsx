import { useDivergenceTree } from "../../contexts/DivergenceTreeContext";
import type { D3StackFrame } from "../../models/stack";
import EndDivergenceDiagonal from "./edges/EndDivergenceDiagonal";
import NodeRelation from "./edges/NodeRelation";
import StartDivergenceDiagonal from "./edges/StartDivergenceDiagonal";
import DivergenceNode from "./nodes/DivergenceNode";
import TreeNode from "./nodes/TreeNode";
import MonacoDiffEditor from "../monaco/MonacoDiffEditor";

interface DivergenceTreeRowProps {
    index: number;
    frame: D3StackFrame | null;
    modifiedFrame: D3StackFrame | null;
    hasPrevious: boolean;
    hasNext: boolean;
    isInDivergence: boolean;
}

const DivergenceTreeRow: React.FC<DivergenceTreeRowProps> = ({
    index,
    frame,
    modifiedFrame,
    hasPrevious,
    hasNext,
    isInDivergence,
}) => {
    const { selectedRow, setSelectedRow, selectedRef } = useDivergenceTree();

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
                    <DivergenceNode frame={modifiedFrame} />
                </>
            );
        }

        return (
            <>
                {!hasPrevious && <StartDivergenceDiagonal />}
                {!hasNext && <EndDivergenceDiagonal />}
                <NodeRelation hasPrevious={hasPrevious} hasNext={hasNext} />
                <DivergenceNode frame={frame} />
            </>
        );
    };

    return (
        <div
            ref={selectedRow === index ? selectedRef : null}
            className={selectedRow === index ? "tree-row selected" : "tree-row"}
        >
            <div
                className="tree-svg-wrapper"
                onClick={() => {
                    if (selectedRow === index) setSelectedRow(null);
                    else setSelectedRow(index);
                }}
            >
                <svg>
                    {isInDivergence && buildRowSvg()}
                    <TreeNode frame={frame} />
                </svg>
            </div>

            <div className="tree-row-content">
                <div
                    className="tree-row-label"
                    onClick={() => {
                        if (selectedRow === index) setSelectedRow(null);
                        else setSelectedRow(index);
                    }}
                >
                    {frame == null ? "null" : frame.position}
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
