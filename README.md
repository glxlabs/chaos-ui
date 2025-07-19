# ChaoS/UI

> A brutalist React component library that embraces bold, unapologetic design.

[![npm version](https://badge.fury.io/js/@glitchlabs%2Fchaosui.svg)](https://badge.fury.io/js/@glitchlabs%2Fchaosui)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is ChaoS/UI?

ChaoS/UI is a brutalist React component library that rejects subtle design trends in favor of:

- **Sharp, angular edges** - No rounded corners
- **High contrast colors** - Pure black, cyber green (#00ff41), shocking magenta (#ff006e)
- **Heavy borders** - 3px minimum for aggressive visual hierarchy
- **Monospace typography** - Terminal-inspired aesthetics
- **Bold shadows** - Geometric depth without blur

## Quick Start

### Installation

```bash
npm install @glitchlabs/chaosui
```

### Setup

1. **Install required peer dependencies:**

```bash
npm install react react-dom lucide-react
```

2. **Configure Tailwind CSS** with ChaoS/UI design tokens:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@glitchlabs/chaosui/dist/**/*.{js,ts,jsx,tsx}",
  ],
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

3. **Import styles** in your app (REQUIRED):

```tsx
// Import this ONCE in your main entry file (src/main.tsx or src/index.tsx)
import "@glitchlabs/chaosui/style";
```

> ⚠️ **Important**: The styles import is REQUIRED for proper brutalist styling. Without it, components will use default browser styling and look plain.

### Basic Usage

```tsx
import { Button, Card, Input, Label } from "@glitchlabs/chaosui";
import "@glitchlabs/chaosui/style"; // Required for brutal styling

function App() {
  return (
    <div className="p-8 bg-cyber-black min-h-screen">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-brutalist font-bold uppercase text-cyber-green mb-6">LOGIN</h1>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">EMAIL</Label>
            <Input id="email" type="email" placeholder="user@example.com" className="w-full" />
          </div>

          <Button variant="primary" className="w-full">
            SIGN IN
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

## Components

### Form Elements

- **Button** - Primary, secondary, destructive, ghost variants
- **Input** - Text inputs with brutal styling
- **TextArea** - Multi-line inputs
- **Select** - Dropdown selects
- **Checkbox** - Large, chunky checkboxes
- **Radio** - Bold radio button groups
- **Switch** - Toggle switches
- **Label** - Bold, uppercase form labels

### Layout & Structure

- **Card** - Containers with signature brutalist shadows
- **Container** - Responsive containers
- **Grid** - CSS Grid layouts
- **Stack** - Vertical and horizontal stacks
- **Separator** - Bold dividers
- **Spacer** - Consistent spacing

### Feedback & Status

- **Alert** - Notifications with strong visual presence
- **Badge** - Status indicators and tags
- **Progress** - Progress bars and loading indicators
- **Skeleton** - Loading placeholders
- **Spinner** - Loading spinners
- **Toast** - Notification toasts

### Interactive & Overlay

- **Modal** - Full-screen overlays
- **Dropdown** - Context menus and action lists
- **Tabs** - Navigation tabs
- **Accordion** - Collapsible content sections
- **Tooltip** - Hover information
- **Popover** - Positioned overlays

### Data Display

- **Table** - Data tables with sortable headers
- **List** - Styled lists
- **Typography** - Heading, paragraph, and text components
- **Avatar** - User profile images
- **EmptyState** - No data placeholders
- **Stats** - Statistical displays

### Navigation

- **Breadcrumb** - Navigation path indicators
- **Pagination** - Page navigation controls
- **Menu** - Navigation menus

## Design Philosophy

ChaoS/UI embraces **Brutalist Design Principles**:

1. **Function over Form** - Every visual element serves a purpose
2. **Bold Visual Hierarchy** - Size and contrast create clear importance
3. **High Accessibility** - Extreme contrast exceeds WCAG standards
4. **Geometric Precision** - Sharp edges and consistent spacing
5. **Uncompromising Aesthetics** - No subtle design concessions

## Advanced Usage

### Custom Theming

```tsx
// Override default colors
const customTheme = {
  colors: {
    primary: "#00ddff",
    secondary: "#ff4400",
    background: "#0a0a0a",
  },
};
```

### Component Customization

```tsx
// Extend existing components
const CustomButton = ({ children, ...props }) => (
  <Button className="border-cyber-magenta shadow-brutal-magenta" {...props}>
    {children}
  </Button>
);
```

## TypeScript Support

ChaoS/UI is built with TypeScript and provides full type definitions:

```tsx
import { ButtonProps, CardProps } from "@glitchlabs/chaosui";

interface MyComponentProps extends ButtonProps {
  customProp: string;
}
```

## Troubleshooting

### Components Look Plain/Unstyled

**Problem**: Components appear with default browser styling instead of brutal design.

**Solution**: Make sure you've imported the styles:

```tsx
// ✅ Correct - Import styles in your main file
import "@glitchlabs/chaosui/style";
import "./your-app.css"; // Your styles should come after

// ❌ Wrong - Missing styles import
import { Button } from "@glitchlabs/chaosui"; // Will look plain
```

### Tailwind Classes Not Working

**Problem**: Custom classes like `bg-cyber-black` don't work.

**Solution**: Add ChaoS/UI to your Tailwind content paths:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@glitchlabs/chaosui/dist/**/*.{js,ts,jsx,tsx}", // Add this line
  ],
  // ... rest of config
};
```

### React Version Conflicts

**Problem**: `ReactCurrentDispatcher` errors or components not rendering.

**Solution**: ChaoS/UI supports React 18 and 19. Install with:

```bash
npm install @glitchlabs/chaosui --legacy-peer-deps
```

## Documentation

- 📚 [Installation Guide](./docs/installation.md)
- 🎨 [Design Philosophy](./docs/design-philosophy.md)
- ⚙️ [Customization Guide](./docs/customization.md)
- 💡 [Usage Examples](./docs/usage-examples.md)
- 🤝 [Contributing Guidelines](./docs/contributing.md)

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](./docs/contributing.md) before submitting PRs.

### Development Setup

```bash
git clone https://github.com/GlitchLabs/chaos-ui.git
cd chaos-ui
npm install
npm run dev
```

## License

MIT © [GlitchLabs](https://github.com/GlitchLabs)

---

**Ready to embrace the chaos?** 🔥

_"In chaos, we find order. In brutalism, we find beauty."_
