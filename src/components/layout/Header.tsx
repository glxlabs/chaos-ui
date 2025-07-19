import React from "react";
import { Link } from "react-router-dom";
import { Github, Copy, Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { useTheme } from "../../contexts/ThemeContext";

interface HeaderProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarOpen }) => {
  const { toggleTheme, isDark } = useTheme();
  const { copied, copy } = useCopyToClipboard();

  const handleInstallCopy = async () => {
    await copy("npm install @chaos/ui");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/95 backdrop-blur-brutal border-b border-cyber-green">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyber-green relative overflow-hidden border-2 border-cyber-green">
              <div className="absolute inset-0 bg-cyber-magenta animate-pulse opacity-30" />
              <div className="absolute inset-1 bg-cyber-black" />
              <div className="absolute inset-2 bg-cyber-green animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h1
                className="text-xl md:text-2xl font-brutalist font-black tracking-tighter text-cyber-green glitch-text hover:animate-rgb-split"
                data-text="ChaoS/UI"
              >
                ChaoS/UI
              </h1>
              <p className="text-xs text-cyber-gray font-mono uppercase">
                Brutalist React Components
              </p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors"
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/glxlabs/chaos-ui.git"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Install Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleInstallCopy}
              className="hidden md:inline-flex"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "npm install @chaos/ui"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
