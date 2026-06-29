import type React from "react";
import "./KeyboardNavigation.css";

interface KeyboardNavigationProps {
  children?: React.ReactNode;
  enabled?: boolean;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({
  children = <></>,
  enabled = true,
  onArrowUp = () => {},
  onArrowDown = () => {},
  onArrowLeft = () => {},
  onArrowRight = () => {},
}) => {
  /**
   * Handles arrow press within the children..
   * @param event The keyboard event.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (!enabled) return;

    switch (event.key) {
      case "ArrowUp":
        onArrowUp();
        break;
      case "ArrowDown":
        onArrowDown();
        break;
      case "ArrowLeft":
        onArrowLeft();
        break;
      case "ArrowRight":
        onArrowRight();
        break;
    }
  };

  return (
    <div className="keyboard-navigation" tabIndex={0} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
};

export default KeyboardNavigation;
