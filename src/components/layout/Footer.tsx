import React from "react";
import { Heart, Github, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 ml-64 border-t border-cyber-green bg-cyber-dark">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-cyber-green" />
              <h3 className="text-lg font-brutalist font-bold text-cyber-green">ChaoS/UI</h3>
            </div>
            <p className="text-sm text-cyber-gray">
              Brutalist React component library for developers who embrace the chaos.
            </p>
          </div>

          {/* Components */}
          <div className="space-y-4">
            <h4 className="text-sm font-brutalist font-bold uppercase text-cyber-green">
              Components
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#buttons"
                  className="text-cyber-gray hover:text-cyber-green transition-colors"
                >
                  Buttons
                </a>
              </li>
              <li>
                <a
                  href="#forms"
                  className="text-cyber-gray hover:text-cyber-green transition-colors"
                >
                  Forms
                </a>
              </li>
              <li>
                <a
                  href="#layout"
                  className="text-cyber-gray hover:text-cyber-green transition-colors"
                >
                  Layout
                </a>
              </li>
              <li>
                <a
                  href="#interactive"
                  className="text-cyber-gray hover:text-cyber-green transition-colors"
                >
                  Interactive
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-brutalist font-bold uppercase text-cyber-green">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/glxlabs/chaos-ui.git"
                  className="text-cyber-gray hover:text-cyber-green transition-colors"
                >
                  Contributing
                </a>
              </li>
              <li>
                <a
                  href="https://theglitchlabs.xyz"
                  className="text-cyber-gray hover:text-cyber-green transition-colors"
                >
                  Website
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-sm font-brutalist font-bold uppercase text-cyber-green">
              Community
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/glxlabs/chaos-ui.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-gray hover:text-cyber-green transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/theglitchlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-gray hover:text-cyber-green transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyber-green/20 flex flex-col md:flex-row items-center justify-between text-sm text-cyber-gray">
          <p>
            © {new Date().getFullYear()} ChaoS/UI. Built with{" "}
            <Heart className="w-4 h-4 inline text-cyber-magenta" aria-label="love" /> by
            theGlitchLabs
          </p>
          <p className="mt-2 md:mt-0">
            <span className="font-mono">v1.0.0</span> • MIT License
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
