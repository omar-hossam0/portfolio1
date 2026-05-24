import BackgroundOrbs from "./components/BackgroundOrbs";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <BackgroundOrbs />
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
