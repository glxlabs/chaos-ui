import React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../../utils/cn";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";

interface CopyButtonProps {
  text: string;
  variant?: "default" | "compact" | "ghost";
  label?: string;
  className?: string;
  onCopy?: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  variant = "default",
  label = "Copy",
  className = "",
  onCopy,
}) => {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = async () => {
    await copy(text);
    onCopy?.();
  };

  const baseClasses =
    "inline-flex items-center gap-2 font-mono font-bold uppercase transition-all duration-200";

  const variantClasses = {
    default:
      "px-brutal-4 py-brutal-2 border-brutal border-cyber-green bg-transparent text-cyber-green hover:bg-cyber-green hover:text-cyber-black hover:shadow-brutal-hover active:translate-x-1 active:translate-y-1 active:shadow-none",
    compact: "p-1 text-cyber-green hover:bg-cyber-green hover:text-cyber-black",
    ghost: "p-1 text-cyber-green hover:text-cyber-green-bright",
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(baseClasses, variantClasses[variant], className)}
      title={copied ? "Copied!" : `Copy ${label}`}
    >
      {copied ? <Check className="w-4 h-4 text-cyber-green" /> : <Copy className="w-4 h-4" />}
      {variant === "default" && <span className="text-sm">{copied ? "Copied!" : label}</span>}
    </button>
  );
};

export const ComponentCopyButton: React.FC<{
  componentName: string;
  props?: Record<string, any>;
  children?: string;
  variant?: "default" | "compact" | "ghost";
  className?: string;
}> = ({ componentName, props = {}, children, variant = "default", className = "" }) => {
  const generateCode = async () => {
    const module = await import("../../utils/copy-to-clipboard");
    return module.formatFullComponentCode(componentName, [componentName], props, children);
  };

  return (
    <CopyButton
      text={""}
      variant={variant}
      label="Copy Component"
      className={className}
      onCopy={async () => {
        const code = await generateCode();
        navigator.clipboard.writeText(code);
      }}
    />
  );
};

export const CodeCopyButton: React.FC<{
  code: string;
  language?: string;
  variant?: "default" | "compact" | "ghost";
  className?: string;
}> = ({ code, language = "tsx", variant = "compact", className = "" }) => {
  return (
    <CopyButton
      text={code}
      variant={variant}
      label={`Copy ${language.toUpperCase()}`}
      className={className}
    />
  );
};

export const InstallCopyButton: React.FC<{
  packageName?: string;
  command?: string;
  variant?: "default" | "compact" | "ghost";
  className?: string;
}> = ({ packageName = "@chaos/ui", command, variant = "default", className = "" }) => {
  const installCommand = command || `npm install ${packageName}`;

  return (
    <CopyButton
      text={installCommand}
      variant={variant}
      label="Copy Install"
      className={className}
    />
  );
};

export const ImportCopyButton: React.FC<{
  componentName: string;
  packageName?: string;
  variant?: "default" | "compact" | "ghost";
  className?: string;
}> = ({ componentName, packageName = "@chaos/ui", variant = "compact", className = "" }) => {
  const importStatement = `import { ${componentName} } from "${packageName}";`;

  return (
    <CopyButton
      text={importStatement}
      variant={variant}
      label="Copy Import"
      className={className}
    />
  );
};

export default CopyButton;
