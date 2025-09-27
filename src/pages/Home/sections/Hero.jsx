import heros from '../../../assets/AM3.jpg';

const Hero = () => {
    return (
        <div className="relative overflow-hidden min-h-screen flex items-center">
            {/* Image de fond */}
            <img
                src={heros}
                alt="Background sportif et culturel"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay très léger pour garder l'image visible */}
            <div className="absolute inset-0 bg-white/40"></div>

            {/* Contenu */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                {/* Titre principal */}
                <h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-lg"
                    style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 1)' }}
                >
                    <span className="block text-primary">Agnambahy</span>
                    <span className="block text-secondary mt-2 drop-shadow-md">Mifety</span>
                </h1>

                {/* Ligne décorative */}
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>

                {/* Slogan */}
                <p className="mt-6 text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed drop-shadow-lg"
                style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 1)' }}>
                    <span className="text-black ">
                        Sport, Culture et Jeunesse à{" "}
                        <span className="font-bold">
                            <span className="text-primary ">Farafa</span>
                            <span className="text-secondary">ngana</span>
                        </span>
                    </span>
                </p>

                {/* Boutons CTA */}
                <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button className="btn-primary text-sm xl:text-base">
                        S'inscrire à la prochaine édition
                    </button>

                    <button className="btn-secondary text-sm xl:text-base">
                        Devenir sponsor
                    </button>
                </div>

            </div>

            {/* Dégradé bas pour transition douce */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
    );
};

export default Hero;
