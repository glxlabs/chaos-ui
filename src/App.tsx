import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import ButtonSection from "./components/sections/ButtonSection";
import FormSection from "./components/sections/FormSection";
import LayoutSection from "./components/sections/LayoutSection";
import InteractiveSection from "./components/sections/InteractiveSection";
import DataDisplaySection from "./components/sections/DataDisplaySection";
import NavigationSection from "./components/sections/NavigationSection";
import useHashNavigation from "./hooks/use-hash-navigation";
import { ThemeProvider } from "./contexts/ThemeContext";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useHashNavigation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white theme-brutal">
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="flex-1 md:ml-64 pt-16 px-4 md:px-0">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ButtonSection />
                  <FormSection />
                  <LayoutSection />
                  <InteractiveSection />
                  <DataDisplaySection />
                  <NavigationSection />
                </>
              }
            />
            <Route path="/components/forms" element={<FormSection />} />
            <Route path="/components/layout" element={<LayoutSection />} />
            <Route path="/components/interactive" element={<InteractiveSection />} />
            <Route path="/components/data" element={<DataDisplaySection />} />
            <Route path="/components/navigation" element={<NavigationSection />} />
            <Route
              path="/docs"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-brutalist text-cyber-green">DOCS COMING SOON</h1>
                </div>
              }
            />
            <Route
              path="/examples"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-brutalist text-cyber-green">EXAMPLES COMING SOON</h1>
                </div>
              }
            />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
