import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Hash,
  Zap,
  Layout,
  MousePointer,
  Database,
  Navigation as NavigationIcon,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { componentCategories } from "../../utils/component-registry";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Form Elements"])
  );
  const location = useLocation();

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const getCategoryIcon = (categoryName: string) => {
    const iconClasses = "w-4 h-4";
    switch (categoryName) {
      case "Form Elements":
        return <Hash className={iconClasses} />;
      case "Layout & Structure":
        return <Layout className={iconClasses} />;
      case "Feedback & Status":
        return <Zap className={iconClasses} />;
      case "Interactive & Overlay":
        return <MousePointer className={iconClasses} />;
      case "Data Display":
        return <Database className={iconClasses} />;
      case "Navigation":
        return <NavigationIcon className={iconClasses} />;
      default:
        return <Hash className={iconClasses} />;
    }
  };

  const getCategoryRoute = (categoryName: string) => {
    switch (categoryName) {
      case "Form Elements":
        return "/components/forms";
      case "Layout & Structure":
        return "/components/layout";
      case "Feedback & Status":
        return "/components/layout";
      case "Interactive & Overlay":
        return "/components/interactive";
      case "Data Display":
        return "/components/data";
      case "Navigation":
        return "/components/navigation";
      default:
        return "/";
    }
  };

  const getComponentRoute = (componentName: string) => {
    const slug = componentName.toLowerCase().replace(/\s+/g, "-");
    // Map component names to their actual IDs
    const componentMap: Record<string, string> = {
      button: "/#button",
      input: "/#input",
      textarea: "/#textarea",
      checkbox: "/#checkbox",
      radio: "/#radio",
      select: "/#select",
      switch: "/#switch",
      label: "/#label",
      card: "/#card",
      separator: "/#separator",
      alert: "/#alert",
      badge: "/#badge",
      progress: "/#progress",
      skeleton: "/#skeleton",
      spinner: "/#spinner",
      toast: "/#toast",
      modal: "/#modal",
      dropdown: "/#dropdown",
      tabs: "/#tabs",
      accordion: "/#accordion",
      tooltip: "/#tooltip",
      popover: "/#popover",
      table: "/#table",
      list: "/#list",
      typography: "/#typography",
      avatar: "/#avatar",
      "empty-state": "/#empty-state",
      stats: "/#stats",
      breadcrumb: "/#breadcrumb",
      pagination: "/#pagination",
      menu: "/#menu",
      sidebar: "/#sidebar",
      header: "/#header",
    };

    return componentMap[slug] || `/#${slug}`;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-cyber-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-cyber-dark border-r border-cyber-green overflow-y-auto scrollbar-brutal z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6">
          <h2 className="text-lg font-brutalist font-bold uppercase tracking-wide text-cyber-green mb-6">
            Components
          </h2>

          <nav className="space-y-2">
            {componentCategories.map(category => {
              const isExpanded = expandedCategories.has(category.name);

              return (
                <div key={category.name} className="space-y-1">
                  <Link
                    to={getCategoryRoute(category.name)}
                    className={cn(
                      "w-full flex items-center justify-between p-2 text-left hover:bg-cyber-green/10 hover:text-cyber-green transition-colors font-mono font-semibold",
                      location.pathname === getCategoryRoute(category.name)
                        ? "text-cyber-green bg-cyber-green/10"
                        : "text-cyber-white"
                    )}
                    onClick={() => toggleCategory(category.name)}
                  >
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(category.name)}
                      <span className="text-sm">{category.name}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Link>

                  {isExpanded && (
                    <div className="ml-6 space-y-1">
                      {category.components.map(componentName => (
                        <Link
                          key={componentName}
                          to={getComponentRoute(componentName)}
                          className="block p-2 text-sm text-cyber-gray hover:text-cyber-green hover:bg-cyber-green/5 transition-colors font-mono"
                        >
                          {componentName}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-8 p-4 bg-cyber-black border-brutal border-cyber-green">
            <h3 className="text-sm font-brutalist font-bold uppercase text-cyber-green mb-2">
              Quick Start
            </h3>
            <code className="text-xs text-cyber-gray font-mono">
              npm install @glitchlabs/chaosui
            </code>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
