import "./TreeLayout.css";
import { useStacks } from "../../contexts/StacksContext";
import { useState } from "react";
import type { D3StackFrame } from "../../models/stack";

const TreeLayout = () => {
    const ROW_HEIGHT = 40;
    const DOT_RADIUS = 8;
    const LINE_X = 20;

    // const { divergences, isFlowDivergence } = useDivergence();
    const { originalStack } = useStacks();

    const [selectedFrame, setSelectedFrame] = useState<D3StackFrame | null>(null);

    return (
        <div className="tree-wrapper">
            {originalStack.frames.map((frame, i) => (
                <>
                    <div className="tree-row" key={i}>
                        <div className="tree-svg-wrapper">
                            <svg className="line">
                                <line
                                    x1={LINE_X}
                                    y1={i == 0 ? ROW_HEIGHT / 2 : 0}
                                    x2={LINE_X}
                                    y2={
                                        i == originalStack.frames.length - 1
                                            ? ROW_HEIGHT / 2
                                            : "100%"
                                    }
                                    stroke="var(--color-font)"
                                    strokeWidth={3}
                                />
                            </svg>
                            <svg className="circle">
                                <circle
                                    cx={LINE_X}
                                    cy={ROW_HEIGHT / 2}
                                    r={DOT_RADIUS}
                                    fill="var(--color-primary)"
                                    stroke="var(--color-background)"
                                    strokeWidth={2}
                                />
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
