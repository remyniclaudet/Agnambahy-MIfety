import React, { useEffect, useRef, useState } from 'react';
import {
    FaBasketballBall,
    FaStar,
    FaShieldAlt,
    FaHandsHelping,
    FaLock,
    FaUsers,
    FaDonate,
    FaPhone,
    FaInfoCircle,
    FaTrophy,
    FaPalette,
    FaShippingFast,
    FaHeart
} from 'react-icons/fa';

const Donation = () => {
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
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const scrollToContact = () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = '/#contact';
        }
    };

    const impacts = [
        { icon: FaBasketballBall, title: "Matériel sportif", description: "Pour les équipes locales" },
        { icon: FaStar, title: "Encouragement", description: "Des jeunes talents" },
        { icon: FaShieldAlt, title: "Logistique & Sécurité", description: "De l'événement" },
        { icon: FaHandsHelping, title: "Solidarité régionale", description: "Unité et partage" }
    ];

    const donationBenefits = [
        "L'achat de matériel sportif neuf",
        "La formation des jeunes arbitres",
        "L'organisation d'ateliers culturels",
        "Les frais logistiques de l'événement"
    ];

    return (
        <section
            id="donation"
            ref={sectionRef}
            className="relative py-12 md:py-20 bg-white overflow-hidden"
        >
            {/* Éléments décoratifs */}
            <div className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 float"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 float" style={{ animationDelay: '1s' }}></div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <div className={`text-center mb-8 md:mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
                        Faire <span className="text-secondary">un Don</span>
                    </h2>
                    <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 md:mb-8 line-grow"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Ensemble, faisons grandir le sport, la culture et la jeunesse à Farafangana
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Contenu gauche avec image */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Image principale avec fond */}
                        <div className={`relative rounded-2xl overflow-hidden shadow-xl card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            {/* Image de fond */}
                            <div
                                className="aspect-video bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3)), url("https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
                                }}
                            >
                                {/* Overlay avec contenu */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center">
                                    <div className="text-center p-6 md:p-8 text-white">
                                        <FaHeart className="text-white text-4xl md:text-6xl mx-auto mb-4 drop-shadow-lg" />
                                        <h3 className="text-xl md:text-3xl font-bold mb-3 drop-shadow-lg">
                                            Soutenez notre mission
                                        </h3>
                                        <p className="text-white/90 text-sm md:text-lg max-w-md mx-auto drop-shadow-lg">
                                            Votre don contribue au développement des jeunes talents et à la promotion du sport à Farafangana
                                        </p>

                                        {/* Éléments décoratifs supplémentaires */}
                                        <div className="mt-6 flex justify-center space-x-4">
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Overlay supplémentaire pour le bas de l'image */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        </div>

                        <div className={`bg-gray-50 rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-100 card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-4 fade-in-up">
                                Depuis <span className="text-primary font-semibold">2021</span>, <span className="text-primary font-semibold bg-primary/20 px-1 rounded">Agnambahy Mifety</span> fait vibrer la région Atsimo-Atsinanana à travers le sport, la musique et la culture.
                                Chaque année, des centaines de jeunes participent à nos compétitions et activités, avec passion et détermination.
                            </p>
                            <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
                                Mais pour continuer à offrir ces moments uniques, nous avons besoin de <span className="text-secondary font-semibold bg-secondary/20 px-1 rounded">votre soutien</span>.
                            </p>

                            <div className="space-y-4">
                                <h4 className="text-lg md:text-xl font-bold text-primary mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    En faisant un don, vous contribuez à :
                                </h4>
                                {impacts.map((impact, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-white rounded-lg border border-gray-200 card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}
                                        style={{ transitionDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center icon-bounce ${index % 4 === 0 ? 'bg-primary/20 text-primary' :
                                                index % 4 === 1 ? 'bg-yellow-500/20 text-yellow-600' :
                                                    index % 4 === 2 ? 'bg-blue-500/20 text-blue-600' :
                                                        'bg-green-500/20 text-green-600'
                                            }`}>
                                            <impact.icon className="text-lg md:text-xl" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="font-semibold text-gray-900 text-sm md:text-base">{impact.title}</h5>
                                            <p className="text-gray-600 text-xs md:text-sm">{impact.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`text-center italic text-gray-600 text-base md:text-lg bg-primary/5 p-4 md:p-6 rounded-xl md:rounded-2xl border border-primary/20 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.6s' }}>
                            "Chaque geste compte. Ensemble, nous faisons la différence."
                        </div>
                    </div>

                    {/* Contenu droit */}
                    <div className="space-y-6 md:space-y-8">
                        <div className={`bg-primary rounded-xl md:rounded-2xl p-6 md:p-8 text-center text-white shadow-lg card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <div className="text-3xl md:text-5xl font-bold mb-2 count-up">800+</div>
                            <div className="text-lg md:text-xl font-semibold">jeunes déjà soutenus</div>
                            <div className="w-12 md:w-16 h-1 bg-white/50 mx-auto mt-3 md:mt-4 rounded-full line-grow"></div>
                            <div className="mt-4 flex justify-center">
                                <FaUsers className="text-white/80 text-xl md:text-2xl" />
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className={`text-center space-y-3 md:space-y-4 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.4s' }}>
                            <button
                                onClick={scrollToContact}
                                className="btn-primary btn-fill text-sm md:text-base px-4 md:px-6 py-2 md:py-3 transform hover:scale-105 transition-all duration-300 w-full max-w-xs flex items-center justify-center space-x-2"
                            >
                                <FaDonate className="w-4 h-4" />
                                <span>Faire un don maintenant</span>
                            </button>
                            <button
                                onClick={scrollToContact}
                                className="btn-secondary btn-fill text-sm md:text-base px-4 md:px-6 py-2 md:py-3 transform hover:scale-105 transition-all duration-300 w-full max-w-xs flex items-center justify-center space-x-2"
                            >
                                <FaPhone className="w-4 h-4" />
                                <span>Nous contacter</span>
                            </button>
                        </div>

                        <div className={`bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200 card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.5s' }}>
                            <h4 className="font-semibold text-primary mb-3 md:mb-4 text-base md:text-lg flex items-center space-x-2">
                                <FaInfoCircle className="w-4 h-4" />
                                <span>Votre don permet :</span>
                            </h4>
                            <ul className="text-gray-700 space-y-2 md:space-y-3">
                                {donationBenefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center space-x-2 md:space-x-3 fade-in-up text-sm md:text-base"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={`w-2 h-2 rounded-full pulse-slow flex-shrink-0 ${index % 4 === 0 ? 'bg-primary' :
                                                index % 4 === 1 ? 'bg-secondary' :
                                                    index % 4 === 2 ? 'bg-primary' : 'bg-secondary'
                                            }`}></div>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={`bg-secondary/5 rounded-xl p-4 md:p-6 border border-secondary/20 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.7s' }}>
                            <h4 className="font-semibold text-secondary mb-2 md:mb-3 flex items-center justify-center space-x-2 text-base md:text-lg">
                                <FaLock className="w-4 h-4" />
                                <span>Transparence totale</span>
                            </h4>
                            <p className="text-gray-600 text-xs md:text-sm text-center">
                                Nous nous engageons à utiliser chaque don de manière responsable et transparente.
                            </p>
                        </div>

                        {/* Section bénéfices détaillés */}
                        <div className={`bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 md:p-6 border border-gray-200 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.8s' }}>
                            <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-base md:text-lg text-center">
                                Impact de votre soutien
                            </h4>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="text-center p-2 md:p-3 bg-white rounded-lg border border-gray-200">
                                    <FaTrophy className="text-primary text-lg md:text-2xl mx-auto mb-1 md:mb-2" />
                                    <div className="text-xs md:text-sm font-semibold text-gray-900">Compétitions</div>
                                </div>
                                <div className="text-center p-2 md:p-3 bg-white rounded-lg border border-gray-200">
                                    <FaPalette className="text-secondary text-lg md:text-2xl mx-auto mb-1 md:mb-2" />
                                    <div className="text-xs md:text-sm font-semibold text-gray-900">Culture</div>
                                </div>
                                <div className="text-center p-2 md:p-3 bg-white rounded-lg border border-gray-200">
                                    <FaUsers className="text-primary text-lg md:text-2xl mx-auto mb-1 md:mb-2" />
                                    <div className="text-xs md:text-sm font-semibold text-gray-900">Jeunesse</div>
                                </div>
                                <div className="text-center p-2 md:p-3 bg-white rounded-lg border border-gray-200">
                                    <FaShippingFast className="text-secondary text-lg md:text-2xl mx-auto mb-1 md:mb-2" />
                                    <div className="text-xs md:text-sm font-semibold text-gray-900">Logistique</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section finale */}
                <div className={`mt-8 md:mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.9s' }}>
                    <div className="text-center max-w-3xl mx-auto">
                        <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                            Votre soutien fait la différence
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6">
                            Chaque contribution, grande ou petite, nous aide à créer des opportunités
                            et à inspirer la prochaine génération de champions à Farafangana.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                            <button
                                onClick={scrollToContact}
                                className="btn-primary btn-fill text-sm md:text-base px-4 md:px-6 py-2 md:py-3 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                            >
                                <FaDonate className="w-4 h-4" />
                                <span>Faire un don maintenant</span>
                            </button>
                            <button
                                onClick={scrollToContact}
                                className="btn-secondary btn-fill text-sm md:text-base px-4 md:px-6 py-2 md:py-3 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                            >
                                <FaInfoCircle className="w-4 h-4" />
                                <span>En savoir plus</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Donation;