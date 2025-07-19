/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cyber/Brutalist Color Palette
        "cyber-black": "#000000",
        "cyber-dark": "#0a0a0a",
        "cyber-green": "#00ff41",
        "cyber-green-bright": "#39ff14",
        "cyber-magenta": "#ff006e",
        "cyber-magenta-bright": "#ff0080",
        "cyber-white": "#ffffff",
        "cyber-gray": "#f0f0f0",
        "cyber-gray-dark": "#1a1a1a",

        // Brutalist Extended Palette
        "brutal-yellow": "#ffff00",
        "brutal-orange": "#ff8c00",
        "brutal-red": "#ff0000",
        "brutal-blue": "#0080ff",
        "brutal-purple": "#8000ff",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        brutalist: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "brutal-xl": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "brutal-2xl": ["2rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "brutal-3xl": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "brutal-4xl": ["3rem", { lineHeight: "1.0", letterSpacing: "-0.05em" }],
      },
      spacing: {
        brutal: "4px",
        "brutal-2": "8px",
        "brutal-3": "12px",
        "brutal-4": "16px",
        "brutal-6": "24px",
        "brutal-8": "32px",
      },
      borderWidth: {
        brutal: "3px",
        "brutal-thick": "4px",
        "brutal-extra": "6px",
      },
      boxShadow: {
        brutal: "4px 4px 0px #00ff41",
        "brutal-magenta": "4px 4px 0px #ff006e",
        "brutal-white": "4px 4px 0px #ffffff",
        "brutal-black": "4px 4px 0px #000000",
        "brutal-lg": "6px 6px 0px #00ff41",
        "brutal-xl": "8px 8px 0px #00ff41",
        "brutal-hover": "2px 2px 0px #00ff41",
        "brutal-inset": "inset 2px 2px 0px #00ff41",
      },
      animation: {
        glitch: "glitch 0.3s ease-in-out",
        "glitch-slow": "glitch 0.6s ease-in-out",
        "rgb-split": "rgb-split 0.2s ease-in-out",
        "rgb-split-slow": "rgb-split 0.4s ease-in-out",
        scanlines: "scanlines 2s linear infinite",
        "terminal-cursor": "terminal-cursor 1s infinite",
        "pulse-cyber": "pulse-cyber 2s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        "bounce-brutal": "bounce-brutal 1s ease-in-out infinite",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "10%": { transform: "translate(-2px, -2px)" },
          "20%": { transform: "translate(2px, 2px)" },
          "30%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(2px, -2px)" },
          "50%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "70%": { transform: "translate(-2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "90%": { transform: "translate(-2px, -2px)" },
        },
        "rgb-split": {
          "0%, 100%": {
            "text-shadow": "0 0 0 #ff006e, 0 0 0 #00ff41",
            transform: "translate(0)",
          },
          "50%": {
            "text-shadow": "-2px 0 0 #ff006e, 2px 0 0 #00ff41",
            transform: "translate(1px, 0)",
          },
        },
        scanlines: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "terminal-cursor": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "pulse-cyber": {
          "0%, 100%": {
            "box-shadow": "0 0 0 0 rgba(0, 255, 65, 0.4)",
            "border-color": "#00ff41",
          },
          "50%": {
            "box-shadow": "0 0 0 8px rgba(0, 255, 65, 0)",
            "border-color": "#39ff14",
          },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        "bounce-brutal": {
          "0%, 100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      backdropBlur: {
        brutal: "4px",
      },
    },
  },
  plugins: [],
};
