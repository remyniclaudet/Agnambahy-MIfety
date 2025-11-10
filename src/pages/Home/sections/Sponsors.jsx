import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importe les logos de tes sponsors
import sponsor1 from '../../../assets/sponsors/Yas.png';
import sponsor2 from '../../../assets/sponsors/fmbb lgo.png';
import sponsor3 from '../../../assets/sponsors/ligue.png';
import sponsor4 from '../../../assets/sponsors/4.png';
import sponsor5 from '../../../assets/sponsors/cap.png';
import sponsor6 from '../../../assets/sponsors/csm.png';
import sponsor7 from '../../../assets/sponsors/nosyw.png';
import sponsor8 from '../../../assets/sponsors/iay.png';

const Sponsors = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    // 🔹 Fonction pour scroller vers #contact
    const scrollToContact = () => {
        console.log("Redirection vers la section #contact...");
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        } else {
            console.warn("La section #contact est introuvable !");
        }
    };

    const scrollingSponsors = [
        { id: 1, name: "Partenaire 1", logo: sponsor1 },
        { id: 2, name: "Partenaire 2", logo: sponsor2 },
        { id: 3, name: "Partenaire 3", logo: sponsor3 },
        { id: 4, name: "Partenaire 4", logo: sponsor4 },
        { id: 5, name: "Partenaire 5", logo: sponsor5 },
        { id: 6, name: "Partenaire 6", logo: sponsor6 },
        { id: 7, name: "Partenaire 7", logo: sponsor7 },
        { id: 8, name: "Partenaire 8", logo: sponsor8 },
    ];

    const allScrollingSponsors = [...scrollingSponsors, ...scrollingSponsors];

    return (
        <section 
            id="sponsors" 
            ref={sectionRef}
            className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
        >
            {/* Éléments décoratifs */}
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/5 rounded-full float" style={{animationDelay: '2s'}}></div>

            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête de section */}
                <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Partenaires & <span className="text-secondary">Sponsors</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8 line-grow"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Découvrez les entreprises et organisations qui soutiennent notre événement et partagent nos valeurs
                    </p>
                </div>

                {/* SECTION DÉFILEMENT CORRIGÉE */}
                <div className="relative w-full overflow-visible">
                    {/* Zone de défilement qui déborde */}
                    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
                        {/* Overlays pour effet de fondu */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
                        
                        {/* Conteneur de défilement */}
                        <div className="overflow-hidden py-10">
                            <div className="animate-scroll flex items-center space-x-8 px-4">
                                {allScrollingSponsors.map((sponsor, index) => (
                                    <div
                                        key={`${sponsor.id}-${index}`}
                                        className="flex-shrink-0 group"
                                    >
                                        {/* Conteneur de logo avec taille fixe et espacement constant */}
                                        <div className="flex items-center justify-center transition-all duration-300 h-24 w-32 mx-2">
                                            <img
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                className="max-h-16 max-w-24 w-auto h-auto object-contain transition-all duration-300 group-hover:scale-110 opacity-80 hover:opacity-100"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appel aux partenaires */}
                <div className={`bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white relative overflow-hidden mt-16 ${isVisible ? 'scale-in' : 'opacity-0 scale-95'}`}>
                   
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-4xl font-bold mb-6 fade-in-up">
                            Rejoignez l'aventure <span className="text-amber-200">Agnambahy Mifety</span> !
                        </h3>
                        
                        <div className="text-lg md:text-xl leading-relaxed mb-8 space-y-4">
                            <p className="opacity-95 fade-in-up" style={{animationDelay: '0.2s'}}>
                                Votre soutien permet d'organiser un événement unique, de promouvoir la jeunesse 
                                et de dynamiser toute une région.
                            </p>
                            <p className="font-semibold text-amber-200 fade-in-up" style={{animationDelay: '0.4s'}}>
                                Ensemble, créons un impact durable pour la jeunesse de Farafangana !
                            </p>
                        </div>

                        {/* 🔹 Boutons modifiés */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <button 
                                onClick={scrollToContact}
                                className="btn-primary btn-fill text-base px-6 py-3 transform hover:scale-105 transition-all duration-300"
                            >
                                Devenir sponsor
                            </button>
                            <button 
                                onClick={scrollToContact}
                                className="btn-secondary btn-fill text-base px-6 py-3 transform hover:scale-105 transition-all duration-300"
                            >
                                En savoir plus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styles CSS pour l'animation de défilement */}
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-50% - 1rem));
                    }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                    display: flex;
                    width: max-content;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Sponsors;