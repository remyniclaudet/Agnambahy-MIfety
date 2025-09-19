import Navbar from "../../components/Navbar";
import Hero from "./sections/Hero";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <main className="">
        <Hero/>
      </main>
    </div>
  );
};

export default Home;