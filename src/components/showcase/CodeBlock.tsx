import React, { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
  maxHeight?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  title,
  showLineNumbers = true,
  className = "",
  maxHeight = "400px",
}) => {
  const { copied, copy } = useCopyToClipboard();
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = async () => {
    await copy(code);
  };

  const lines = code.split("\n");
  const displayCode = collapsed
    ? lines.slice(0, 10).join("\n") + "\n... " + (lines.length - 10) + " more lines"
    : code;

  return (
    <div className={cn("brutal-component border-cyber-green bg-cyber-dark", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-brutal-3 border-b border-cyber-green bg-cyber-black">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyber-green" />
          <span className="text-sm font-mono text-cyber-green">
            {title || language.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {lines.length > 10 && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="px-2 py-1 text-xs font-mono text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors"
            >
              {collapsed ? "Show All" : "Collapse"}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="overflow-auto scrollbar-brutal" style={{ maxHeight }}>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {displayCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
