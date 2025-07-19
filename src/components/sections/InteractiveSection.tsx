import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from "../ui/Modal";
import { Dropdown } from "../ui/Dropdown";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/Accordion";
import { Tooltip } from "../ui/Tooltip";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle } from "../ui/Popover";
import { ComponentDemo } from "../showcase/ComponentDemo";
import { ComponentCopyButton } from "../showcase/CopyButton";
import { Settings, User, Bell, HelpCircle } from "lucide-react";

const InteractiveSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const dropdownOptions = [
    { value: "option1", label: "Option 1", icon: <Settings className="w-4 h-4" /> },
    { value: "option2", label: "Option 2", icon: <User className="w-4 h-4" /> },
    { value: "option3", label: "Option 3", icon: <Bell className="w-4 h-4" /> },
    { value: "option4", label: "Option 4 (Disabled)", disabled: true },
  ];

  return (
    <section id="interactive" className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                Interactive & Overlay
              </h2>
              <p className="text-lg text-cyber-gray mt-2">
                Modals, dropdowns, tabs, and interactive overlay components
              </p>
            </div>
          </div>

          {/* Modal Demo */}
          <div id="modal" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Modal
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Overlay dialogs with animations and brutalist styling
                </p>
              </div>
              <ComponentCopyButton componentName="Modal" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Modal Component"
              description="Modals with different variants and animations"
              component={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                      Primary Modal
                    </Button>
                  </div>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    variant="brutalist"
                    animation="slide"
                  >
                    <ModalHeader>
                      <ModalTitle>Modal Title</ModalTitle>
                      <ModalDescription>
                        This is a modal dialog with brutalist styling
                      </ModalDescription>
                    </ModalHeader>
                    <ModalContent>
                      <p className="text-cyber-white">
                        This is the modal content. You can place any content here including forms,
                        images, or other components.
                      </p>
                    </ModalContent>
                    <ModalFooter>
                      <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
                    </ModalFooter>
                  </Modal>
                </div>
              }
              code={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  variant="brutalist"
  animation="slide"
>
  <ModalHeader>
    <ModalTitle>Modal Title</ModalTitle>
    <ModalDescription>
      This is a modal dialog with brutalist styling
    </ModalDescription>
  </ModalHeader>
  <ModalContent>
    <p>Modal content goes here...</p>
  </ModalContent>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button onClick={() => setIsOpen(false)}>
      Confirm
    </Button>
  </ModalFooter>
</Modal>`}
            />

            <ComponentDemo
              title="Modal Sizes & Variants"
              description="Different modal sizes and styling variants"
              component={
                <div className="space-y-4">
                  <div className="text-sm text-cyber-gray">Modal sizes and variants:</div>
                  <div className="space-y-2">
                    <div className="text-xs text-cyber-gray">• Small modal (sm)</div>
                    <div className="text-xs text-cyber-gray">• Medium modal (md)</div>
                    <div className="text-xs text-cyber-gray">• Large modal (lg)</div>
                    <div className="text-xs text-cyber-gray">• Extra large modal (xl)</div>
                    <div className="text-xs text-cyber-gray">• Full screen modal (full)</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-cyber-gray">• Default variant</div>
                    <div className="text-xs text-cyber-gray">• Brutalist variant</div>
                    <div className="text-xs text-cyber-gray">• Glass variant</div>
                  </div>
                </div>
              }
              code={`// Different sizes
<Modal size="sm" isOpen={isOpen} onClose={onClose}>
  <ModalContent>Small modal</ModalContent>
</Modal>

<Modal size="lg" isOpen={isOpen} onClose={onClose}>
  <ModalContent>Large modal</ModalContent>
</Modal>

// Different variants
<Modal variant="brutalist" isOpen={isOpen} onClose={onClose}>
  <ModalContent>Brutalist styling</ModalContent>
</Modal>

<Modal variant="glass" isOpen={isOpen} onClose={onClose}>
  <ModalContent>Glass effect</ModalContent>
</Modal>`}
            />
          </div>

          {/* Dropdown Demo */}
          <div id="dropdown" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Dropdown
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Dropdown menus with search and multi-select capabilities
                </p>
              </div>
              <ComponentCopyButton componentName="Dropdown" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Dropdown Component"
              description="Dropdown with different variants and options"
              component={
                <div className="space-y-4">
                  <Dropdown
                    options={dropdownOptions}
                    value={selectedValue}
                    onValueChange={setSelectedValue}
                    placeholder="Select an option"
                  />
                  <Dropdown
                    options={dropdownOptions}
                    variant="brutalist"
                    brutalistBorder
                    searchable
                    placeholder="Searchable dropdown"
                  />
                  <Dropdown
                    options={dropdownOptions}
                    variant="ghost"
                    size="sm"
                    placeholder="Ghost variant"
                  />
                </div>
              }
              code={`const options = [
  { value: "option1", label: "Option 1", icon: <Settings /> },
  { value: "option2", label: "Option 2", icon: <User /> },
  { value: "option3", label: "Option 3", disabled: true },
];

<Dropdown
  options={options}
  value={selectedValue}
  onValueChange={setSelectedValue}
  placeholder="Select an option"
/>

<Dropdown
  options={options}
  variant="brutalist"
  searchable
  placeholder="Searchable dropdown"
/>`}
            />

            <ComponentDemo
              title="Dropdown Features"
              description="Advanced dropdown features and configurations"
              component={
                <div className="space-y-4">
                  <div className="text-sm text-cyber-gray mb-2">Dropdown features:</div>
                  <div className="space-y-2">
                    <div className="text-xs text-cyber-gray">• Multiple selection</div>
                    <div className="text-xs text-cyber-gray">• Search functionality</div>
                    <div className="text-xs text-cyber-gray">• Custom icons</div>
                    <div className="text-xs text-cyber-gray">• Disabled options</div>
                    <div className="text-xs text-cyber-gray">• Position control</div>
                    <div className="text-xs text-cyber-gray">• Brutalist styling</div>
                  </div>
                  <Dropdown
                    options={dropdownOptions}
                    multiple
                    searchable
                    placeholder="Multi-select dropdown"
                  />
                </div>
              }
              code={`// Multi-select dropdown
<Dropdown
  options={options}
  multiple
  searchable
  placeholder="Multi-select dropdown"
  onValueChange={(values) => console.log(values)}
/>

// With positioning
<Dropdown
  options={options}
  position="top"
  maxHeight={150}
  glitchOnOpen
/>`}
            />
          </div>

          {/* Tabs Demo */}
          <div id="tabs" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Tabs
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Tab navigation with brutalist styling and variants
                </p>
              </div>
              <ComponentCopyButton componentName="Tabs" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Tabs Component"
              description="Tab navigation with different variants"
              component={
                <div className="space-y-6">
                  <Tabs defaultValue="tab1" variant="brutalist">
                    <TabsList>
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="mt-4">
                      <div className="p-4 bg-cyber-dark/30 rounded border border-cyber-green/20">
                        <h4 className="font-brutalist font-bold text-cyber-green mb-2">
                          Tab 1 Content
                        </h4>
                        <p className="text-cyber-white text-sm">
                          This is the content for tab 1. You can place any content here.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="tab2" className="mt-4">
                      <div className="p-4 bg-cyber-dark/30 rounded border border-cyber-green/20">
                        <h4 className="font-brutalist font-bold text-cyber-green mb-2">
                          Tab 2 Content
                        </h4>
                        <p className="text-cyber-white text-sm">
                          This is the content for tab 2 with different information.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="tab3" className="mt-4">
                      <div className="p-4 bg-cyber-dark/30 rounded border border-cyber-green/20">
                        <h4 className="font-brutalist font-bold text-cyber-green mb-2">
                          Tab 3 Content
                        </h4>
                        <p className="text-cyber-white text-sm">
                          This is the content for tab 3 with additional features.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              }
              code={`<Tabs defaultValue="tab1" variant="brutalist">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <div className="p-4">
      <h4>Tab 1 Content</h4>
      <p>This is the content for tab 1.</p>
    </div>
  </TabsContent>
</Tabs>`}
            />

            <ComponentDemo
              title="Tab Variants"
              description="Different tab styles and orientations"
              component={
                <div className="space-y-6">
                  <Tabs defaultValue="pill1" variant="pills" size="sm">
                    <TabsList>
                      <TabsTrigger value="pill1">Pill 1</TabsTrigger>
                      <TabsTrigger value="pill2">Pill 2</TabsTrigger>
                      <TabsTrigger value="pill3">Pill 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pill1" className="mt-4">
                      <div className="p-3 bg-cyber-dark/30 rounded border border-cyber-green/20">
                        <p className="text-cyber-white text-sm">Pills variant content</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="pill2" className="mt-4">
                      <div className="p-3 bg-cyber-dark/30 rounded border border-cyber-green/20">
                        <p className="text-cyber-white text-sm">Second pill content</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="pill3" className="mt-4">
                      <div className="p-3 bg-cyber-dark/30 rounded border border-cyber-green/20">
                        <p className="text-cyber-white text-sm">Third pill content</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              }
              code={`// Pills variant
<Tabs defaultValue="pill1" variant="pills" size="sm">
  <TabsList>
    <TabsTrigger value="pill1">Pill 1</TabsTrigger>
    <TabsTrigger value="pill2">Pill 2</TabsTrigger>
  </TabsList>
  <TabsContent value="pill1">
    Pills variant content
  </TabsContent>
</Tabs>`}
            />
          </div>

          {/* Accordion Demo */}
          <div id="accordion" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Accordion
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Collapsible content sections with brutalist styling
                </p>
              </div>
              <ComponentCopyButton componentName="Accordion" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Accordion Component"
              description="Collapsible accordion with single selection"
              component={
                <Accordion type="single" collapsible variant="brutalist">
                  <AccordionItem value="item1">
                    <AccordionTrigger value="item1">What is ChaoS/UI?</AccordionTrigger>
                    <AccordionContent value="item1">
                      ChaoS/UI is a brutalist React component library with cyber-styled components
                      designed for modern web applications with a rebellious aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item2">
                    <AccordionTrigger value="item2">How do I install it?</AccordionTrigger>
                    <AccordionContent value="item2">
                      You can install ChaoS/UI via npm and then import the components you need in
                      your React application.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item3">
                    <AccordionTrigger value="item3">Is it customizable?</AccordionTrigger>
                    <AccordionContent value="item3">
                      Yes! ChaoS/UI is built with Tailwind CSS and provides extensive customization
                      options through props and CSS custom properties.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              }
              code={`<Accordion type="single" collapsible variant="brutalist">
  <AccordionItem value="item1">
    <AccordionTrigger value="item1">
      What is ChaoS/UI?
    </AccordionTrigger>
    <AccordionContent value="item1">
      ChaoS/UI is a brutalist React component library...
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            />

            <ComponentDemo
              title="Multiple Accordion"
              description="Accordion with multiple items expandable"
              component={
                <Accordion type="multiple" variant="default" size="sm">
                  <AccordionItem value="feature1">
                    <AccordionTrigger value="feature1">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Features
                      </div>
                    </AccordionTrigger>
                    <AccordionContent value="feature1">
                      <div className="space-y-2">
                        <Badge variant="outline" size="sm">
                          20+ Components
                        </Badge>
                        <Badge variant="outline" size="sm">
                          TypeScript
                        </Badge>
                        <Badge variant="outline" size="sm">
                          Brutalist Design
                        </Badge>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="theme1">
                    <AccordionTrigger value="theme1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Theming
                      </div>
                    </AccordionTrigger>
                    <AccordionContent value="theme1">
                      Customize colors, spacing, and animations to match your brand.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="support1">
                    <AccordionTrigger value="support1">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Support
                      </div>
                    </AccordionTrigger>
                    <AccordionContent value="support1">
                      Full documentation and community support available.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              }
              code={`<Accordion type="multiple" variant="default" size="sm">
  <AccordionItem value="feature1">
    <AccordionTrigger value="feature1">
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4" />
        Features
      </div>
    </AccordionTrigger>
    <AccordionContent value="feature1">
      <div className="space-y-2">
        <Badge variant="outline" size="sm">20+ Components</Badge>
        <Badge variant="outline" size="sm">TypeScript</Badge>
        <Badge variant="outline" size="sm">Brutalist Design</Badge>
      </div>
    </AccordionContent>
  </AccordionItem>
  // ... more items
</Accordion>`}
            />
          </div>

          {/* Tooltip Demo */}
          <div id="tooltip" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Tooltip
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Contextual tooltips with positioning and styling options
                </p>
              </div>
              <ComponentCopyButton componentName="Tooltip" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Tooltip Component"
              description="Tooltips with different positions and variants"
              component={
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <Tooltip content="Top tooltip" side="top" variant="brutalist">
                      <Button>Top</Button>
                    </Tooltip>
                    <Tooltip content="Bottom tooltip" side="bottom">
                      <Button>Bottom</Button>
                    </Tooltip>
                    <Tooltip content="Left tooltip" side="left" variant="dark">
                      <Button>Left</Button>
                    </Tooltip>
                    <Tooltip content="Right tooltip" side="right">
                      <Button>Right</Button>
                    </Tooltip>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Tooltip
                      content="This is a longer tooltip with more detailed information"
                      side="top"
                      size="lg"
                      delay={500}
                    >
                      <Button variant="primary">Delayed</Button>
                    </Tooltip>
                    <Tooltip content="Click to trigger" trigger="click" variant="brutalist">
                      <Button variant="ghost">Click me</Button>
                    </Tooltip>
                  </div>
                </div>
              }
              code={`<Tooltip content="Top tooltip" side="top" variant="brutalist">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" side="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip 
  content="This is a longer tooltip with more info" 
  side="top"
  size="lg"
  delay={500}
>
  <Button variant="brutalist">Delayed</Button>
</Tooltip>

<Tooltip 
  content="Click to trigger" 
  trigger="click"
  variant="brutalist"
>
  <Button variant="ghost">Click me</Button>
</Tooltip>`}
            />

            <ComponentDemo
              title="Tooltip Variants"
              description="Different tooltip styles and behaviors"
              component={
                <div className="space-y-4">
                  <div className="text-sm text-cyber-gray mb-4">Tooltip variants and features:</div>
                  <div className="grid grid-cols-2 gap-4">
                    <Tooltip content="Default variant" variant="default">
                      <div className="p-3 bg-cyber-dark/30 rounded border border-cyber-green/20 text-center text-cyber-white text-sm">
                        Default
                      </div>
                    </Tooltip>
                    <Tooltip content="Brutalist variant" variant="brutalist">
                      <div className="p-3 bg-cyber-dark/30 rounded border border-cyber-green/20 text-center text-cyber-white text-sm">
                        Brutalist
                      </div>
                    </Tooltip>
                    <Tooltip content="Dark variant" variant="dark">
                      <div className="p-3 bg-cyber-dark/30 rounded border border-cyber-green/20 text-center text-cyber-white text-sm">
                        Dark
                      </div>
                    </Tooltip>
                    <Tooltip content="No arrow" arrow={false}>
                      <div className="p-3 bg-cyber-dark/30 rounded border border-cyber-green/20 text-center text-cyber-white text-sm">
                        No Arrow
                      </div>
                    </Tooltip>
                  </div>
                </div>
              }
              code={`// Different variants
<Tooltip content="Default variant" variant="default">
  <Button>Default</Button>
</Tooltip>

<Tooltip content="Brutalist variant" variant="brutalist">
  <Button>Brutalist</Button>
</Tooltip>

<Tooltip content="Dark variant" variant="dark">
  <Button>Dark</Button>
</Tooltip>

// Without arrow
<Tooltip content="No arrow" arrow={false}>
  <Button>No Arrow</Button>
</Tooltip>`}
            />
          </div>

          {/* Popover Demo */}
          <div id="popover" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Popover
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Rich content overlays with interactive elements
                </p>
              </div>
              <ComponentCopyButton componentName="Popover" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Popover Component"
              description="Popovers with rich content and interactions"
              component={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Popover
                      content={
                        <PopoverContent>
                          <PopoverHeader>
                            <PopoverTitle>User Profile</PopoverTitle>
                          </PopoverHeader>
                          <div className="space-y-2">
                            <p className="text-sm text-cyber-white">
                              View and edit your profile information
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">
                                Edit
                              </Button>
                              <Button size="sm">Save</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      }
                      variant="brutalist"
                    >
                      <Button>Profile</Button>
                    </Popover>

                    <Popover
                      content={
                        <PopoverContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Bell className="w-4 h-4 text-cyber-green" />
                              <span className="text-sm font-semibold">Notifications</span>
                            </div>
                            <div className="space-y-2">
                              <div className="text-xs text-cyber-gray">No new notifications</div>
                              <Button size="sm" variant="ghost" className="w-full">
                                View All
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      }
                      side="bottom"
                      align="end"
                    >
                      <Button variant="ghost">
                        <Bell className="w-4 h-4" />
                      </Button>
                    </Popover>
                  </div>
                </div>
              }
              code={`<Popover
  content={
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>User Profile</PopoverTitle>
      </PopoverHeader>
      <div className="space-y-2">
        <p className="text-sm">
          View and edit your profile information
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">Edit</Button>
          <Button size="sm">Save</Button>
        </div>
      </div>
    </PopoverContent>
  }
  variant="brutalist"
>
  <Button>Profile</Button>
</Popover>`}
            />

            <ComponentDemo
              title="Popover Variants"
              description="Different popover styles and behaviors"
              component={
                <div className="space-y-4">
                  <div className="text-sm text-cyber-gray mb-4">Popover features:</div>
                  <div className="space-y-2">
                    <div className="text-xs text-cyber-gray">• Rich content support</div>
                    <div className="text-xs text-cyber-gray">• Multiple trigger types</div>
                    <div className="text-xs text-cyber-gray">• Positioning control</div>
                    <div className="text-xs text-cyber-gray">• Glass and brutalist variants</div>
                    <div className="text-xs text-cyber-gray">• Modal mode</div>
                  </div>
                  <div className="flex gap-2">
                    <Popover
                      content={
                        <PopoverContent>
                          <div className="text-sm">Glass variant popover</div>
                        </PopoverContent>
                      }
                      variant="glass"
                      trigger="hover"
                    >
                      <Button variant="outline" size="sm">
                        Glass
                      </Button>
                    </Popover>
                    <Popover
                      content={
                        <PopoverContent>
                          <div className="text-sm">Modal popover</div>
                        </PopoverContent>
                      }
                      modal
                      showCloseButton
                    >
                      <Button variant="outline" size="sm">
                        Modal
                      </Button>
                    </Popover>
                  </div>
                </div>
              }
              code={`// Glass variant with hover trigger
<Popover
  content={
    <PopoverContent>
      <div className="text-sm">Glass variant popover</div>
    </PopoverContent>
  }
  variant="glass"
  trigger="hover"
>
  <Button variant="outline">Glass</Button>
</Popover>

// Modal popover
<Popover
  content={
    <PopoverContent>
      <div className="text-sm">Modal popover</div>
    </PopoverContent>
  }
  modal
  showCloseButton
>
  <Button variant="outline">Modal</Button>
</Popover>`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSection;
