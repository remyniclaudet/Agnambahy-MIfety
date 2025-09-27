import Navbar from "../../components/Navbar";
import About from "./sections/About";
import Hero from "./sections/Hero";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <main className="">
        <Hero/>
        <About/>
      </main>
    </div>
  );
};

export default Home;