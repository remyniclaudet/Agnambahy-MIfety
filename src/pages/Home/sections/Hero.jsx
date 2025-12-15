import { useNavigate } from "react-router-dom";
import heros from '../../../assets/AM3.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleInscriptionClick = () => {
    console.log("Redirection vers la page d'inscription...");
    navigate("/inscription");
  };

  return (
    <section id="hero">
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Image de fond avec animation - EN ARRIÈRE */}
        <img
          src={heros}
          alt="Background sportif et culturel"
          className="absolute inset-0 w-full h-full object-cover z-0 image-zoom"
        />

        {/* Formes décoratives identiques à l'image */}
        <div className="absolute inset-0 z-10">
          {/* Forme rouge en haut à gauche - plus petite et arrondie */}
          <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 opacity-90">
            <div
              className="w-full h-full bg-red-600 animate-float-slow"
              style={{
                clipPath: 'circle(60% at 0% 0%)',
                borderBottomRightRadius: '60%'
              }}
            ></div>
          </div>

          {/* Forme bleue en bas à droite - plus large et étirée */}
          <div className="absolute bottom-0 right-0 w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-84 xl:h-84 opacity-95">
            <div
              className="w-full h-full bg-blue-600 animate-float-slow"
              style={{
                clipPath: 'circle(75% at 100% 100%)',
                borderTopLeftRadius: '80%',
                borderTopRightRadius: '20%',
                borderBottomLeftRadius: '20%',
                animationDelay: '2s'
              }}
            ></div>
          </div>
        </div>

        {/* Overlay très léger */}
        <div className="absolute inset-0 bg-white/30 z-20"></div>

        {/* Contenu avec animations - DEVANT tout */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center z-30">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-lg hero-fade-in"
            style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 1)' }}
          >
            <span className="block text-primary fade-in-left">Agnambahy</span>
            <span className="block text-secondary mt-2 drop-shadow-md fade-in-right">Mifety</span>
          </h1>

          {/* Ligne décorative avec animation */}
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 line-grow"></div>

          {/* Slogan avec animation */}
          <p
            className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed drop-shadow-lg fade-in-up"
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
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center slide-in-bottom">
            <button
              onClick={handleInscriptionClick}
              className="btn-primary btn-fill text-base sm:text-base xl:text-base scale-in px-4 py-3 sm:px-6 sm:py-3 font-bold rounded-xl"
            >
              S'inscrire à la prochaine édition
            </button>

            <button className="btn-secondary btn-fill text-sm sm:text-base xl:text-base scale-in px-4 py-3 sm:px-6 sm:py-3 font-bold rounded-xl" style={{ animationDelay: '0.2s' }}>
              Devenir sponsor
            </button>
          </div>
        </div>

        {/* Dégradé bas */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/10 to-transparent z-25"></div>
      </div>
    </section>
  );
};

export default Hero;