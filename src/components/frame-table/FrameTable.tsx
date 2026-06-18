import { useEffect, useRef } from "react";
import type { D3StackFrame } from "../../models/stack";
import "./FrameTable.css";
import type {
  DivergencePosition,
  D3FlowDivergence,
} from "../../models/divergence";
import FrameTableItem from "./FrameTableItem";

interface FrameTableProps {
  frames: D3StackFrame[];
  selectedPosition: number;
  getDivergencePosition: (
    divergence: D3FlowDivergence,
  ) => DivergencePosition | number;
  prefixColor: string;
}

const FrameTable: React.FC<FrameTableProps> = ({
  frames,
  selectedPosition,
  getDivergencePosition,
  prefixColor,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [selectedPosition]);

  return (
    <div className="frame-table">
      {frames.length > 0 &&
        frames.map((frame: D3StackFrame, index: number) => (
          <FrameTableItem
            key={`frame-${frame.id}`}
            ref={selectedPosition == index ? selectedRef : null}
            frame={frame}
            prefixColor={prefixColor}
            getDivergencePosition={getDivergencePosition}
            selected={index == selectedPosition}
            index={index}
          />
        ))}
    </div>
  );
};

export default FrameTable;
