import type React from "react";
import { useEffect } from "react";

interface ScrollWrapperProps {
  dependsOn: any;
  dependenceRef: React.RefObject<any>;
  children?: React.ReactNode;
  type?: "start" | "end" | "center";
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({
  dependsOn,
  dependenceRef,
  children = <></>,
  type = "center",
}) => {
  useEffect(() => {
    dependenceRef.current?.scrollIntoView({
      block: type,
      behavior: "smooth",
    });
  }, [dependsOn]);

  return <>{children}</>;
};

export default ScrollWrapper;
