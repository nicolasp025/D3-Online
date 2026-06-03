import { Resizable } from "re-resizable";

interface ResizableContainerProps {
  children: React.ReactNode;
  initialHeight: number;
}

export function ResizableContainer({ children, initialHeight }: ResizableContainerProps) {
  return (
    <Resizable
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
