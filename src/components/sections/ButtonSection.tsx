import React from "react";
import { Button } from "../ui/Button";
import { ComponentDemo } from "../showcase/ComponentDemo";
import { PropsTable } from "../showcase/PropsTable";
import { ComponentCopyButton } from "../showcase/CopyButton";
import { PropInfo } from "../../utils/component-registry";

const ButtonSection: React.FC = () => {
  const buttonProps: PropInfo[] = [
    {
      name: "variant",
      type: '"primary" | "secondary" | "destructive" | "ghost" | "outline"',
      required: false,
      default: "primary",
      description: "The visual style variant of the button",
      options: ["primary", "secondary", "destructive", "ghost", "outline"],
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl"',
      required: false,
      default: "md",
      description: "The size of the button",
      options: ["sm", "md", "lg", "xl"],
    },
    {
      name: "loading",
      type: "boolean",
      required: false,
      default: false,
      description: "Shows loading spinner when true",
    },
    {
      name: "glitchOnClick",
      type: "boolean",
      required: false,
      default: true,
      description: "Enables glitch animation on click",
    },
    {
      name: "brutalist",
      type: "boolean",
      required: false,
      default: true,
      description: "Enables brutalist styling with thick borders and shadows",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      default: false,
      description: "Disables the button when true",
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "The content to display inside the button",
    },
  ];

  const variants = [
    {
      name: "Primary",
      component: <Button variant="primary">Primary Button</Button>,
      code: `<Button variant="primary">Primary Button</Button>`,
    },
    {
      name: "Secondary",
      component: <Button variant="secondary">Secondary Button</Button>,
      code: `<Button variant="secondary">Secondary Button</Button>`,
    },
    {
      name: "Destructive",
      component: <Button variant="destructive">Destructive Button</Button>,
      code: `<Button variant="destructive">Destructive Button</Button>`,
    },
    {
      name: "Ghost",
      component: <Button variant="ghost">Ghost Button</Button>,
      code: `<Button variant="ghost">Ghost Button</Button>`,
    },
    {
      name: "Outline",
      component: <Button variant="outline">Outline Button</Button>,
      code: `<Button variant="outline">Outline Button</Button>`,
    },
  ];

  return (
    <section id="buttons" className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <div id="button" className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                Button
              </h2>
              <p className="text-lg text-cyber-gray mt-2">
                Brutalist buttons with glitch effects and multiple variants
              </p>
            </div>
            <ComponentCopyButton
              componentName="Button"
              props={{ variant: "primary" }}
              children="Click me"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demo */}
            <ComponentDemo
              title="Button Demo"
              description="Interactive button component with multiple variants"
              component={<Button variant="primary">Click me</Button>}
              code={`<Button variant="primary">Click me</Button>`}
              variants={variants}
            />

            {/* Size Examples */}
            <ComponentDemo
              title="Button Sizes"
              description="Different button sizes available"
              component={
                <div className="space-y-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              }
              code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
            />
          </div>

          {/* Loading and Disabled States */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComponentDemo
              title="Button States"
              description="Loading and disabled button states"
              component={
                <div className="space-y-4">
                  <Button loading>Loading...</Button>
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" loading>
                    Loading Outline
                  </Button>
                  <Button variant="secondary" disabled>
                    Disabled Secondary
                  </Button>
                </div>
              }
              code={`<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button variant="outline" loading>Loading Outline</Button>
<Button variant="secondary" disabled>Disabled Secondary</Button>`}
            />

            <ComponentDemo
              title="Button Effects"
              description="Different visual effects and animations"
              component={
                <div className="space-y-4">
                  <Button glitchOnClick>Glitch on Click</Button>
                  <Button glitchOnClick={false}>No Glitch</Button>
                  <Button brutalist={false} variant="outline">
                    Non-Brutalist
                  </Button>
                  <Button variant="primary" className="animate-pulse-cyber">
                    Pulsing
                  </Button>
                </div>
              }
              code={`<Button glitchOnClick>Glitch on Click</Button>
<Button glitchOnClick={false}>No Glitch</Button>
<Button brutalist={false} variant="outline">Non-Brutalist</Button>
<Button variant="primary" className="animate-pulse-cyber">Pulsing</Button>`}
            />
          </div>
        </div>

        {/* Props Table */}
        <div className="mt-12">
          <h3 className="text-xl font-brutalist font-bold uppercase text-cyber-green mb-6">
            Props
          </h3>
          <PropsTable props={buttonProps} />
        </div>
      </div>
    </section>
  );
};

export default ButtonSection;
