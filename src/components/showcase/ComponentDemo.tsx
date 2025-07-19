import React, { useState } from "react";
import { Eye, Code, Copy, Check, Settings, RotateCcw } from "lucide-react";
import { cn } from "../../utils/cn";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import CodeBlock from "./CodeBlock";

interface ComponentDemoProps {
  title: string;
  description?: string;
  component: React.ReactNode;
  code: string;
  className?: string;
  controls?: React.ReactNode;
  variants?: { name: string; component: React.ReactNode; code: string }[];
  darkMode?: boolean;
  showGrid?: boolean;
  fullWidth?: boolean;
}

export const ComponentDemo: React.FC<ComponentDemoProps> = ({
  title,
  description,
  component,
  code,
  className = "",
  controls,
  variants = [],
  darkMode = true,
  showGrid = false,
  fullWidth = false,
}) => {
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [previewDarkMode, setPreviewDarkMode] = useState(darkMode);
  const { copied, copy } = useCopyToClipboard();

  const currentVariant = variants.length > 0 ? variants[selectedVariant] : null;
  const currentComponent = currentVariant ? currentVariant.component : component;
  const currentCode = currentVariant ? currentVariant.code : code;

  const handleCopy = async () => {
    await copy(currentCode);
  };

  const resetDemo = () => {
    setSelectedVariant(0);
    setViewMode("preview");
    setPreviewDarkMode(darkMode);
    setShowControls(false);
  };

  return (
    <div className={cn("brutal-component border-cyber-green bg-cyber-dark", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-brutal-4 border-b border-cyber-green bg-cyber-black">
        <div className="flex-1">
          <h3 className="text-lg font-brutalist font-bold text-cyber-green uppercase">{title}</h3>
          {description && <p className="text-sm text-cyber-gray mt-1">{description}</p>}
        </div>

        <div className="flex items-center gap-2">
          {variants.length > 0 && (
            <select
              value={selectedVariant}
              onChange={e => setSelectedVariant(parseInt(e.target.value))}
              className="px-2 py-1 text-xs font-mono bg-cyber-black text-cyber-green border border-cyber-green focus:outline-none focus:ring-2 focus:ring-cyber-green"
            >
              {variants.map((variant, index) => (
                <option key={index} value={index}>
                  {variant.name}
                </option>
              ))}
            </select>
          )}

          {controls && (
            <button
              onClick={() => setShowControls(!showControls)}
              className={cn(
                "p-1 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors",
                showControls && "bg-cyber-green text-cyber-black"
              )}
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={resetDemo}
            className="p-1 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex border border-cyber-green">
            <button
              onClick={() => setViewMode("preview")}
              className={cn(
                "p-1 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors",
                viewMode === "preview" && "bg-cyber-green text-cyber-black"
              )}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={cn(
                "p-1 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors border-l border-cyber-green",
                viewMode === "code" && "bg-cyber-green text-cyber-black"
              )}
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-1 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Controls */}
      {showControls && controls && (
        <div className="p-brutal-4 border-b border-cyber-green bg-cyber-black/50">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-cyber-green">CONTROLS:</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm font-mono text-cyber-white">
                <input
                  type="checkbox"
                  checked={previewDarkMode}
                  onChange={e => setPreviewDarkMode(e.target.checked)}
                  className="w-4 h-4"
                />
                Dark Mode
              </label>
              <label className="flex items-center gap-2 text-sm font-mono text-cyber-white">
                <input type="checkbox" checked={showGrid} onChange={() => {}} className="w-4 h-4" />
                Show Grid
              </label>
            </div>
          </div>
          <div className="mt-brutal-3">{controls}</div>
        </div>
      )}

      {/* Content */}
      <div className="min-h-[200px]">
        {viewMode === "preview" ? (
          <div
            className={cn(
              "p-brutal-6 flex items-center justify-center",
              previewDarkMode
                ? "bg-cyber-black text-cyber-white"
                : "bg-cyber-white text-cyber-black",
              showGrid && "brutal-grid"
            )}
          >
            <div className={cn("w-full", fullWidth ? "max-w-full" : "max-w-md")}>
              {currentComponent}
            </div>
          </div>
        ) : (
          <CodeBlock
            code={currentCode}
            language="tsx"
            showLineNumbers={true}
            className="border-0 rounded-none"
          />
        )}
      </div>

      {/* Variants */}
      {variants.length > 0 && (
        <div className="border-t border-cyber-green bg-cyber-black/50">
          <div className="p-brutal-3">
            <span className="text-sm font-mono text-cyber-green">VARIANTS:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(index)}
                  className={cn(
                    "px-3 py-1 text-xs font-mono border transition-colors",
                    selectedVariant === index
                      ? "bg-cyber-green text-cyber-black border-cyber-green"
                      : "bg-transparent text-cyber-green border-cyber-green hover:bg-cyber-green hover:text-cyber-black"
                  )}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;
