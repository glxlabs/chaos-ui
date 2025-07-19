# Installation Guide

## Quick Start

ChaoS/UI is a brutalist React component library built with TypeScript and Tailwind CSS. Get up and running in minutes.

## Prerequisites

- Node.js 16.0 or higher
- React 18.0 or higher
- TypeScript 4.5 or higher

## Installation

### 1. Install Dependencies

```bash
npm install tailwindcss @tailwindcss/forms
npm install lucide-react
npm install clsx
```

### 2. Configure Tailwind CSS

Add ChaoS/UI design tokens to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#000000",
          white: "#ffffff",
          green: "#00ff41",
          "green-bright": "#39ff14",
          magenta: "#ff006e",
          gray: "#808080",
          dark: "#111111",
        },
      },
      fontFamily: {
        brutalist: ["Courier New", "monospace"],
      },
      spacing: {
        "brutal-1": "0.25rem",
        "brutal-2": "0.5rem",
        "brutal-3": "0.75rem",
        "brutal-4": "1rem",
        "brutal-5": "1.25rem",
        "brutal-6": "1.5rem",
        "brutal-8": "2rem",
      },
      borderWidth: {
        brutal: "3px",
      },
      boxShadow: {
        brutal: "6px 6px 0px #00ff41",
        "brutal-hover": "8px 8px 0px #00ff41",
        "brutal-magenta": "6px 6px 0px #ff006e",
      },
    },
  },
  plugins: [],
};
```

### 3. Add Global Styles

Create or update your CSS file with ChaoS/UI base styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-cyber-green;
  }

  html {
    @apply font-brutalist;
    scroll-behavior: smooth;
  }

  body {
    @apply bg-cyber-black text-cyber-white antialiased;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }
}

@layer components {
  .brutal-component {
    @apply border-brutal border-cyber-green shadow-brutal;
  }
}
```

### 4. Copy Components

Browse the component library, find the components you need, and copy-paste them into your project. Each component is self-contained and includes its own TypeScript interfaces.

### 5. Utility Functions

You'll need these utility functions:

#### `src/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

#### `src/hooks/use-copy-to-clipboard.ts`

```typescript
import { useState } from "react";

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return { copied, copy };
};
```

## Verifying Installation

Test your setup with a simple button:

```tsx
import React from "react";

const Button = ({ children, ...props }) => (
  <button
    className="px-brutal-6 py-brutal-3 border-brutal border-cyber-green bg-cyber-green text-cyber-black font-brutalist font-bold uppercase tracking-wide transition-all duration-200 hover:shadow-brutal-hover active:translate-x-1 active:translate-y-1 active:shadow-none"
    {...props}
  >
    {children}
  </button>
);

export default function App() {
  return (
    <div className="p-8 bg-cyber-black min-h-screen">
      <Button>CHAOS BUTTON</Button>
    </div>
  );
}
```

## Next Steps

- Check out the [Design Philosophy](./design-philosophy.md) to understand ChaoS/UI principles
- Read the [Customization Guide](./customization.md) to modify components
- Browse [Usage Examples](./usage-examples.md) for real-world patterns

## Troubleshooting

### Styles Not Applying

- Ensure Tailwind CSS is properly configured
- Check that your content paths include component files
- Verify custom design tokens are in your config

### TypeScript Errors

- Install `@types/react` and `@types/react-dom`
- Ensure TypeScript version compatibility
- Check component prop interfaces

### Components Not Rendering

- Verify React version compatibility
- Check for missing dependencies (lucide-react, clsx)
- Ensure proper import paths

Need help? Check our [Contributing Guidelines](./contributing.md) for support options.
