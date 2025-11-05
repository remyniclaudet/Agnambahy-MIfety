import { useNavigate } from "react-router-dom";
import heros from '../../../assets/AM3.jpg';

const Hero = () => {
  const navigate = useNavigate(); // ✅ hook pour naviguer

  const handleInscriptionClick = () => {
    console.log("Redirection vers la page d'inscription...");
    navigate("/inscription"); // ✅ redirection
  };

  return (
    <section id="hero">
<div className="relative overflow-hidden min-h-screen flex items-center">
  {/* Image de fond avec animation */}
  <img
    src={heros}
    alt="Background sportif et culturel"
    className="absolute inset-0 w-full h-full object-cover image-zoom"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-white/40"></div>

  {/* Contenu avec animations */}
  <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
    <h1
      className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-lg hero-fade-in"
      style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 1)' }}
    >
      <span className="block text-primary fade-in-left">Agnambahy</span>
      <span className="block text-secondary mt-2 drop-shadow-md fade-in-right">Mifety</span>
    </h1>

    {/* Ligne décorative avec animation */}
    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 line-grow"></div>

    {/* Slogan avec animation */}
    <p
      className="mt-6 text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed drop-shadow-lg fade-in-up"
      style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 1)' }}
    >
      <span className="text-black">
        Sport, Culture et Jeunesse à{" "}
        <span className="font-bold">
          <span className="text-primary">Farafa</span>
          <span className="text-secondary">ngana</span>
        </span>
      </span>
    </p>

    {/* Boutons CTA avec animations */}
    <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center slide-in-bottom">
      <button
        onClick={handleInscriptionClick}
        className="btn-primary btn-fill text-sm xl:text-base"
      >
        S'inscrire à la prochaine édition
      </button>

      <button className="btn-secondary btn-fill text-sm xl:text-base">
        Devenir sponsor
      </button>
    </div>
  </div>

  {/* Dégradé bas */}
  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
</div>
 </section>
  );
};

export default Hero;
