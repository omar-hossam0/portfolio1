import Navigation from "./components/Navigation";
import StarField from "./components/StarField";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black font-body text-white">
      <StarField />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}

export default App;
