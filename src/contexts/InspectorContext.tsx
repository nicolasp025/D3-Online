import { createContext, useState } from "react";
import Inspector from "../components/inspector/Inspector";

type InspectorContextType = {
  openInspectorOn: (obj: any) => void;
};

export const InspectorContext = createContext<InspectorContextType | null>(
  null,
);

export const InspectorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [objects, setObjects] = useState<any[]>([]);

  const openInspectorOn = (obj: any) => {
    setObjects((prev) => [...prev, obj]);
  };

  const closeInspector = () => {
    setObjects((prev) => prev.slice(0, -1));
  };

  return (
    <InspectorContext.Provider value={{ openInspectorOn }}>
      {children}

      {objects[objects.length - 1] && (
        <Inspector
          key={objects.length}
          forObject={objects[objects.length - 1]}
          onClose={closeInspector}
        />
      )}
    </InspectorContext.Provider>
  );
};
