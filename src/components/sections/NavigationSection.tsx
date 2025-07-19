import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Breadcrumb, SimpleBreadcrumb, BreadcrumbItem } from "../ui/Breadcrumb";
import {
  Pagination,
  SimplePagination,
  PaginationWithSize,
  CompactPagination,
  usePagination,
} from "../ui/Pagination";
import { Menu, MenuBar, ContextMenu, DropdownMenu, MenuItem } from "../ui/Menu";
import { ComponentDemo } from "../showcase/ComponentDemo";
import { ComponentCopyButton } from "../showcase/CopyButton";
import {
  Home,
  Settings,
  User,
  Bell,
  File,
  Edit,
  Trash2,
  Copy,
  Download,
  Plus,
  MoreHorizontal,
  Layout,
  Palette,
} from "lucide-react";

const NavigationSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const totalItems = 73;
  const totalPages = Math.ceil(totalItems / pageSize);

  const {
    currentPage: hookCurrentPage,
    totalPages: hookTotalPages,
    handlePageChange: hookHandlePageChange,
  } = usePagination(totalItems, pageSize);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Components", href: "/components" },
    { label: "UI Library", href: "/components/ui" },
    { label: "Navigation", href: "/components/navigation", current: true },
  ];

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="w-4 h-4" />,
      onClick: () => setSelectedMenuItem("profile"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      children: [
        {
          id: "general",
          label: "General",
          onClick: () => setSelectedMenuItem("general"),
        },
        {
          id: "security",
          label: "Security",
          onClick: () => setSelectedMenuItem("security"),
        },
        {
          id: "notifications",
          label: "Notifications",
          icon: <Bell className="w-4 h-4" />,
          onClick: () => setSelectedMenuItem("notifications"),
        },
      ],
    },
    {
      id: "divider1",
      label: "",
      divider: true,
    },
    {
      id: "help",
      label: "Help & Support",
      shortcut: "?",
      onClick: () => setSelectedMenuItem("help"),
    },
    {
      id: "logout",
      label: "Sign Out",
      onClick: () => setSelectedMenuItem("logout"),
    },
  ];

  const contextMenuItems: MenuItem[] = [
    {
      id: "copy",
      label: "Copy",
      icon: <Copy className="w-4 h-4" />,
      shortcut: "Ctrl+C",
      onClick: () => console.log("Copy"),
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit className="w-4 h-4" />,
      shortcut: "Ctrl+E",
      onClick: () => console.log("Edit"),
    },
    {
      id: "divider1",
      label: "",
      divider: true,
    },
    {
      id: "download",
      label: "Download",
      icon: <Download className="w-4 h-4" />,
      onClick: () => console.log("Download"),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: () => console.log("Delete"),
    },
  ];

  const menuBarItems: MenuItem[] = [
    {
      id: "file",
      label: "File",
      children: [
        {
          id: "new",
          label: "New",
          icon: <Plus className="w-4 h-4" />,
          shortcut: "Ctrl+N",
          onClick: () => console.log("New"),
        },
        {
          id: "open",
          label: "Open",
          icon: <File className="w-4 h-4" />,
          shortcut: "Ctrl+O",
          onClick: () => console.log("Open"),
        },
        {
          id: "divider1",
          label: "",
          divider: true,
        },
        {
          id: "save",
          label: "Save",
          shortcut: "Ctrl+S",
          onClick: () => console.log("Save"),
        },
      ],
    },
    {
      id: "edit",
      label: "Edit",
      children: [
        {
          id: "undo",
          label: "Undo",
          shortcut: "Ctrl+Z",
          onClick: () => console.log("Undo"),
        },
        {
          id: "redo",
          label: "Redo",
          shortcut: "Ctrl+Y",
          onClick: () => console.log("Redo"),
        },
      ],
    },
    {
      id: "view",
      label: "View",
      children: [
        {
          id: "layout",
          label: "Layout",
          icon: <Layout className="w-4 h-4" />,
          children: [
            {
              id: "sidebar",
              label: "Show Sidebar",
              type: "checkbox",
              checked: true,
              onClick: () => console.log("Toggle Sidebar"),
            },
            {
              id: "toolbar",
              label: "Show Toolbar",
              type: "checkbox",
              checked: false,
              onClick: () => console.log("Toggle Toolbar"),
            },
          ],
        },
        {
          id: "theme",
          label: "Theme",
          icon: <Palette className="w-4 h-4" />,
          children: [
            {
              id: "dark",
              label: "Dark",
              type: "radio",
              checked: true,
              onClick: () => console.log("Dark theme"),
            },
            {
              id: "light",
              label: "Light",
              type: "radio",
              checked: false,
              onClick: () => console.log("Light theme"),
            },
          ],
        },
      ],
    },
  ];

  return (
    <section id="navigation" className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                Navigation
              </h2>
              <p className="text-lg text-cyber-gray mt-2">
                Navigation components for wayfinding and page control
              </p>
            </div>
          </div>

          {/* Breadcrumb Demo */}
          <div id="breadcrumb" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Breadcrumb
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Navigation path indicators with different styles and separators
                </p>
              </div>
              <ComponentCopyButton componentName="Breadcrumb" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Breadcrumb Component"
              description="Navigation breadcrumbs with different variants and separators"
              component={
                <div className="space-y-4">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Default Breadcrumb
                    </h4>
                    <Breadcrumb items={breadcrumbItems} />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Brutalist Variant
                    </h4>
                    <Breadcrumb items={breadcrumbItems} variant="brutalist" separator="arrow" />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Pills Variant
                    </h4>
                    <Breadcrumb items={breadcrumbItems} variant="pills" separator="dot" size="sm" />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Simple Breadcrumb
                    </h4>
                    <SimpleBreadcrumb
                      paths={["components", "ui", "navigation"]}
                      variant="minimal"
                    />
                  </div>
                </div>
              }
              code={`const breadcrumbItems = [
  { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  { label: "Components", href: "/components" },
  { label: "UI Library", href: "/components/ui" },
  { label: "Navigation", href: "/components/navigation", current: true },
];

// Default breadcrumb
<Breadcrumb items={breadcrumbItems} />

// Brutalist variant with arrow separator
<Breadcrumb 
  items={breadcrumbItems} 
  variant="brutalist" 
  separator="arrow"
/>

// Pills variant with dot separator
<Breadcrumb 
  items={breadcrumbItems} 
  variant="pills" 
  separator="dot"
  size="sm"
/>

// Simple breadcrumb from paths
<SimpleBreadcrumb 
  paths={["components", "ui", "navigation"]} 
  variant="minimal"
/>`}
            />

            <ComponentDemo
              title="Breadcrumb Features"
              description="Advanced breadcrumb features and customization"
              component={
                <div className="space-y-4">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      With Max Items
                    </h4>
                    <Breadcrumb
                      items={[
                        { label: "Home", href: "/" },
                        { label: "Level 1", href: "/level1" },
                        { label: "Level 2", href: "/level2" },
                        { label: "Level 3", href: "/level3" },
                        { label: "Level 4", href: "/level4" },
                        { label: "Current", current: true },
                      ]}
                      maxItems={4}
                      variant="default"
                    />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      With Home Icon
                    </h4>
                    <Breadcrumb
                      items={[
                        { label: "Components", href: "/components" },
                        { label: "Navigation", current: true },
                      ]}
                      showHome
                      variant="brutalist"
                    />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Different Separators
                    </h4>
                    <div className="space-y-2">
                      <Breadcrumb
                        items={breadcrumbItems.slice(0, 3)}
                        separator="slash"
                        variant="minimal"
                        size="sm"
                      />
                      <Breadcrumb
                        items={breadcrumbItems.slice(0, 3)}
                        separator="chevron"
                        variant="minimal"
                        size="sm"
                      />
                      <Breadcrumb
                        items={breadcrumbItems.slice(0, 3)}
                        separator="dot"
                        variant="minimal"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              }
              code={`// Breadcrumb with max items (truncated)
<Breadcrumb 
  items={longBreadcrumbItems}
  maxItems={4}
  variant="default"
/>

// Breadcrumb with home icon
<Breadcrumb 
  items={items}
  showHome
  variant="brutalist"
/>

// Different separators
<Breadcrumb items={items} separator="slash" />
<Breadcrumb items={items} separator="chevron" />
<Breadcrumb items={items} separator="dot" />
<Breadcrumb items={items} separator="arrow" />`}
            />
          </div>

          {/* Pagination Demo */}
          <div id="pagination" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Pagination
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Page navigation controls with different styles and features
                </p>
              </div>
              <ComponentCopyButton componentName="Pagination" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
            <ComponentDemo
              title="Pagination Component"
              description="Pagination with different variants and features"
              fullWidth={true}
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Default Pagination
                    </h4>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      showInfo
                      totalItems={totalItems}
                      itemsPerPage={pageSize}
                    />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Brutalist Variant
                    </h4>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      variant="brutalist"
                      size="lg"
                      showSiblings={2}
                    />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Pills Variant
                    </h4>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      variant="pills"
                      size="sm"
                      showSiblings={1}
                    />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Compact Pagination
                    </h4>
                    <CompactPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      variant="minimal"
                    />
                  </div>
                </div>
              }
              code={`const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(totalItems / pageSize);

// Default pagination with info
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  showInfo
  totalItems={totalItems}
  itemsPerPage={pageSize}
/>

// Brutalist variant
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  variant="brutalist"
  size="lg"
  showSiblings={2}
/>

// Pills variant
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  variant="pills"
  size="sm"
/>

// Compact pagination
<CompactPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  variant="minimal"
/>`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
            <ComponentDemo
              title="Pagination with Page Size"
              description="Pagination with page size selector"
              fullWidth={true}
              component={
                <div className="space-y-4">
                  <PaginationWithSize
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={pageSize}
                    onPageSizeChange={setPageSize}
                    totalItems={totalItems}
                    pageSizeOptions={[5, 10, 20, 50]}
                    variant="default"
                  />
                </div>
              }
              code={`<PaginationWithSize
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  itemsPerPage={pageSize}
  onPageSizeChange={setPageSize}
  totalItems={totalItems}
  pageSizeOptions={[5, 10, 20, 50]}
  variant="default"
/>`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Pagination Hook"
              description="Using the usePagination hook for state management"
              fullWidth={true}
              component={
                <div className="space-y-4">
                  <div className="text-sm text-cyber-gray">Pagination with custom hook:</div>
                  <SimplePagination
                    currentPage={hookCurrentPage}
                    totalItems={totalItems}
                    itemsPerPage={pageSize}
                    onPageChange={hookHandlePageChange}
                    variant="brutalist"
                    size="sm"
                  />
                  <div className="text-xs text-cyber-gray">
                    Current page: {hookCurrentPage} of {hookTotalPages}
                  </div>
                </div>
              }
              code={`// Using the pagination hook
const { 
  currentPage, 
  totalPages, 
  handlePageChange 
} = usePagination(totalItems, pageSize);

<SimplePagination
  currentPage={currentPage}
  totalItems={totalItems}
  itemsPerPage={pageSize}
  onPageChange={handlePageChange}
  variant="brutalist"
/>`}
            />
          </div>

          {/* Menu Demo */}
          <div id="menu" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Menu
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Interactive menu components with dropdowns and context menus
                </p>
              </div>
              <ComponentCopyButton componentName="Menu" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Menu Component"
              description="Dropdown menus with different variants and features"
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Dropdown Menu
                    </h4>
                    <div className="flex gap-3">
                      <DropdownMenu label="User Menu" items={menuItems} variant="default" />
                      <DropdownMenu
                        label="Actions"
                        items={menuItems}
                        variant="brutalist"
                        trigger={
                          <Button variant="primary">
                            <MoreHorizontal className="w-4 h-4 mr-2" />
                            More
                          </Button>
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">Context Menu</h4>
                    <ContextMenu items={contextMenuItems}>
                      <div className="p-6 bg-cyber-dark/30 border border-cyber-green/20 rounded text-center text-cyber-white">
                        Right-click me for context menu
                      </div>
                    </ContextMenu>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Selected Item
                    </h4>
                    {selectedMenuItem && (
                      <Badge variant="primary">Selected: {selectedMenuItem}</Badge>
                    )}
                  </div>
                </div>
              }
              code={`const menuItems = [
  {
    id: "profile",
    label: "Profile",
    icon: <User className="w-4 h-4" />,
    onClick: () => console.log("Profile"),
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-4 h-4" />,
    children: [
      {
        id: "general",
        label: "General",
        onClick: () => console.log("General"),
      },
      {
        id: "security",
        label: "Security",
        onClick: () => console.log("Security"),
      },
    ],
  },
  {
    id: "divider1",
    label: "",
    divider: true,
  },
  {
    id: "logout",
    label: "Sign Out",
    onClick: () => console.log("Sign Out"),
  },
];

// Dropdown menu
<DropdownMenu
  label="User Menu"
  items={menuItems}
  variant="default"
/>

// Context menu
<ContextMenu items={contextMenuItems}>
  <div>Right-click me for context menu</div>
</ContextMenu>`}
            />

            <ComponentDemo
              title="Menu Bar"
              description="Horizontal menu bar with nested menus"
              component={
                <div className="space-y-4">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">Menu Bar</h4>
                    <MenuBar items={menuBarItems} variant="brutalist" />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Menu Features
                    </h4>
                    <div className="space-y-2">
                      <div className="text-xs text-cyber-gray">• Nested submenus</div>
                      <div className="text-xs text-cyber-gray">• Keyboard shortcuts</div>
                      <div className="text-xs text-cyber-gray">• Icons and dividers</div>
                      <div className="text-xs text-cyber-gray">• Checkbox and radio items</div>
                      <div className="text-xs text-cyber-gray">• Context menu support</div>
                      <div className="text-xs text-cyber-gray">• Brutalist styling</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Menu Variants
                    </h4>
                    <div className="flex gap-2">
                      <Menu
                        items={[
                          { id: "1", label: "Default", onClick: () => {} },
                          { id: "2", label: "Item 2", onClick: () => {} },
                        ]}
                        variant="default"
                        trigger={<Button size="sm">Default</Button>}
                      />
                      <Menu
                        items={[
                          { id: "1", label: "Brutalist", onClick: () => {} },
                          { id: "2", label: "Item 2", onClick: () => {} },
                        ]}
                        variant="brutalist"
                        trigger={
                          <Button size="sm" variant="primary">
                            Brutalist
                          </Button>
                        }
                      />
                      <Menu
                        items={[
                          { id: "1", label: "Minimal", onClick: () => {} },
                          { id: "2", label: "Item 2", onClick: () => {} },
                        ]}
                        variant="minimal"
                        trigger={
                          <Button size="sm" variant="ghost">
                            Minimal
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </div>
              }
              code={`const menuBarItems = [
  {
    id: "file",
    label: "File",
    children: [
      {
        id: "new",
        label: "New",
        icon: <Plus className="w-4 h-4" />,
        shortcut: "Ctrl+N",
        onClick: () => console.log("New"),
      },
      {
        id: "open",
        label: "Open",
        icon: <File className="w-4 h-4" />,
        shortcut: "Ctrl+O",
        onClick: () => console.log("Open"),
      },
    ],
  },
  // ... more items
];

// Menu bar
<MenuBar
  items={menuBarItems}
  variant="brutalist"
/>

// Individual menu with trigger
<Menu
  items={menuItems}
  variant="brutalist"
  trigger={<Button>Open Menu</Button>}
/>`}
            />
          </div>

          {/* Sidebar Demo */}
          <div id="sidebar" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Sidebar
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Navigation sidebar with collapsible sections and component links
                </p>
              </div>
              <ComponentCopyButton componentName="Sidebar" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
            <ComponentDemo
              title="Sidebar Component"
              description="The application sidebar with navigation categories and components"
              component={
                <div className="space-y-4">
                  <div className="text-cyber-gray text-sm">
                    The sidebar is currently active on the left side of this application. It
                    includes:
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-cyber-gray">• Component categories with icons</div>
                    <div className="text-xs text-cyber-gray">• Expandable/collapsible sections</div>
                    <div className="text-xs text-cyber-gray">• Individual component links</div>
                    <div className="text-xs text-cyber-gray">• Active state indicators</div>
                    <div className="text-xs text-cyber-gray">
                      • Brutalist styling with cyber colors
                    </div>
                    <div className="text-xs text-cyber-gray">• Quick start installation guide</div>
                  </div>
                  <div className="p-4 bg-cyber-dark/30 border border-cyber-green/20 rounded">
                    <div className="text-cyber-green font-brutalist font-bold mb-2">Features:</div>
                    <div className="text-cyber-white text-sm">
                      • Fixed positioning with scrollable content
                      <br />
                      • Category-based component organization
                      <br />
                      • Hash-based navigation support
                      <br />• Responsive design patterns
                    </div>
                  </div>
                </div>
              }
              code={`import Sidebar from "./components/layout/Sidebar";
import { componentCategories } from "./utils/component-registry";

// The sidebar component with navigation
<aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-cyber-dark border-r border-cyber-green overflow-y-auto">
  <div className="p-6">
    <h2 className="text-lg font-brutalist font-bold uppercase tracking-wide text-cyber-green mb-6">
      Components
    </h2>
    
    <nav className="space-y-2">
      {componentCategories.map((category) => (
        <div key={category.name} className="space-y-1">
          <Link
            to={getCategoryRoute(category.name)}
            className="w-full flex items-center justify-between p-2 text-left hover:bg-cyber-green/10 hover:text-cyber-green transition-colors"
          >
            <div className="flex items-center space-x-2">
              {getCategoryIcon(category.name)}
              <span className="text-sm">{category.name}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
          
          {/* Individual component links */}
          <div className="ml-6 space-y-1">
            {category.components.map((componentName) => (
              <Link
                key={componentName}
                to={getComponentRoute(componentName)}
                className="block p-2 text-sm text-cyber-gray hover:text-cyber-green hover:bg-cyber-green/5 transition-colors"
              >
                {componentName}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  </div>
</aside>`}
            />
          </div>

          {/* Header Demo */}
          <div id="header" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Header
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Application header with logo, navigation, and brutalist styling
                </p>
              </div>
              <ComponentCopyButton componentName="Header" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
            <ComponentDemo
              title="Header Component"
              description="The application header with logo, navigation links, and GitHub link"
              component={
                <div className="space-y-4">
                  <div className="text-cyber-gray text-sm">
                    The header is currently active at the top of this application. It includes:
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-cyber-gray">
                      • ChaoS/UI logo with brutalist styling
                    </div>
                    <div className="text-xs text-cyber-gray">
                      • Main navigation links (Components, Docs, Examples)
                    </div>
                    <div className="text-xs text-cyber-gray">• GitHub repository link</div>
                    <div className="text-xs text-cyber-gray">• Fixed positioning with backdrop</div>
                    <div className="text-xs text-cyber-gray">• Responsive design</div>
                    <div className="text-xs text-cyber-gray">• Cyber-themed color scheme</div>
                  </div>
                  <div className="p-4 bg-cyber-dark/30 border border-cyber-green/20 rounded">
                    <div className="text-cyber-green font-brutalist font-bold mb-2">Features:</div>
                    <div className="text-cyber-white text-sm">
                      • Fixed header with z-index layering
                      <br />
                      • Brutalist logo with glitch effects
                      <br />
                      • Active link state indicators
                      <br />
                      • External link handling (GitHub)
                      <br />• Mobile-responsive navigation
                    </div>
                  </div>
                </div>
              }
              code={`import Header from "./components/layout/Header";
import { Link } from "react-router-dom";

// The header component
<header className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/90 backdrop-blur-sm border-b border-cyber-green">
  <div className="container mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-cyber-green"></div>
        <span className="text-xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
          ChaoS/UI
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center space-x-8">
        <Link
          to="/"
          className="text-cyber-white hover:text-cyber-green transition-colors font-mono font-semibold"
        >
          Components
        </Link>
        <Link
          to="/docs"
          className="text-cyber-white hover:text-cyber-green transition-colors font-mono font-semibold"
        >
          Docs
        </Link>
        <Link
          to="/examples"
          className="text-cyber-white hover:text-cyber-green transition-colors font-mono font-semibold"
        >
          Examples
        </Link>
        <a
          href="https://github.com/your-username/chaos-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyber-white hover:text-cyber-green transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
      </nav>
    </div>
  </div>
</header>`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavigationSection;
