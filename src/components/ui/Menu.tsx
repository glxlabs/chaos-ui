import React, { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, Check, Circle } from "lucide-react";
import { cn } from "../../utils/cn";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
  href?: string;
  target?: string;
  onClick?: () => void;
  shortcut?: string;
  selected?: boolean;
  type?: "item" | "checkbox" | "radio";
  checked?: boolean;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[];
  variant?: "default" | "brutalist" | "minimal" | "context";
  size?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: "bottom" | "top" | "left" | "right";
  align?: "start" | "center" | "end";
  offset?: number;
  modal?: boolean;
  closeOnSelect?: boolean;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      items,
      variant = "default",
      size = "md",
      orientation = "vertical",
      trigger,
      open,
      onOpenChange,
      position = "bottom",
      align = "start",
      offset = 4,
      modal = false,
      closeOnSelect = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(open || false);
    const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const itemSizeClasses = {
      sm: "px-3 py-2",
      md: "px-4 py-3",
      lg: "px-5 py-4",
    };

    const variantClasses = {
      default: "bg-cyber-dark border border-cyber-green/20 shadow-lg",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal",
      minimal: "bg-cyber-dark/95 border border-cyber-green/10",
      context: "bg-cyber-dark border border-cyber-green/30 shadow-xl",
    };

    const orientationClasses = {
      vertical: "flex-col min-w-48",
      horizontal: "flex-row",
    };

    useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleEscape);
        };
      }
    }, [isOpen]);

    const handleOpen = () => {
      setIsOpen(true);
      onOpenChange?.(true);
    };

    const handleClose = () => {
      setIsOpen(false);
      setOpenSubmenus(new Set());
      onOpenChange?.(false);
    };

    const handleToggle = () => {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    };

    const handleItemClick = (item: MenuItem) => {
      if (item.disabled) return;

      if (item.onClick) {
        item.onClick();
      }

      if (item.href) {
        window.open(item.href, item.target || "_self");
      }

      if (closeOnSelect && !item.children?.length) {
        handleClose();
      }
    };

    const toggleSubmenu = (itemId: string) => {
      setOpenSubmenus(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    };

    const renderMenuItem = (item: MenuItem, depth: number = 0) => {
      if (item.divider) {
        return <div key={item.id} className="h-px bg-cyber-green/20 mx-2 my-1" role="separator" />;
      }

      const hasChildren = item.children && item.children.length > 0;
      const isSubmenuOpen = openSubmenus.has(item.id);

      const itemClasses = cn(
        "flex items-center justify-between w-full text-left transition-colors cursor-pointer group",
        itemSizeClasses[size],
        sizeClasses[size],
        item.disabled
          ? "text-cyber-gray cursor-not-allowed"
          : "text-cyber-white hover:bg-cyber-green/10 hover:text-cyber-green",
        item.selected && "bg-cyber-green/20 text-cyber-green",
        depth > 0 && "pl-8"
      );

      const getItemIcon = () => {
        if (item.type === "checkbox") {
          return item.checked ? (
            <Check className="w-4 h-4 text-cyber-green" />
          ) : (
            <div className="w-4 h-4 border border-cyber-green/40 rounded" />
          );
        }

        if (item.type === "radio") {
          return item.checked ? (
            <Circle className="w-4 h-4 text-cyber-green fill-current" />
          ) : (
            <Circle className="w-4 h-4 border border-cyber-green/40 rounded-full" />
          );
        }

        return item.icon;
      };

      return (
        <div key={item.id}>
          <div
            className={itemClasses}
            onClick={() => {
              if (hasChildren) {
                toggleSubmenu(item.id);
              } else {
                handleItemClick(item);
              }
            }}
            role="menuitem"
            aria-expanded={hasChildren ? isSubmenuOpen : undefined}
            aria-haspopup={hasChildren}
          >
            <div className="flex items-center gap-3">
              {getItemIcon() && (
                <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  {getItemIcon()}
                </span>
              )}
              <span className="font-mono">{item.label}</span>
            </div>

            <div className="flex items-center gap-2">
              {item.shortcut && (
                <span className="text-cyber-gray text-xs font-mono">{item.shortcut}</span>
              )}
              {hasChildren && (
                <ChevronRight
                  className={cn("w-4 h-4 transition-transform", isSubmenuOpen && "rotate-90")}
                />
              )}
            </div>
          </div>

          {hasChildren && isSubmenuOpen && (
            <div className="ml-4 border-l border-cyber-green/20 pl-2">
              {item.children!.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    };

    const getPositionClasses = () => {
      const classes = ["absolute", "z-50"];

      switch (position) {
        case "top":
          classes.push("bottom-full", "mb-1");
          break;
        case "bottom":
          classes.push("top-full", "mt-1");
          break;
        case "left":
          classes.push("right-full", "mr-1");
          break;
        case "right":
          classes.push("left-full", "ml-1");
          break;
      }

      switch (align) {
        case "start":
          if (position === "top" || position === "bottom") {
            classes.push("left-0");
          } else {
            classes.push("top-0");
          }
          break;
        case "center":
          if (position === "top" || position === "bottom") {
            classes.push("left-1/2", "-translate-x-1/2");
          } else {
            classes.push("top-1/2", "-translate-y-1/2");
          }
          break;
        case "end":
          if (position === "top" || position === "bottom") {
            classes.push("right-0");
          } else {
            classes.push("bottom-0");
          }
          break;
      }

      return classes.join(" ");
    };

    const menuClasses = cn(
      "flex rounded-lg overflow-hidden",
      sizeClasses[size],
      orientationClasses[orientation],
      variantClasses[variant],
      getPositionClasses(),
      className
    );

    if (!trigger) {
      return (
        <div ref={ref} className={menuClasses} {...props}>
          {items.map(item => renderMenuItem(item))}
        </div>
      );
    }

    return (
      <div ref={ref} className="relative inline-block">
        <button
          ref={triggerRef}
          onClick={handleToggle}
          className="inline-flex items-center justify-center"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          {trigger}
        </button>

        {isOpen && (
          <>
            {modal && (
              <div className="fixed inset-0 bg-cyber-black/50 z-40" onClick={handleClose} />
            )}
            <div ref={menuRef} className={menuClasses} {...props}>
              {items.map(item => renderMenuItem(item))}
            </div>
          </>
        )}
      </div>
    );
  }
);

Menu.displayName = "Menu";

// Menu Bar Component
export interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[];
  variant?: "default" | "brutalist" | "minimal";
  size?: "sm" | "md" | "lg";
}

export const MenuBar = forwardRef<HTMLDivElement, MenuBarProps>(
  ({ items, variant = "default", size = "md", className = "", ...props }, ref) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const barClasses = cn(
      "flex items-center bg-cyber-dark border-b border-cyber-green/20",
      className
    );

    return (
      <div ref={ref} className={barClasses} {...props}>
        {items.map(item => (
          <Menu
            key={item.id}
            items={item.children || []}
            variant={variant}
            size={size}
            trigger={
              <div className="px-4 py-2 text-cyber-white hover:bg-cyber-green/10 hover:text-cyber-green transition-colors font-mono">
                {item.label}
              </div>
            }
            open={activeMenu === item.id}
            onOpenChange={open => {
              setActiveMenu(open ? item.id : null);
            }}
            position="bottom"
            align="start"
          />
        ))}
      </div>
    );
  }
);

MenuBar.displayName = "MenuBar";

// Context Menu Component
export interface ContextMenuProps extends Omit<MenuProps, "trigger"> {
  children: React.ReactNode;
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, items, ...props }, ref) => {
    const [contextMenu, setContextMenu] = useState<{
      x: number;
      y: number;
      show: boolean;
    }>({ x: 0, y: 0, show: false });

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        show: true,
      });
    };

    const handleClose = () => {
      setContextMenu(prev => ({ ...prev, show: false }));
    };

    return (
      <div ref={ref} onContextMenu={handleContextMenu}>
        {children}

        {contextMenu.show && (
          <div
            className="fixed inset-0 z-50"
            onClick={handleClose}
            onContextMenu={e => e.preventDefault()}
          >
            <div
              className="absolute"
              style={{
                left: contextMenu.x,
                top: contextMenu.y,
              }}
            >
              <Menu
                items={items}
                variant="context"
                open={contextMenu.show}
                onOpenChange={open => !open && handleClose()}
                {...props}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

ContextMenu.displayName = "ContextMenu";

// Dropdown Menu Component (simplified wrapper)
export interface DropdownMenuProps extends MenuProps {
  label?: string;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ label = "Menu", trigger, ...props }, ref) => {
    const defaultTrigger = trigger || (
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-dark border border-cyber-green/20 text-cyber-white hover:bg-cyber-green/10 hover:text-cyber-green transition-colors font-mono">
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
    );

    return <Menu ref={ref} trigger={defaultTrigger} {...props} />;
  }
);

DropdownMenu.displayName = "DropdownMenu";

export { Menu };
export default Menu;
