import React, { useState } from "react";
import { User, Mail, Lock, Search } from "lucide-react";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { Checkbox } from "../ui/Checkbox";
import { Radio, RadioGroup } from "../ui/Radio";
import { Select } from "../ui/Select";
import { Switch } from "../ui/Switch";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { ComponentDemo } from "../showcase/ComponentDemo";
import { PropsTable } from "../showcase/PropsTable";
import { ComponentCopyButton } from "../showcase/CopyButton";
import { PropInfo } from "../../utils/component-registry";

const FormSection: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [switchValue, setSwitchValue] = useState(false);

  const inputProps: PropInfo[] = [
    {
      name: "variant",
      type: '"default" | "brutalist" | "ghost"',
      required: false,
      default: "default",
      description: "The visual style variant of the input",
      options: ["default", "brutalist", "ghost"],
    },
    {
      name: "inputSize",
      type: '"sm" | "md" | "lg"',
      required: false,
      default: "md",
      description: "The size of the input",
      options: ["sm", "md", "lg"],
    },
    {
      name: "error",
      type: "boolean",
      required: false,
      default: false,
      description: "Shows error state styling",
    },
    {
      name: "success",
      type: "boolean",
      required: false,
      default: false,
      description: "Shows success state styling",
    },
    {
      name: "label",
      type: "string",
      required: false,
      description: "Label text for the input",
    },
    {
      name: "hint",
      type: "string",
      required: false,
      description: "Helper text shown below the input",
    },
    {
      name: "showPasswordToggle",
      type: "boolean",
      required: false,
      default: false,
      description: "Shows password visibility toggle for password inputs",
    },
    {
      name: "clearable",
      type: "boolean",
      required: false,
      default: false,
      description: "Shows clear button when input has value",
    },
    {
      name: "icon",
      type: "React.ReactNode",
      required: false,
      description: "Icon to display inside the input",
    },
    {
      name: "glitchOnFocus",
      type: "boolean",
      required: false,
      default: false,
      description: "Enables glitch animation on focus",
    },
  ];

  return (
    <section id="forms" className="py-16 px-6 bg-cyber-dark/50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <div id="input" className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                Form Elements
              </h2>
              <p className="text-lg text-cyber-gray mt-2">
                Brutalist form components with cyber aesthetics
              </p>
            </div>
            <ComponentCopyButton componentName="Input" props={{ placeholder: "Enter text..." }} />
          </div>

          {/* Input Demo */}
          <div id="input-demo" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Input Component"
              description="Basic text input with labels and hints"
              component={
                <Input
                  label="Username"
                  placeholder="Enter your username"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  hint="Must be at least 3 characters"
                />
              }
              code={`<Input
  label="Username"
  placeholder="Enter your username"
  hint="Must be at least 3 characters"
/>`}
            />

            <ComponentDemo
              title="Input with Icons"
              description="Input with leading and trailing icons"
              component={
                <div className="space-y-4">
                  <Input
                    placeholder="Search..."
                    icon={<Search />}
                    clearable
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    icon={<Mail />}
                    iconPosition="left"
                  />
                </div>
              }
              code={`<Input
  placeholder="Search..."
  icon={<Search />}
  clearable
/>
<Input
  type="email"
  placeholder="Email address"
  icon={<Mail />}
  iconPosition="left"
/>`}
            />
          </div>

          {/* Input Variants */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Input Variants"
              description="Different input styles and states"
              component={
                <div className="space-y-4">
                  <Input variant="default" placeholder="Default" />
                  <Input variant="brutalist" placeholder="Brutalist" />
                  <Input variant="ghost" placeholder="Ghost" />
                  <Input placeholder="Error state" error hint="This field is required" />
                  <Input placeholder="Success state" success hint="Looks good!" />
                </div>
              }
              code={`<Input variant="default" placeholder="Default" />
<Input variant="brutalist" placeholder="Brutalist" />
<Input variant="ghost" placeholder="Ghost" />
<Input placeholder="Error state" error hint="This field is required" />
<Input placeholder="Success state" success hint="Looks good!" />`}
            />

            <ComponentDemo
              title="Password Input"
              description="Password input with visibility toggle"
              component={
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Password"
                    showPasswordToggle
                    icon={<Lock />}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    showPasswordToggle
                    variant="brutalist"
                  />
                </div>
              }
              code={`<Input
  type="password"
  placeholder="Password"
  showPasswordToggle
  icon={<Lock />}
/>
<Input
  type="password"
  placeholder="Confirm Password"
  showPasswordToggle
  variant="brutalist"
/>`}
            />
          </div>

          {/* TextArea Demo */}
          <div id="textarea" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="TextArea Component"
              description="Multi-line text input with character counting"
              component={
                <TextArea
                  label="Message"
                  placeholder="Enter your message..."
                  value={textareaValue}
                  onChange={e => setTextareaValue(e.target.value)}
                  showCharCount
                  maxLength={500}
                  hint="Please be descriptive"
                />
              }
              code={`<TextArea
  label="Message"
  placeholder="Enter your message..."
  showCharCount
  maxLength={500}
  hint="Please be descriptive"
/>`}
            />

            <ComponentDemo
              title="TextArea Variants"
              description="Different textarea styles and auto-resize"
              component={
                <div className="space-y-4">
                  <TextArea variant="default" placeholder="Default TextArea" textareaSize="sm" />
                  <TextArea
                    variant="brutalist"
                    placeholder="Brutalist TextArea"
                    autoResize
                    value={textareaValue}
                    onChange={e => setTextareaValue(e.target.value)}
                  />
                </div>
              }
              code={`<TextArea
  variant="default"
  placeholder="Default TextArea"
  textareaSize="sm"
/>
<TextArea
  variant="brutalist"
  placeholder="Brutalist TextArea"
  autoResize
/>`}
            />
          </div>

          {/* Checkbox Demo */}
          <div id="checkbox" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Checkbox Component"
              description="Checkbox with labels and descriptions"
              component={
                <div className="space-y-4">
                  <Checkbox
                    label="Accept terms and conditions"
                    description="I agree to the terms of service and privacy policy"
                    checked={checkboxValue}
                    onChange={e => setCheckboxValue(e.target.checked)}
                  />
                  <Checkbox
                    label="Newsletter subscription"
                    description="Receive updates about new components"
                    variant="brutalist"
                  />
                </div>
              }
              code={`<Checkbox
  label="Accept terms and conditions"
  description="I agree to the terms of service and privacy policy"
/>
<Checkbox
  label="Newsletter subscription"
  description="Receive updates about new components"
  variant="brutalist"
/>`}
            />

            <ComponentDemo
              title="Checkbox Sizes & States"
              description="Different checkbox sizes and states"
              component={
                <div className="space-y-4">
                  <Checkbox size="sm" label="Small checkbox" />
                  <Checkbox size="md" label="Medium checkbox" />
                  <Checkbox size="lg" label="Large checkbox" />
                  <Checkbox label="Error state" error />
                  <Checkbox label="Indeterminate" indeterminate />
                  <Checkbox label="Disabled" disabled />
                </div>
              }
              code={`<Checkbox size="sm" label="Small checkbox" />
<Checkbox size="md" label="Medium checkbox" />
<Checkbox size="lg" label="Large checkbox" />
<Checkbox label="Error state" error />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />`}
            />
          </div>

          {/* Radio Demo */}
          <div id="radio" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Radio Component"
              description="Radio buttons with labels and descriptions"
              component={
                <div className="space-y-4">
                  <RadioGroup
                    name="theme"
                    options={[
                      { value: "dark", label: "Dark Mode", description: "Use dark theme" },
                      { value: "light", label: "Light Mode", description: "Use light theme" },
                      { value: "system", label: "System", description: "Follow system preference" },
                    ]}
                    value={radioValue}
                    onChange={setRadioValue}
                  />
                </div>
              }
              code={`<RadioGroup
  name="theme"
  options={[
    { value: "dark", label: "Dark Mode", description: "Use dark theme" },
    { value: "light", label: "Light Mode", description: "Use light theme" },
    { value: "system", label: "System", description: "Follow system preference" },
  ]}
  value={radioValue}
  onChange={setRadioValue}
/>`}
            />

            <ComponentDemo
              title="Radio Variants"
              description="Different radio styles and sizes"
              component={
                <div className="space-y-4">
                  <Radio name="size" value="sm" label="Small Radio" size="sm" />
                  <Radio name="size" value="md" label="Medium Radio" size="md" />
                  <Radio name="size" value="lg" label="Large Radio" size="lg" />
                  <Radio
                    name="size"
                    value="brutalist"
                    label="Brutalist Radio"
                    variant="brutalist"
                  />
                  <Radio name="size" value="error" label="Error Radio" error />
                </div>
              }
              code={`<Radio name="size" value="sm" label="Small Radio" size="sm" />
<Radio name="size" value="md" label="Medium Radio" size="md" />
<Radio name="size" value="lg" label="Large Radio" size="lg" />
<Radio name="size" value="brutalist" label="Brutalist Radio" variant="brutalist" />
<Radio name="size" value="error" label="Error Radio" error />`}
            />
          </div>

          {/* Select Demo */}
          <div id="select" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Select Component"
              description="Dropdown select with brutalist styling"
              component={
                <div className="space-y-4">
                  <Select
                    label="Choose Framework"
                    placeholder="Select a framework..."
                    options={[
                      { value: "react", label: "React" },
                      { value: "vue", label: "Vue" },
                      { value: "angular", label: "Angular" },
                      { value: "svelte", label: "Svelte" },
                    ]}
                    value={selectValue}
                    onChange={e => setSelectValue(e.target.value)}
                  />
                </div>
              }
              code={`<Select
  label="Choose Framework"
  placeholder="Select a framework..."
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ]}
  value={selectValue}
  onChange={(e) => setSelectValue(e.target.value)}
/>`}
            />

            <ComponentDemo
              title="Select Variants"
              description="Different select styles and states"
              component={
                <div className="space-y-4">
                  <Select
                    variant="default"
                    placeholder="Default Select"
                    options={[
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                    ]}
                  />
                  <Select
                    variant="brutalist"
                    placeholder="Brutalist Select"
                    options={[
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                    ]}
                  />
                  <Select
                    variant="ghost"
                    placeholder="Ghost Select"
                    options={[
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                    ]}
                  />
                  <Select
                    placeholder="Error Select"
                    options={[
                      { value: "1", label: "Option 1" },
                      { value: "2", label: "Option 2" },
                    ]}
                    error
                    hint="Please select an option"
                  />
                </div>
              }
              code={`<Select
  variant="default"
  placeholder="Default Select"
  options={[{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }]}
/>
<Select
  variant="brutalist"
  placeholder="Brutalist Select"
  options={[{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }]}
/>
<Select
  variant="ghost"
  placeholder="Ghost Select"
  options={[{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }]}
/>
<Select
  placeholder="Error Select"
  options={[{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }]}
  error
  hint="Please select an option"
/>`}
            />
          </div>

          {/* Switch Demo */}
          <div id="switch" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Switch Component"
              description="Toggle switches with brutal aesthetics"
              component={
                <div className="space-y-4">
                  <Switch
                    label="Enable notifications"
                    description="Receive push notifications about updates"
                    checked={switchValue}
                    onChange={e => setSwitchValue(e.target.checked)}
                  />
                  <Switch
                    label="Dark mode"
                    description="Use dark theme across the app"
                    variant="brutalist"
                  />
                </div>
              }
              code={`<Switch
  label="Enable notifications"
  description="Receive push notifications about updates"
  checked={switchValue}
  onChange={(e) => setSwitchValue(e.target.checked)}
/>
<Switch
  label="Dark mode"
  description="Use dark theme across the app"
  variant="brutalist"
/>`}
            />

            <ComponentDemo
              title="Switch Sizes & States"
              description="Different switch sizes and states"
              component={
                <div className="space-y-4">
                  <Switch size="sm" label="Small Switch" />
                  <Switch size="md" label="Medium Switch" />
                  <Switch size="lg" label="Large Switch" />
                  <Switch label="Error Switch" error />
                  <Switch label="Disabled Switch" disabled />
                  <Switch label="Checked Switch" checked />
                </div>
              }
              code={`<Switch size="sm" label="Small Switch" />
<Switch size="md" label="Medium Switch" />
<Switch size="lg" label="Large Switch" />
<Switch label="Error Switch" error />
<Switch label="Disabled Switch" disabled />
<Switch label="Checked Switch" checked />`}
            />
          </div>

          {/* Label Demo */}
          <div id="label" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Label Component"
              description="Form labels with brutalist styling"
              component={
                <div className="space-y-4">
                  <Label>Default Label</Label>
                  <Label variant="brutalist">Brutalist Label</Label>
                  <Label variant="ghost">Ghost Label</Label>
                  <Label required>Required Label</Label>
                  <Label error>Error Label</Label>
                  <Label success>Success Label</Label>
                </div>
              }
              code={`<Label>Default Label</Label>
<Label variant="brutalist">Brutalist Label</Label>
<Label variant="ghost">Ghost Label</Label>
<Label required>Required Label</Label>
<Label error>Error Label</Label>
<Label success>Success Label</Label>`}
            />

            <ComponentDemo
              title="Label Sizes & Effects"
              description="Different label sizes and hover effects"
              component={
                <div className="space-y-4">
                  <Label size="sm">Small Label</Label>
                  <Label size="md">Medium Label</Label>
                  <Label size="lg">Large Label</Label>
                  <Label glitchOnHover>Glitch on Hover</Label>
                  <div className="space-y-2">
                    <Label htmlFor="example-input">Connected Label</Label>
                    <Input id="example-input" placeholder="Input connected to label" />
                  </div>
                </div>
              }
              code={`<Label size="sm">Small Label</Label>
<Label size="md">Medium Label</Label>
<Label size="lg">Large Label</Label>
<Label glitchOnHover>Glitch on Hover</Label>
<div className="space-y-2">
  <Label htmlFor="example-input">Connected Label</Label>
  <Input id="example-input" placeholder="Input connected to label" />
</div>`}
            />
          </div>

          {/* Complete Form Example */}
          <div className="mt-12">
            <ComponentDemo
              title="Complete Form Example"
              description="Full form with validation and submission"
              component={
                <form className="space-y-6 max-w-md">
                  <Input label="Full Name" placeholder="John Doe" icon={<User />} required />
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="john@example.com"
                    icon={<Mail />}
                    required
                  />
                  <Input
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    showPasswordToggle
                    icon={<Lock />}
                    required
                  />
                  <Select
                    label="Country"
                    placeholder="Select your country..."
                    options={[
                      { value: "us", label: "United States" },
                      { value: "ca", label: "Canada" },
                      { value: "uk", label: "United Kingdom" },
                      { value: "de", label: "Germany" },
                    ]}
                    required
                  />
                  <div className="space-y-3">
                    <Label>Account Type</Label>
                    <RadioGroup
                      name="account-type"
                      options={[
                        { value: "personal", label: "Personal", description: "For individual use" },
                        { value: "business", label: "Business", description: "For company use" },
                      ]}
                    />
                  </div>
                  <TextArea
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    showCharCount
                    maxLength={200}
                  />
                  <Switch
                    label="Email notifications"
                    description="Receive updates about your account"
                  />
                  <Checkbox
                    label="I agree to the terms"
                    description="By checking this box, you agree to our terms of service"
                  />
                  <Button variant="primary" size="lg" className="w-full">
                    Create Account
                  </Button>
                </form>
              }
              code={`<form className="space-y-6 max-w-md">
  <Input
    label="Full Name"
    placeholder="John Doe"
    icon={<User />}
    required
  />
  <Input
    type="email"
    label="Email Address"
    placeholder="john@example.com"
    icon={<Mail />}
    required
  />
  <Input
    type="password"
    label="Password"
    placeholder="••••••••"
    showPasswordToggle
    icon={<Lock />}
    required
  />
  <TextArea
    label="Bio"
    placeholder="Tell us about yourself..."
    showCharCount
    maxLength={200}
  />
  <Checkbox
    label="I agree to the terms"
    description="By checking this box, you agree to our terms of service"
  />
  <Button variant="primary" size="lg" className="w-full">
    Create Account
  </Button>
</form>`}
            />
          </div>
        </div>

        {/* Props Table */}
        <div className="mt-12">
          <h3 className="text-xl font-brutalist font-bold uppercase text-cyber-green mb-6">
            Input Props
          </h3>
          <PropsTable props={inputProps} />
        </div>
      </div>
    </section>
  );
};

export default FormSection;
