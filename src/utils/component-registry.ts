export interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  props: PropInfo[];
  variants?: string[];
  sizes?: string[];
  examples: ExampleInfo[];
  tags: string[];
  dependencies?: string[];
}

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description: string;
  options?: string[];
}

export interface ExampleInfo {
  name: string;
  description: string;
  code: string;
  props: Record<string, any>;
  children?: string;
}

export interface ComponentCategory {
  name: string;
  description: string;
  components: string[];
  icon?: string;
}

export const componentCategories: ComponentCategory[] = [
  {
    name: "Form Elements",
    description: "Interactive form components for user input",
    components: ["Button", "Input", "TextArea", "Checkbox", "Radio", "Select", "Switch", "Label"],
    icon: "forms",
  },
  {
    name: "Layout & Structure",
    description: "Components for organizing and structuring content",
    components: ["Card", "Separator", "Container", "Grid", "Stack", "Spacer"],
    icon: "layout",
  },
  {
    name: "Feedback & Status",
    description: "Components for showing status and providing feedback",
    components: ["Alert", "Badge", "Progress", "Skeleton", "Spinner", "Toast"],
    icon: "feedback",
  },
  {
    name: "Interactive & Overlay",
    description: "Components for interactive elements and overlays",
    components: ["Modal", "Dropdown", "Tabs", "Accordion", "Tooltip", "Popover"],
    icon: "interactive",
  },
  {
    name: "Data Display",
    description: "Components for displaying data and content",
    components: ["Table", "List", "Typography", "Avatar", "Empty State", "Stats"],
    icon: "data",
  },
  {
    name: "Navigation",
    description: "Components for navigation and wayfinding",
    components: ["Breadcrumb", "Pagination", "Menu", "Sidebar", "Header"],
    icon: "navigation",
  },
];

export const getComponentsByCategory = (category: string): string[] => {
  const cat = componentCategories.find(c => c.name === category);
  return cat ? cat.components : [];
};

export const getComponentCategory = (componentName: string): string => {
  for (const category of componentCategories) {
    if (category.components.includes(componentName)) {
      return category.name;
    }
  }
  return "Other";
};

export const getComponentExamples = (componentName: string): ExampleInfo[] => {
  return [
    {
      name: "Default",
      description: `Basic ${componentName} example`,
      code: `<${componentName}>${componentName} content</${componentName}>`,
      props: {},
      children: `${componentName} content`,
    },
  ];
};

export const generateComponentId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export const getComponentPath = (componentName: string): string => {
  return `/components/${generateComponentId(componentName)}`;
};

export const isComponentImplemented = (componentName: string): boolean => {
  const implementedComponents = [
    "Button",
    "Input",
    "TextArea",
    "Checkbox",
    "Radio",
    "Select",
    "Switch",
    "Label",
    "Card",
    "Separator",
    "Container",
    "Grid",
    "Stack",
    "Spacer",
    "Alert",
    "Badge",
    "Progress",
    "Skeleton",
    "Spinner",
    "Toast",
    "Modal",
    "Dropdown",
    "Tabs",
    "Accordion",
    "Tooltip",
    "Popover",
    "Table",
    "List",
    "Typography",
    "Avatar",
    "Empty State",
    "Stats",
    "Breadcrumb",
    "Pagination",
    "Menu",
    "Sidebar",
    "Header",
  ];

  return implementedComponents.includes(componentName);
};
