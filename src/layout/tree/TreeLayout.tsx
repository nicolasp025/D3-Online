import "./TreeLayout.css";
import { useStacks } from "../../contexts/StacksContext";
import { useEffect, useRef, useState } from "react";

const TreeLayout = () => {
    const CIRCLE_POSITION = 20;
    const DOT_RADIUS = 8;
    const LINE_X = 20;

    // const { divergences, isFlowDivergence } = useDivergence();
    const { originalStack } = useStacks();

    const [selectedFrameIndex, setSelectedFrameIndex] = useState<number | null>(
        null,
    );
    const selectedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        selectedRef.current?.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });
    }, [selectedFrameIndex]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            if (selectedFrameIndex && selectedFrameIndex > 0) {
                setSelectedFrameIndex(selectedFrameIndex - 1);
            }
        } else if (e.key === "ArrowDown") {
            if (
                selectedFrameIndex !== null &&
                selectedFrameIndex < originalStack.frames.length - 1
            ) {
                setSelectedFrameIndex(selectedFrameIndex + 1);
            }
        }
    };

    return (
        <div className="tree-wrapper" tabIndex={0} onKeyDown={handleKeyDown}>
            {originalStack.frames.map((frame, i) => (
                <div
                    key={`tree-row-${i}`}
                    ref={selectedFrameIndex === i ? selectedRef : null}
                    className={
                        selectedFrameIndex === i ? "tree-row selected" : "tree-row"
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
                                if (selectedFrameIndex === i) setSelectedFrameIndex(null);
                                else setSelectedFrameIndex(i);
                            }}
                        >
                            {frame.displayName}
                        </div>
                        {selectedFrameIndex === i && (
                            <span className="tree-row-code">{frame.sourceCode}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default TreeLayout;
