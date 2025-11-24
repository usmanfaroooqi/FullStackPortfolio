import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
