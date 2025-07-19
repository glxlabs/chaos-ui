import React, { useState, useEffect } from "react";
import { Copy, Github, ArrowDown, Zap, Code, Palette } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card, CardContent } from "../ui/Card";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";

const HeroSection: React.FC = () => {
  const [glitchText, setGlitchText] = useState("ChaoS/UI");
  const { copied, copy } = useCopyToClipboard();

  const handleInstallCopy = async () => {
    await copy("npm install chaos-ui");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const original = "ChaoS/UI";
      let glitched = "";

      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.1) {
          glitched += chars[Math.floor(Math.random() * chars.length)];
        } else {
          glitched += original[i];
        }
      }

      setGlitchText(glitched);

      setTimeout(() => {
        setGlitchText(original);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 brutal-grid opacity-10" />
      <div className="absolute inset-0 scanlines opacity-5" />

      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Hero Title */}
          <div className="space-y-4">
            <Badge variant="outline" size="md" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Version 1.0.0
            </Badge>

            <h1
              className="text-6xl md:text-8xl font-brutalist font-black uppercase tracking-tighter text-cyber-green glitch-text hover:animate-rgb-split"
              data-text={glitchText}
            >
              {glitchText}
            </h1>

            <p className="text-xl md:text-2xl text-cyber-gray max-w-3xl mx-auto">
              Brutalist React component library for developers who{" "}
              <span className="text-cyber-magenta font-bold">embrace the chaos</span>
            </p>

            <p className="text-lg text-cyber-white max-w-2xl mx-auto">
              Copy-paste components with zero dependencies. No design system BS. Just pure,
              unfiltered brutalist UI components that actually work.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleInstallCopy}
              className="px-8 py-4 text-lg"
            >
              <Copy className="w-5 h-5 mr-2" />
              {copied ? "Copied!" : "npm install chaos-ui"}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg"
              onClick={() => window.open("https://github.com/glxlabs/chaos-ui.git", "_blank")}
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="brutalist" hover glitchOnHover>
              <CardContent className="text-center space-y-3">
                <div className="w-12 h-12 bg-cyber-green mx-auto flex items-center justify-center">
                  <Copy className="w-6 h-6 text-cyber-black" />
                </div>
                <h3 className="text-lg font-brutalist font-bold text-cyber-green">COPY & PASTE</h3>
                <p className="text-sm text-cyber-gray">
                  Zero dependencies. Copy any component and paste it directly into your project.
                </p>
              </CardContent>
            </Card>

            <Card variant="brutalist" hover glitchOnHover>
              <CardContent className="text-center space-y-3">
                <div className="w-12 h-12 bg-cyber-magenta mx-auto flex items-center justify-center">
                  <Palette className="w-6 h-6 text-cyber-black" />
                </div>
                <h3 className="text-lg font-brutalist font-bold text-cyber-magenta">
                  BRUTALIST DESIGN
                </h3>
                <p className="text-sm text-cyber-gray">
                  Heavy borders, bold shadows, and cyber aesthetics. No minimalism here.
                </p>
              </CardContent>
            </Card>

            <Card variant="brutalist" hover glitchOnHover>
              <CardContent className="text-center space-y-3">
                <div className="w-12 h-12 bg-cyber-white mx-auto flex items-center justify-center">
                  <Code className="w-6 h-6 text-cyber-black" />
                </div>
                <h3 className="text-lg font-brutalist font-bold text-cyber-white">
                  TYPESCRIPT READY
                </h3>
                <p className="text-sm text-cyber-gray">
                  Full TypeScript support with proper type definitions and IntelliSense.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Start */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-brutalist font-bold text-cyber-green mb-6">
              GET STARTED IN SECONDS
            </h2>

            <Card variant="brutalist" className="bg-cyber-black">
              <CardContent className="space-y-4">
                <div className="text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-cyber-green">TERMINAL</span>
                    <Button variant="ghost" size="sm" onClick={handleInstallCopy}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <code className="text-sm text-cyber-white font-mono">npm install chaos-ui</code>
                </div>

                <div className="text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-cyber-green">IMPORT</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copy(`import { Button } from "chaos-ui";`)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <code className="text-sm text-cyber-white font-mono">
                    {`import { Button } from "chaos-ui";`}
                  </code>
                </div>

                <div className="text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-cyber-green">USE</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copy(`<Button variant="primary">Click me</Button>`)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <code className="text-sm text-cyber-white font-mono">
                    {`<Button variant="primary">Click me</Button>`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex flex-col items-center">
            <p className="text-cyber-gray font-mono text-sm mb-4">SCROLL TO EXPLORE COMPONENTS</p>
            <ArrowDown className="w-6 h-6 text-cyber-green rotate-90 animate-bounce-brutal" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
