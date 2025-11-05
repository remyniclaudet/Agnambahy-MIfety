import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Donation from "./sections/Donation";
import Events from "./sections/Events";
import Hero from "./sections/Hero";
import Sponsors from "./sections/Sponsors";

const Home = () => {
  return (
    <div className="pt-16"> {/* Ajout de padding-top pour compenser la navbar fixe */}
      <Navbar />
      <main className="">
        <Hero/>
        <About/>
        <Events/>
        <Sponsors/>
        <Donation/>
        <Contact/>
      </main>
      <Footer />
    </div>
  );
};

export default Home;