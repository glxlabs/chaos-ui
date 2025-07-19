# Contributing Guidelines

## Welcome to ChaoS/UI

We're building the most brutally beautiful React component library, and we want your help! Whether you're fixing bugs, adding components, or improving documentation, every contribution makes ChaoS/UI better.

## Code of Conduct

### Be Bold, Be Respectful

- **Embrace the Chaos**: We love bold ideas and unconventional approaches
- **Respect the Brutalist Vision**: Keep contributions aligned with our design philosophy
- **Help Others**: Support fellow contributors with patience and constructive feedback
- **Stay Professional**: No harassment, discrimination, or toxic behavior

## Getting Started

### Development Setup

1. **Fork and Clone**

```bash
git clone https://github.com/yourusername/chaos-ui.git
cd chaos-ui
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npm run dev
```

4. **Build and Test**

```bash
npm run build
npm run type-check
```

### Project Structure

```
src/
├── components/
│   ├── ui/           # Core components
│   ├── layout/       # Layout components
│   ├── sections/     # Demo sections
│   └── showcase/     # Demo utilities
├── styles/           # Global styles and tokens
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
└── contexts/         # React contexts
```

## Contributing Types

### 🐛 Bug Fixes

**Before Submitting:**

- Search existing issues to avoid duplicates
- Test the bug in the latest version
- Provide clear reproduction steps

**Bug Report Template:**

```markdown
## Bug Description

Clear description of what's broken

## Steps to Reproduce

1. Go to component X
2. Click on Y
3. See error Z

## Expected Behavior

What should happen

## Screenshots/Code

Visual proof or code examples

## Environment

- OS: [e.g. macOS, Windows]
- Browser: [e.g. Chrome 91]
- Node version: [e.g. 16.14.0]
```

### ✨ New Components

**Component Requirements:**

- Follows brutalist design principles
- TypeScript interfaces with proper types
- Responsive design with mobile support
- Accessibility compliance (WCAG AA)
- Copy-paste ready implementation

**Component Template:**

```tsx
import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = "default", size = "md", disabled = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "border-brutal border-cyber-green font-brutalist",

          // Variant styles
          variant === "primary" && "bg-cyber-green text-cyber-black",
          variant === "destructive" && "border-cyber-magenta text-cyber-magenta",

          // Size styles
          size === "sm" && "p-brutal-2 text-sm",
          size === "md" && "p-brutal-4",
          size === "lg" && "p-brutal-6 text-lg",

          // State styles
          disabled && "opacity-50 cursor-not-allowed",

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = "ComponentName";

export default ComponentName;
```

### 📚 Documentation

**Documentation Standards:**

- Write in active voice
- Use code examples for every concept
- Include accessibility notes
- Maintain brutalist tone (bold, direct)

**Types of Documentation:**

- Component API documentation
- Usage examples and patterns
- Design system guidelines
- Installation and setup guides

### 🎨 Design Improvements

**Design Contribution Guidelines:**

- Must enhance brutalist aesthetic
- Maintain high contrast and accessibility
- Use existing design tokens
- Document design decisions

## Development Guidelines

### Code Style

**TypeScript Standards:**

```tsx
// ✅ Good: Explicit interfaces
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

// ❌ Bad: Any types
const Button = (props: any) => { ... }
```

**CSS Standards:**

```css
/* ✅ Good: Use design tokens */
.component {
  padding: var(--brutal-spacing-4);
  border: var(--brutal-border-width) solid var(--cyber-green);
}

/* ❌ Bad: Magic numbers */
.component {
  padding: 16px;
  border: 3px solid #00ff41;
}
```

**React Patterns:**

```tsx
// ✅ Good: forwardRef for DOM access
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} {...props} />
));

// ✅ Good: Compound components
const Card = ({ children }) => <div>{children}</div>;
Card.Header = ({ children }) => <header>{children}</header>;
Card.Body = ({ children }) => <main>{children}</main>;
```

### Accessibility Requirements

**Keyboard Navigation:**

- All interactive elements must be focusable
- Logical tab order throughout components
- Escape key handling for modals/dropdowns

**Screen Readers:**

- Semantic HTML elements
- ARIA labels where needed
- Proper heading hierarchy

**Visual Accessibility:**

- 4.5:1 contrast ratio minimum
- Focus indicators for all interactive elements
- Support for reduced motion preferences

### Testing Standards

**Component Testing:**

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("applies variant classes", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-cyber-green");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Submission Process

### Pull Request Workflow

1. **Create Feature Branch**

```bash
git checkout -b feature/component-name
# or
git checkout -b fix/issue-description
```

2. **Make Changes**

- Follow coding standards
- Add tests for new functionality
- Update documentation

3. **Test Thoroughly**

```bash
npm run build
npm run type-check
npm run test
```

4. **Create Pull Request**

**PR Template:**

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New component
- [ ] Documentation update
- [ ] Design improvement

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Accessibility tested

## Screenshots

Include before/after images for UI changes
```

### Review Process

**What We Look For:**

- Code quality and consistency
- Brutalist design adherence
- Accessibility compliance
- Performance considerations
- Test coverage

**Review Timeline:**

- Initial review: 2-3 business days
- Follow-up reviews: 1-2 business days
- Merge after approval: Same day

## Component Guidelines

### Design Principles

**Brutalist Checklist:**

- ✅ Sharp, angular edges (no border-radius)
- ✅ Heavy, 3px+ borders
- ✅ High contrast colors
- ✅ Bold, geometric shadows
- ✅ Monospace typography
- ✅ Uppercase text for emphasis

**Functionality Requirements:**

- ✅ TypeScript interfaces
- ✅ forwardRef implementation
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Error state handling
- ✅ Loading state support

### Component API Design

**Consistent Prop Patterns:**

```tsx
interface ComponentProps {
  // Variants for different styles
  variant?: "default" | "primary" | "destructive";

  // Sizes for different scales
  size?: "sm" | "md" | "lg";

  // Common states
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;

  // Standard HTML props
  className?: string;
  children?: React.ReactNode;
}
```

## Release Process

### Version Management

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Schedule

- **Patch releases**: As needed for bug fixes
- **Minor releases**: Monthly for new components
- **Major releases**: Quarterly for breaking changes

## Community

### Getting Help

**Support Channels:**

- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: Questions and community chat
- Discord: Real-time community support

**Response Times:**

- Issues: 2-3 business days
- Discussions: 1-2 business days
- Discord: Real-time (community supported)

### Recognition

**Contributor Spotlights:**

- Monthly contributor features
- GitHub profile recognition
- Special badges for significant contributions

**Hall of Fame:**

- Top contributors listed in README
- Annual contributor appreciation
- Special release credits

## Advanced Contributing

### Becoming a Maintainer

**Requirements:**

- 5+ merged PRs
- Consistent quality contributions
- Community involvement
- Brutalist design understanding

**Responsibilities:**

- Code review and approval
- Issue triage and labeling
- Community support
- Release management

### Component Lifecycle

**Proposal → Development → Review → Release**

1. **Proposal**: Issue with component specification
2. **Development**: Implementation with tests/docs
3. **Review**: Community feedback and iteration
4. **Release**: Merge and version bump

## License

By contributing to ChaoS/UI, you agree that your contributions will be licensed under the MIT License.

## Final Notes

**Remember:**

- Quality over quantity
- Brutalism over beauty
- Function over form
- Community over individual glory

**Questions?**

- Check existing issues and discussions
- Join our Discord community
- Tag maintainers in your PR

**Ready to embrace the chaos?**
Start with a small bug fix or documentation improvement, then work your way up to creating new components. Every contribution helps build the most brutally effective React component library!

---

_"In chaos, we find order. In brutalism, we find beauty. In community, we find strength."_

Thank you for contributing to ChaoS/UI! 🔥
