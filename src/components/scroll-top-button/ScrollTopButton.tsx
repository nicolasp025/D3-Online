import { useCallback, useRef, useState } from "react";
import ArrowTop from "../../assets/icons/arrow_top.svg?react";
import "./ScrollTopButton.css";

interface ScrollTopButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({
  className = "",
  children,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = useCallback(() => {
    setShowScrollTop((scrollRef.current?.scrollTop ?? 0) > 300);
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={className} ref={scrollRef} onScroll={handleScroll}>
      {children}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <ArrowTop />
        </button>
      )}
    </div>
  );
};

export default ScrollTopButton;
