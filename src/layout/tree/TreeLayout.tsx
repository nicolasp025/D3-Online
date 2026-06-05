import "./TreeLayout.css";
import { useStacks } from "../../contexts/StacksContext";
import { useState } from "react";
import type { D3StackFrame } from "../../models/stack";

const TreeLayout = () => {
    const CIRCLE_POSITION = 20;
    const DOT_RADIUS = 8;
    const LINE_X = 20;

    // const { divergences, isFlowDivergence } = useDivergence();
    const { originalStack } = useStacks();

    const [selectedFrame, setSelectedFrame] = useState<D3StackFrame | null>(null);

    return (
        <div className="tree-wrapper">
            {originalStack.frames.map((frame, i) => (
                <>
                    <div
                        key={`tree-row-${i}`}
                        className={
                            selectedFrame === frame ? "tree-row selected" : "tree-row"
                        }
                    >
                        <div className="tree-svg-wrapper">
                            <svg>
                                <line
                                    x1={LINE_X}
                                    y1={i == 0 ? CIRCLE_POSITION : 0}
                                    x2={LINE_X}
                                    y2={
                                        i == originalStack.frames.length - 1
                                            ? CIRCLE_POSITION
                                            : "100%"
                                    }
                                />
                                <circle cx={LINE_X} cy={CIRCLE_POSITION} r={DOT_RADIUS} />
                            </svg>
                        </div>

                        <div className="tree-row-content">
                            <div
                                className="tree-row-label"
                                onClick={() => {
                                    if (selectedFrame === frame) setSelectedFrame(null);
                                    else setSelectedFrame(frame);
                                }}
                            >
                                {frame.displayName}
                            </div>
                            {selectedFrame === frame && (
                                <span className="tree-row-code">{frame.sourceCode}</span>
                            )}
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
};
export default TreeLayout;
