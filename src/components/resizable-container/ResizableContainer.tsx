import { Resizable } from "re-resizable";

interface ResizableContainerProps {
  children: React.ReactNode;
  initialHeight?: number | string;
}

export function ResizableContainer({
  children,
  initialHeight = "29vh",
}: ResizableContainerProps) {
  return (
    <Resizable
      className="container"
      defaultSize={{ height: initialHeight }}
      enable={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      {children}
    </Resizable>
  );
}
