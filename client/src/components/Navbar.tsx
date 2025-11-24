import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-4" : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-heading tracking-tighter text-white">
          PORTFOLIO<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors font-ui uppercase tracking-widest"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('#contact')}
            className="px-6 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300 font-ui text-sm font-bold uppercase tracking-wider rounded-sm"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-white/10"
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-lg font-medium text-white hover:text-primary transition-colors font-heading"
            >
              {link.name}
            </button>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
