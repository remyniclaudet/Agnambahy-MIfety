import React, { useEffect, useRef, useState } from 'react';
import donationImage1 from '../../../assets/AM2.jpg';
import donationImage2 from '../../../assets/AM3.jpg';
import donationImage3 from '../../../assets/AM4.jpg';
import donationImage4 from '../../../assets/AM7.jpg';
import donationImage5 from '../../../assets/AM2.jpg';

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

    // ✅ Nouvelle fonction : défilement vers la section #contact
    const scrollToContact = () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = '/#contact';
        }
    };

    const impacts = [
        { icon: "🏀", title: "Matériel sportif", description: "Pour les équipes locales" },
        { icon: "🌟", title: "Encouragement", description: "Des jeunes talents" },
        { icon: "🛡️", title: "Logistique & Sécurité", description: "De l'événement" },
        { icon: "🤝", title: "Solidarité régionale", description: "Unité et partage" }
    ];

    const donationBenefits = [
        "L'achat de matériel sportif neuf",
        "La formation des jeunes arbitres",
        "L'organisation d'ateliers culturels",
        "Les frais logistiques de l'événement"
    ];

    const donationImages = [
        { src: donationImage1, alt: "Jeunes participants" },
        { src: donationImage2, alt: "Compétition sportive" },
        { src: donationImage3, alt: "Cérémonie d'ouverture" },
        { src: donationImage4, alt: "Activités culturelles" },
        { src: donationImage5, alt: "Moments de partage" }
    ];

    return (
        <section 
            id="donation" 
            ref={sectionRef}
            className="relative py-20 bg-white overflow-hidden"
        >
            {/* Éléments décoratifs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 float" style={{animationDelay: '1s'}}></div>
            
            {/* Images flottantes */}
            <div className="absolute left-0 top-1/4 -translate-y-1/2">
                <div className={`w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg image-zoom scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                    <img src={donationImages[0].src} alt={donationImages[0].alt} className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="absolute left-8 top-3/4 -translate-y-1/2">
                <div className={`w-20 h-20 rounded-full overflow-hidden border-4 border-secondary shadow-lg image-zoom scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.2s'}}>
                    <img src={donationImages[1].src} alt={donationImages[1].alt} className="w-full h-full object-cover" />
                </div>
            </div>
               
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Faire <span className="text-secondary">un Don</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8 line-grow"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ensemble, faisons grandir le sport, la culture et la jeunesse à Farafangana
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contenu gauche */}
                    <div className="space-y-8">
                        <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <p className="text-lg leading-relaxed text-gray-700 mb-4 fade-in-up">
                                Depuis <span className="text-primary font-semibold">2021</span>, <span className="font-bold text-gray-900">Agnambahy Mifety</span> fait vibrer la région Atsimo-Atsinanana à travers le sport, la musique et la culture.
                                Chaque année, des centaines de jeunes participent à nos compétitions et activités, avec passion et détermination.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700 mb-6 fade-in-up" style={{animationDelay: '0.1s'}}>
                                Mais pour continuer à offrir ces moments uniques, nous avons besoin de <span className="text-secondary font-semibold">votre soutien</span>.
                            </p>

                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-primary mb-4 fade-in-up" style={{animationDelay: '0.2s'}}>
                                    En faisant un don, vous contribuez à :
                                </h4>
                                {impacts.map((impact, index) => (
                                    <div 
                                        key={index} 
                                        className={`flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}
                                        style={{transitionDelay: `${index * 0.1}s`}}
                                    >
                                        <span className="text-2xl icon-bounce">{impact.icon}</span>
                                        <div>
                                            <h5 className="font-semibold text-gray-900">{impact.title}</h5>
                                            <p className="text-gray-600 text-sm">{impact.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`text-center italic text-gray-600 text-lg bg-primary/5 p-6 rounded-2xl border border-primary/20 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.6s'}}>
                            "Chaque geste compte. Ensemble, nous faisons la différence."
                        </div>
                    </div>

                    {/* Contenu droit */}
                    <div className="space-y-8">
                        <div className={`bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-center text-white shadow-lg card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <div className="text-5xl font-bold mb-2 count-up">800+</div>
                            <div className="text-xl font-semibold">jeunes déjà soutenus</div>
                            <div className="w-16 h-1 bg-white/50 mx-auto mt-4 rounded-full line-grow"></div>
                        </div>

                        {/* ✅ Tous les boutons pointent vers #contact */}
                        <div className={`text-center space-y-4 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.4s'}}>
                            <button
                                onClick={scrollToContact}
                                className="btn-primary btn-fill text-base px-6 py-3 transform hover:scale-105 transition-all duration-300 w-full max-w-xs"
                            >
                                Faire un don maintenant
                            </button>
                            <button
                                onClick={scrollToContact}
                                className="btn-secondary btn-fill text-base px-6 py-3 transform hover:scale-105 transition-all duration-300 w-full max-w-xs"
                            >
                                Nous contacter
                            </button>
                        </div>

                        <div className={`bg-gray-50 rounded-xl p-6 border border-gray-200 card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.5s'}}>
                            <h4 className="font-semibold text-primary mb-4 text-lg">Votre don permet :</h4>
                            <ul className="text-gray-700 space-y-3">
                                {donationBenefits.map((benefit, index) => (
                                    <li 
                                        key={index} 
                                        className="flex items-center space-x-3 fade-in-up"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        <div className={`w-2 h-2 rounded-full pulse-slow ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}></div>
                                        <span className="text-sm">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={`bg-secondary/5 rounded-xl p-6 border border-secondary/20 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.7s'}}>
                            <h4 className="font-semibold text-secondary mb-3 flex items-center justify-center space-x-2">
                                <span>🔒</span>
                                <span>Transparence totale</span>
                            </h4>
                            <p className="text-gray-600 text-sm text-center">
                                Nous nous engageons à utiliser chaque don de manière responsable et transparente.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ✅ Section finale avec mêmes boutons */}
                <div className={`mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-gray-200 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.8s'}}>
                    <div className="text-center max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Votre soutien fait la différence
                        </h3>
                        <p className="text-gray-600 text-lg mb-6">
                            Chaque contribution, grande ou petite, nous aide à créer des opportunités 
                            et à inspirer la prochaine génération de champions à Farafangana.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={scrollToContact}
                                className="btn-primary btn-fill text-base px-6 py-3 transform hover:scale-105 transition-all duration-300"
                            >
                                Faire un don maintenant
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
        </section>
    );
};

export default Donation;
