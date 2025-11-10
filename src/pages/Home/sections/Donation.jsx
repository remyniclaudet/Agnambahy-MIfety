import React, { useEffect, useRef, useState } from 'react';
import {
    FaBasketballBall,
    FaStar,
    FaShieldAlt,
    FaHandsHelping,
    FaUsers,
    FaDonate,
    FaPhone,
    FaInfoCircle,
    FaTrophy,
    FaPalette,
    FaShippingFast,
    FaHeart,
    FaQrcode,
    FaClock,
    FaUsers as FaUsersIcon
} from 'react-icons/fa';

// Importe l'image du QR code
import qrCodeImage from '../../../assets/don.jpeg';

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

    // Données de la cagnotte
    const campaignData = {
        title: "Campagne Litchis",
        collected: 590,
        goal: 6000,
        daysLeft: 37,
        participants: 12,
        organizer: "Minaoharisoa Christiane JAOFERA"
    };

    const progressPercentage = (campaignData.collected / campaignData.goal) * 100;

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
                    {/* Colonne gauche */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Introduction texte simple */}
                        <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6 fade-in-up">
                                Depuis <span className="text-primary font-semibold">2021</span>,{' '}
                                <span className="text-primary font-semibold">Agnambahy Mifety</span> fait vibrer la région 
                                Atsimo-Atsinanana à travers le sport, la musique et la culture. Chaque année, des centaines 
                                de jeunes participent à nos compétitions et activités, avec passion et détermination.
                            </p>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
                                Mais pour continuer à offrir ces moments uniques, nous avons besoin de{' '}
                                <span className="text-secondary font-semibold">votre soutien</span>.
                            </p>
                        </div>

                        {/* Section QR Code - Card conservée */}
                        <div className={`bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center space-x-2 mb-3">
                                    <FaQrcode className="text-primary text-xl" />
                                    <h3 className="text-xl md:text-2xl font-bold text-primary">
                                        Donner en scannant
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-sm md:text-base">
                                    Scannez le QR code pour participer à notre cagnotte
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                {/* QR Code */}
                                <div className="flex-shrink-0">
                                    <div className="bg-white p-4 rounded-xl border-2 border-primary/20 shadow-md">
                                        <img
                                            src={qrCodeImage}
                                            alt="QR Code pour la cagnotte Litchis"
                                            className="w-48 h-48 md:w-56 md:h-56 object-contain"
                                        />
                                    </div>
                                    <div className="text-center mt-3">
                                        <span className="inline-flex items-center space-x-1 text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                                            <FaQrcode className="w-3 h-3" />
                                            <span>Scanner pour donner</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Informations de la cagnotte */}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 mb-2">
                                            {campaignData.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-4">
                                            Aidez les jeunes de Farafangana à vivre Agnambahy Mifety 2025 🏀🎉
                                        </p>
                                    </div>

                                    {/* Barre de progression */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-semibold text-primary">
                                                {campaignData.collected} € récoltés
                                            </span>
                                            <span className="text-gray-500">
                                                sur {campaignData.goal} €
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${progressPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Statistiques */}
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-primary/5 rounded-lg p-3">
                                            <div className="flex items-center justify-center space-x-1 text-primary mb-1">
                                                <FaClock className="w-4 h-4" />
                                                <span className="font-bold text-sm">{campaignData.daysLeft}</span>
                                            </div>
                                            <div className="text-xs text-gray-600">jours restants</div>
                                        </div>
                                        <div className="bg-secondary/5 rounded-lg p-3">
                                            <div className="flex items-center justify-center space-x-1 text-secondary mb-1">
                                                <FaUsersIcon className="w-4 h-4" />
                                                <span className="font-bold text-sm">{campaignData.participants}</span>
                                            </div>
                                            <div className="text-xs text-gray-600">participations</div>
                                        </div>
                                    </div>

                                    {/* Organisateur */}
                                    <div className="text-center pt-2 border-t border-gray-200">
                                        <p className="text-xs text-gray-500">
                                            Créée par <span className="font-semibold text-gray-700">{campaignData.organizer}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section impacts - Texte simple avec icônes */}
                        <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <h4 className="text-xl md:text-2xl font-bold text-primary mb-6 fade-in-up">
                                Votre don contribue à :
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {impacts.map((impact, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 p-3 fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            index % 4 === 0 ? 'bg-primary/20 text-primary' :
                                            index % 4 === 1 ? 'bg-yellow-500/20 text-yellow-600' :
                                            index % 4 === 2 ? 'bg-blue-500/20 text-blue-600' :
                                            'bg-green-500/20 text-green-600'
                                        }`}>
                                            <impact.icon className="text-lg" />
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-gray-900 text-base mb-1">{impact.title}</h5>
                                            <p className="text-gray-600 text-sm">{impact.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Citation en card rouge */}
                        <div className={`bg-secondary rounded-xl p-6 border border-red-200 scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <div className="text-center">
                                <p className="text-white text-lg md:text-xl italic font-medium">
                                    "Chaque geste compte. Ensemble, nous faisons la différence."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Card 800+ jeunes soutenus - Conservée */}
                        <div className={`bg-primary rounded-2xl p-8 text-center text-white shadow-lg scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <div className="text-4xl md:text-6xl font-bold mb-3 count-up">800+</div>
                            <div className="text-xl md:text-2xl font-semibold mb-4">jeunes déjà soutenus</div>
                            <div className="w-20 h-1 bg-white/50 mx-auto rounded-full mb-4"></div>
                            <FaUsers className="text-white/80 text-3xl mx-auto" />
                        </div>

                        {/* Boutons d'action */}
                        <div className={`text-center space-y-4 scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <button
                                onClick={scrollToContact}
                                className="btn-primary btn-fill text-base px-8 py-4 transform hover:scale-105 transition-all duration-300 w-full max-w-sm flex items-center justify-center space-x-3"
                            >
                                <FaDonate className="w-5 h-5" />
                                <span className="text-lg">Faire un don maintenant</span>
                            </button>
                            <button
                                onClick={scrollToContact}
                                className="btn-secondary btn-fill text-base px-8 py-4 transform hover:scale-105 transition-all duration-300 w-full max-w-sm flex items-center justify-center space-x-3"
                            >
                                <FaPhone className="w-5 h-5" />
                                <span className="text-lg">Nous contacter</span>
                            </button>
                        </div>

                        {/* Bénéfices du don - Texte simple */}
                        <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <h4 className="text-xl md:text-2xl font-bold text-primary mb-6 flex items-center space-x-3">
                                <FaInfoCircle className="text-primary" />
                                <span>Votre don permet :</span>
                            </h4>
                            <ul className="text-gray-700 space-y-4">
                                {donationBenefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center space-x-4 text-lg fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                            index % 2 === 0 ? 'bg-primary' : 'bg-secondary'
                                        }`}></div>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Transparence - Texte simple */}
                        <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <h4 className="text-xl md:text-2xl font-bold text-secondary mb-4">
                                Transparence totale
                            </h4>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Nous nous engageons à utiliser chaque don de manière responsable 
                                et transparente pour maximiser l'impact sur la jeunesse de Farafangana.
                            </p>
                        </div>

                        {/* Impact du soutien - Texte simple avec icônes */}
                        <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                                Domaines d'impact
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <FaTrophy className="text-primary text-3xl mx-auto mb-3" />
                                    <div className="font-semibold text-gray-900">Compétitions</div>
                                </div>
                                <div className="text-center">
                                    <FaPalette className="text-secondary text-3xl mx-auto mb-3" />
                                    <div className="font-semibold text-gray-900">Culture</div>
                                </div>
                                <div className="text-center">
                                    <FaUsers className="text-primary text-3xl mx-auto mb-3" />
                                    <div className="font-semibold text-gray-900">Jeunesse</div>
                                </div>
                                <div className="text-center">
                                    <FaShippingFast className="text-secondary text-3xl mx-auto mb-3" />
                                    <div className="font-semibold text-gray-900">Logistique</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section finale - Texte simple */}
                <div className={`mt-12 md:mt-20 text-center scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                        Votre soutien fait la différence
                    </h3>
                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                        Chaque contribution, grande ou petite, nous aide à créer des opportunités
                        et à inspirer la prochaine génération de champions à Farafangana.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={scrollToContact}
                            className="btn-primary btn-fill text-base px-8 py-4 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                        >
                            <FaDonate className="w-5 h-5" />
                            <span>Faire un don maintenant</span>
                        </button>
                        <button
                            onClick={scrollToContact}
                            className="btn-secondary btn-fill text-base px-8 py-4 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                        >
                            <FaInfoCircle className="w-5 h-5" />
                            <span>En savoir plus</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Donation;