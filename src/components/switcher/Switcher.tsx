import { useState, useRef, useEffect } from "react";
import "./Switcher.css";

interface SwitcherProps<T> {
  items: T[];
  onChange: (item: T) => void;
  renderLabel: (item: T) => string;
}

const Switcher = <T,>({ items, onChange, renderLabel }: SwitcherProps<T>) => {
  if (items.length == 0) return <></>;

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const [selectedItem, setSelectedItem] = useState<T>(items[0]);

  useEffect(() => {
    const containerElement = containerRef.current;
    const selectedElement = selectedItemRef.current;

    if (!selectedElement || !containerElement) return;

    const containerRect = containerElement.getBoundingClientRect();
    const selectedRect = selectedElement.getBoundingClientRect();

    setIndicatorStyle({
      left: selectedRect.left - containerRect.left,
      width: selectedRect.width,
    });
  }, [selectedItem]);

  return (
    <div className="switcher-container" ref={containerRef}>
      <div
        className="switcher-indicator"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />

      <div className="switcher-items">
        {items.map((item, index) => (
          <div
            className="switcher-item"
            key={index}
            ref={item == selectedItem ? selectedItemRef : null}
            onClick={() => {
              setSelectedItem(item);
              onChange(item);
            }}
          >
            {renderLabel(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Switcher;
