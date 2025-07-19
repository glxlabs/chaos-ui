import { useState, useCallback } from "react";
import { copyToClipboard } from "../utils/copy-to-clipboard";

export interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

export const useCopyToClipboard = (resetDelay: number = 2000): UseCopyToClipboardReturn => {
  const [copied, setCopied] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const copy = useCallback(
    async (text: string): Promise<void> => {
      try {
        const success = await copyToClipboard(text);

        if (success) {
          setCopied(true);

          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          const newTimeoutId = setTimeout(() => {
            setCopied(false);
            setTimeoutId(null);
          }, resetDelay);

          setTimeoutId(newTimeoutId);
        }
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
    },
    [resetDelay, timeoutId]
  );

  const reset = useCallback(() => {
    setCopied(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  return { copied, copy, reset };
};

export const useComponentCopy = () => {
  const { copied, copy, reset } = useCopyToClipboard();

  const copyComponent = useCallback(
    async (componentName: string, props: Record<string, any> = {}, children?: string) => {
      const { formatFullComponentCode } = await import("../utils/copy-to-clipboard");
      const code = formatFullComponentCode(componentName, [componentName], props, children);
      await copy(code);
    },
    [copy]
  );

  return { copied, copyComponent, reset };
};
