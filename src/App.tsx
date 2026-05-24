import BackgroundOrbs from './components/BackgroundOrbs';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <BackgroundOrbs />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
