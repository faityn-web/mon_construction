import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      1
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
