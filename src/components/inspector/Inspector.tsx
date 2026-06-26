import { useState } from "react";
import Modal from "../modal/Modal";
import "./Inspector.css";

interface InspectorProps {
    forObject: any | null;
}

const Inspector: React.FC<InspectorProps> = ({ forObject = null }) => {
    const [isOpen, setIsOpen] = useState(true);

    const getTypeString = (obj: any) => {
        if (obj == undefined || obj == null) return obj;
        if (Array.isArray(obj)) return "an Array.";
        if (typeof obj == "object") return `a ${obj.constructor.name}`;
        return typeof obj;
    };

    const formatObjectValue = (obj: any): string => {
        if (obj === null) return "null";
        if (obj === undefined) return "undefined";
        if (Array.isArray(obj))
            return `an Array(...)`;
        if (typeof obj == "object") return `{${Object.entries(obj)
            .map(([key, value]) => `${key}: ${formatObjectValue(value)}`)
            .join(", ")}}`;
        if (typeof obj == "string") return `"${obj}"`;
        return obj.toString();
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="inspector">
                <div className="inspector-header">
                    Inspecting {getTypeString(forObject)}.
                    <div className="inspector-columns">
                        <span>Attribute</span>
                        <span>Value</span>
                    </div>
                </div>
                <div className="inspector-rows">
                    {forObject != null &&
                        Object.entries(forObject).map((entry: any) => (
                            <div className="inspector-row" key={entry}>
                                <span>{entry[0].toString()}</span>
                                <span>{formatObjectValue(entry[1])}</span>
                            </div>
                        ))}
                </div>
            </div>
        </Modal>
    );
};

export default Inspector;
