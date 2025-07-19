import React from "react";
import { cn } from "../../utils/cn";
import { PropInfo } from "../../utils/component-registry";

interface PropsTableProps {
  props: PropInfo[];
  className?: string;
}

export const PropsTable: React.FC<PropsTableProps> = ({ props, className = "" }) => {
  if (props.length === 0) {
    return (
      <div
        className={cn("brutal-component border-cyber-green bg-cyber-dark p-brutal-6", className)}
      >
        <div className="text-center text-cyber-gray">No props available for this component.</div>
      </div>
    );
  }

  return (
    <div
      className={cn("brutal-component border-cyber-green bg-cyber-dark overflow-hidden", className)}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cyber-black">
            <tr>
              <th className="text-left p-brutal-3 border-b border-cyber-green text-cyber-green font-mono font-bold">
                PROP
              </th>
              <th className="text-left p-brutal-3 border-b border-cyber-green text-cyber-green font-mono font-bold">
                TYPE
              </th>
              <th className="text-left p-brutal-3 border-b border-cyber-green text-cyber-green font-mono font-bold">
                DEFAULT
              </th>
              <th className="text-left p-brutal-3 border-b border-cyber-green text-cyber-green font-mono font-bold">
                DESCRIPTION
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => (
              <tr
                key={prop.name}
                className={cn(
                  "border-b border-cyber-green/20 hover:bg-cyber-green/5 transition-colors",
                  index % 2 === 0 ? "bg-cyber-dark" : "bg-cyber-black/50"
                )}
              >
                <td className="p-brutal-3 align-top">
                  <div className="flex items-center gap-2">
                    <code className="text-cyber-white font-mono font-semibold">{prop.name}</code>
                    {prop.required && (
                      <span className="text-xs px-1 py-0.5 bg-cyber-magenta text-cyber-black font-mono font-bold rounded-none">
                        REQ
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-brutal-3 align-top">
                  <code className="text-cyber-green font-mono text-sm">
                    {formatType(prop.type)}
                  </code>
                  {prop.options && (
                    <div className="mt-1 space-y-1">
                      {prop.options.map((option, optIndex) => (
                        <div key={optIndex} className="text-xs text-cyber-gray font-mono">
                          "{option}"
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-brutal-3 align-top">
                  {prop.default !== undefined ? (
                    <code className="text-brutal-yellow font-mono text-sm">
                      {formatDefaultValue(prop.default)}
                    </code>
                  ) : (
                    <span className="text-cyber-gray font-mono text-sm">-</span>
                  )}
                </td>
                <td className="p-brutal-3 align-top">
                  <div className="text-cyber-white text-sm">{prop.description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatType = (type: string): string => {
  if (type.includes("|")) {
    return type
      .split("|")
      .map(t => t.trim())
      .join(" | ");
  }

  if (type.includes("<") && type.includes(">")) {
    return type;
  }

  return type;
};

const formatDefaultValue = (value: any): string => {
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (typeof value === "boolean") {
    return value.toString();
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (value === null) {
    return "null";
  }
  if (value === undefined) {
    return "undefined";
  }
  if (Array.isArray(value)) {
    return `[${value.map(formatDefaultValue).join(", ")}]`;
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
};

export default PropsTable;
