# Customization Guide

## Overview

ChaoS/UI components are built with customization in mind. Modify colors, spacing, typography, and behavior to match your project's needs while maintaining the brutalist aesthetic.

## Design Token System

### Color Customization

Override the default cyber color palette in your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        cyber: {
          // Primary colors
          black: "#0a0a0a", // Softer black
          white: "#f5f5f5", // Off-white
          green: "#00dd35", // Custom green
          magenta: "#e600cc", // Custom magenta

          // Extended palette
          blue: "#0066ff", // Add blue accent
          yellow: "#ffcc00", // Add yellow accent
          red: "#ff0040", // Add red accent

          // Grayscale
          gray: "#666666",
          "gray-light": "#999999",
          "gray-dark": "#333333",

          // Variations
          "green-bright": "#33ff55",
          "green-dark": "#008822",
          dark: "#1a1a1a",
        },
      },
    },
  },
};
```

### Spacing Customization

Modify the brutalist spacing scale:

```js
module.exports = {
  theme: {
    extend: {
      spacing: {
        // Tighter spacing
        "brutal-0.5": "0.125rem", // 2px
        "brutal-1.5": "0.375rem", // 6px

        // Extended spacing
        "brutal-10": "2.5rem", // 40px
        "brutal-12": "3rem", // 48px
        "brutal-16": "4rem", // 64px

        // Custom spacing
        "brutal-xs": "0.5rem",
        "brutal-sm": "1rem",
        "brutal-md": "1.5rem",
        "brutal-lg": "2rem",
        "brutal-xl": "3rem",
      },
    },
  },
};
```

### Typography Customization

Add custom fonts and sizes:

```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Alternative monospace fonts
        brutalist: ["Monaco", "Menlo", "monospace"],
        code: ["Fira Code", "monospace"],

        // Add sans-serif for specific components
        "brutalist-sans": ["Impact", "Arial Black", "sans-serif"],
      },
      fontSize: {
        // Custom font sizes
        "brutal-xs": ["0.75rem", { lineHeight: "1rem" }],
        "brutal-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "brutal-base": ["1rem", { lineHeight: "1.5rem" }],
        "brutal-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "brutal-xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "brutal-2xl": ["1.5rem", { lineHeight: "2rem" }],
        "brutal-3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
};
```

### Shadow Customization

Create custom shadow effects:

```js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        // Variations of brutal shadows
        "brutal-sm": "3px 3px 0px #00ff41",
        brutal: "6px 6px 0px #00ff41",
        "brutal-lg": "9px 9px 0px #00ff41",
        "brutal-xl": "12px 12px 0px #00ff41",

        // Multi-color shadows
        "brutal-rainbow": "3px 3px 0px #00ff41, 6px 6px 0px #ff006e",
        "brutal-depth": "2px 2px 0px #333, 4px 4px 0px #666, 6px 6px 0px #999",

        // Inset shadows
        "brutal-inset": "inset 3px 3px 0px #00ff41",

        // Color-specific shadows
        "brutal-blue": "6px 6px 0px #0066ff",
        "brutal-red": "6px 6px 0px #ff0040",
        "brutal-yellow": "6px 6px 0px #ffcc00",
      },
    },
  },
};
```

## Component Customization

### Button Variants

Create custom button styles:

```tsx
// Custom button with your color scheme
const CustomButton = ({ variant = "primary", children, ...props }) => {
  const variants = {
    primary: "bg-cyber-blue text-cyber-white border-cyber-blue shadow-brutal-blue",
    danger: "bg-cyber-red text-cyber-white border-cyber-red shadow-brutal-red",
    warning: "bg-cyber-yellow text-cyber-black border-cyber-yellow shadow-brutal-yellow",
  };

  return (
    <button
      className={cn(
        "px-brutal-6 py-brutal-3 border-brutal font-brutalist font-bold uppercase transition-all duration-200 hover:translate-x-1 hover:translate-y-1",
        variants[variant]
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Input Field Customization

Modify input appearance and behavior:

```tsx
const CustomInput = ({ error, success, ...props }) => {
  return (
    <input
      className={cn(
        "px-brutal-4 py-brutal-3 border-brutal bg-cyber-black text-cyber-white font-mono",
        "focus:outline-none focus:ring-0 transition-all duration-200",
        error && "border-cyber-red shadow-brutal-red",
        success && "border-cyber-green shadow-brutal",
        !error && !success && "border-cyber-gray focus:border-cyber-blue"
      )}
      {...props}
    />
  );
};
```

### Card Component Variations

Create different card styles:

```tsx
const CustomCard = ({ variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-cyber-dark border-cyber-green shadow-brutal",
    highlight: "bg-cyber-green text-cyber-black border-cyber-black shadow-brutal-magenta",
    minimal: "bg-cyber-black border-cyber-gray",
    floating: "bg-cyber-dark border-cyber-blue shadow-brutal-lg",
  };

  return (
    <div className={cn("p-brutal-6 border-brutal", variants[variant])} {...props}>
      {children}
    </div>
  );
};
```

## Theme System

### Creating Theme Variants

Build light and dark theme support:

```css
/* Light theme overrides */
.theme-light {
  --cyber-black: #ffffff;
  --cyber-white: #000000;
  --cyber-dark: #f5f5f5;
  --cyber-gray: #666666;
}

.theme-light .bg-cyber-black {
  @apply bg-white;
}
.theme-light .text-cyber-white {
  @apply text-black;
}
.theme-light .border-cyber-green {
  @apply border-blue-600;
}
```

### Context-Based Theming

Create a theme context:

```tsx
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
}

const ChaoSTheme = createContext<Theme | null>(null);

export const ChaoSThemeProvider = ({ theme, children }) => {
  return (
    <ChaoSTheme.Provider value={theme}>
      <div style={{ ...theme.colors }} className="chaos-theme">
        {children}
      </div>
    </ChaoSTheme.Provider>
  );
};
```

## Advanced Customization

### CSS Custom Properties

Use CSS variables for dynamic theming:

```css
:root {
  /* Color variables */
  --chaos-primary: #00ff41;
  --chaos-secondary: #ff006e;
  --chaos-background: #000000;
  --chaos-text: #ffffff;

  /* Spacing variables */
  --chaos-space-xs: 0.25rem;
  --chaos-space-sm: 0.5rem;
  --chaos-space-md: 1rem;
  --chaos-space-lg: 1.5rem;

  /* Border variables */
  --chaos-border-width: 3px;
  --chaos-border-radius: 0px;

  /* Shadow variables */
  --chaos-shadow-offset: 6px;
  --chaos-shadow-color: var(--chaos-primary);
}

/* Component using CSS variables */
.custom-brutal-button {
  background: var(--chaos-primary);
  color: var(--chaos-background);
  border: var(--chaos-border-width) solid var(--chaos-primary);
  padding: var(--chaos-space-md) var(--chaos-space-lg);
  box-shadow: var(--chaos-shadow-offset) var(--chaos-shadow-offset) 0 var(--chaos-shadow-color);
}
```

### Runtime Theme Switching

Implement dynamic theme changes:

```tsx
const useChaoSTheme = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};
```

### Component Composition

Build complex components from base elements:

```tsx
// Base brutal element
const BrutalBox = ({ children, className, ...props }) => (
  <div className={cn("border-brutal border-cyber-green shadow-brutal", className)} {...props}>
    {children}
  </div>
);

// Composed notification component
const BrutalNotification = ({ type, title, message, onClose }) => (
  <BrutalBox
    className={cn(
      "p-brutal-4 mb-brutal-4",
      type === "error" && "border-cyber-red shadow-brutal-red",
      type === "success" && "border-cyber-green shadow-brutal",
      type === "warning" && "border-cyber-yellow shadow-brutal-yellow"
    )}
  >
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-brutalist font-bold uppercase text-sm">{title}</h4>
        <p className="text-cyber-gray mt-1">{message}</p>
      </div>
      <button onClick={onClose} className="text-cyber-white hover:text-cyber-red">
        ×
      </button>
    </div>
  </BrutalBox>
);
```

## Best Practices

### Maintaining Brutalist Principles

1. **Keep It Bold**: Don't dilute the aesthetic with subtle changes
2. **High Contrast**: Maintain accessibility through strong color differences
3. **Geometric Shapes**: Stick to angular, sharp-edged designs
4. **Functional Focus**: Every customization should enhance usability

### Performance Considerations

1. **CSS-Only Animations**: Avoid JavaScript-heavy effects
2. **Minimal Dependencies**: Keep component overhead low
3. **Efficient Selectors**: Use specific class names over complex selectors
4. **Bundle Size**: Import only the components you need

### Accessibility Guidelines

1. **Color Contrast**: Maintain WCAG AA compliance (4.5:1 minimum)
2. **Focus Indicators**: Ensure visible focus states for all interactive elements
3. **Keyboard Navigation**: Test all customizations with keyboard-only usage
4. **Screen Reader Support**: Preserve semantic HTML and ARIA attributes

## Example Customizations

### Neon Cyberpunk Theme

```css
:root {
  --chaos-primary: #00ffff;
  --chaos-secondary: #ff00ff;
  --chaos-background: #0a0a0a;
  --chaos-accent: #ffff00;
}
```

### Corporate Brutal Theme

```css
:root {
  --chaos-primary: #003366;
  --chaos-secondary: #ff6600;
  --chaos-background: #ffffff;
  --chaos-text: #000000;
}
```

### Gaming Terminal Theme

```css
:root {
  --chaos-primary: #00ff00;
  --chaos-secondary: #ff0000;
  --chaos-background: #000000;
  --chaos-accent: #ffff00;
}
```

Ready to make ChaoS/UI your own? Check out our [Usage Examples](./usage-examples.md) for inspiration and [Contributing Guidelines](./contributing.md) to share your customizations with the community.
