import React, { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../utils/cn";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  options: DropdownOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: "default" | "brutalist" | "ghost";
  size?: "sm" | "md" | "lg";
  position?: "bottom" | "top" | "left" | "right";
  maxHeight?: number;
  searchable?: boolean;
  multiple?: boolean;
  closeOnSelect?: boolean;
  brutalistBorder?: boolean;
  glitchOnOpen?: boolean;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select an option",
      disabled = false,
      variant = "default",
      size = "md",
      position = "bottom",
      maxHeight = 200,
      searchable = false,
      multiple = false,
      closeOnSelect = true,
      brutalistBorder = false,
      glitchOnOpen = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValues, setSelectedValues] = useState<string[]>(
      multiple ? (Array.isArray(value) ? value : value ? [value] : []) : []
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    const sizeClasses = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-3",
    };

    const variantClasses = {
      default: "bg-cyber-dark border-cyber-green text-cyber-white",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal",
      ghost: "bg-transparent border-transparent hover:bg-cyber-green/10",
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const filteredOptions = searchable
      ? options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
      : options;

    const handleOptionSelect = (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue];
        setSelectedValues(newValues);
        onValueChange?.(newValues.join(","));
      } else {
        onValueChange?.(optionValue);
        if (closeOnSelect) {
          setIsOpen(false);
        }
      }
    };

    const getDisplayValue = () => {
      if (multiple && selectedValues.length > 0) {
        return selectedValues.length === 1
          ? options.find(opt => opt.value === selectedValues[0])?.label
          : `${selectedValues.length} selected`;
      }
      if (!multiple && value) {
        return options.find(opt => opt.value === value)?.label;
      }
      return placeholder;
    };

    const triggerClasses = cn(
      "flex items-center justify-between w-full border rounded-md cursor-pointer transition-colors",
      "hover:border-cyber-green/50 focus:outline-none focus:ring-2 focus:ring-cyber-green/50",
      sizeClasses[size],
      variantClasses[variant],
      brutalistBorder && "border-brutal",
      disabled && "opacity-50 cursor-not-allowed",
      isOpen && glitchOnOpen && "animate-glitch-brutal",
      className
    );

    const dropdownClasses = cn(
      "absolute z-50 w-full mt-1 bg-cyber-dark border border-cyber-green rounded-md shadow-lg",
      brutalistBorder && "border-brutal shadow-brutal",
      position === "top" && "bottom-full mt-0 mb-1",
      position === "left" && "right-full mt-0 mr-1",
      position === "right" && "left-full mt-0 ml-1"
    );

    const optionClasses = (option: DropdownOption, isSelected: boolean) =>
      cn(
        "flex items-center justify-between px-4 py-2 cursor-pointer transition-colors",
        "hover:bg-cyber-green/10 hover:text-cyber-green",
        isSelected && "bg-cyber-green/20 text-cyber-green",
        option.disabled && "opacity-50 cursor-not-allowed"
      );

    return (
      <div ref={ref} className="relative" {...props}>
        <div
          ref={dropdownRef}
          className={triggerClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className={cn(!value && !selectedValues.length && "text-cyber-gray")}>
            {getDisplayValue()}
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </div>

        {isOpen && (
          <div className={dropdownClasses}>
            {searchable && (
              <div className="p-2 border-b border-cyber-green/20">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full px-3 py-1 bg-cyber-dark border border-cyber-green/30 rounded text-cyber-white",
                    "focus:outline-none focus:ring-2 focus:ring-cyber-green/50"
                  )}
                />
              </div>
            )}

            <div className="max-h-48 overflow-y-auto scrollbar-brutal" style={{ maxHeight }}>
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-cyber-gray text-center">No options found</div>
              ) : (
                filteredOptions.map(option => {
                  const isSelected = multiple
                    ? selectedValues.includes(option.value)
                    : value === option.value;

                  return (
                    <div
                      key={option.value}
                      className={optionClasses(option, isSelected)}
                      onClick={() => !option.disabled && handleOptionSelect(option.value)}
                    >
                      <div className="flex items-center space-x-2">
                        {option.icon && <span className="w-4 h-4">{option.icon}</span>}
                        <span>{option.label}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
export default Dropdown;
