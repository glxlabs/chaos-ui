export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    }
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
};

export const formatComponentCode = (
  componentName: string,
  props: Record<string, any> = {},
  children?: string
): string => {
  const propString = Object.entries(props)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (typeof value === "boolean") {
        return value ? key : "";
      }
      if (typeof value === "string") {
        return `${key}="${value}"`;
      }
      return `${key}={${JSON.stringify(value)}}`;
    })
    .filter(Boolean)
    .join(" ");

  const openingTag = `<${componentName}${propString ? ` ${propString}` : ""}`;

  if (children) {
    return `${openingTag}>\n  ${children}\n</${componentName}>`;
  } else {
    return `${openingTag} />`;
  }
};

export const formatFullComponentCode = (
  componentName: string,
  imports: string[] = [],
  props: Record<string, any> = {},
  children?: string
): string => {
  const importStatements =
    imports.length > 0
      ? imports.map(imp => `import ${imp} from "@glitchlabs/chaosui";`).join("\n") + "\n\n"
      : "";

  const componentCode = formatComponentCode(componentName, props, children);

  return `${importStatements}export default function Example() {
  return (
    ${componentCode}
  );
}`;
};

export const getComponentImportPath = (componentName: string): string => {
  return `import { ${componentName} } from "@glitchlabs/chaosui";`;
};

export const generateComponentSnippet = (
  componentName: string,
  variant?: string,
  size?: string,
  additionalProps?: Record<string, any>
): string => {
  const baseProps = {
    ...(variant && { variant }),
    ...(size && { size }),
    ...additionalProps,
  };

  return formatFullComponentCode(
    componentName,
    [componentName],
    baseProps,
    getDefaultChildren(componentName)
  );
};

const getDefaultChildren = (componentName: string): string | undefined => {
  const childrenMap: Record<string, string> = {
    Button: "Click me",
    Alert: "This is an alert message",
    Card: "Card content goes here",
    Badge: "Badge",
    Typography: "Typography text",
    Modal: "Modal content",
    Tooltip: "Tooltip content",
    Tabs: "Tab content",
    Accordion: "Accordion content",
  };

  return childrenMap[componentName];
};
