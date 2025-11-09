import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import eventImage from '../../../assets/AM5.jpg';
import archive2024 from '../../../assets/AM2.jpg';
import archive2023 from '../../../assets/AM2.jpg';
import archive2022 from '../../../assets/AM2.jpg';
import archive2021 from '../../../assets/AM2.jpg';

// Import des images pour les disciplines sportives
import basket3x3 from '../../../assets/disciplines/3x3.jpeg';
import basket5x5 from '../../../assets/disciplines/5x5.jpeg';
import football from '../../../assets/disciplines/football.jpeg';
import volley from '../../../assets/disciplines/Volley.jpeg';
import handball from '../../../assets/disciplines/handball.png';
import kickboxing from '../../../assets/disciplines/box.jpg';
import course from '../../../assets/disciplines/posy.jpg';

// Import des icônes React
import { 
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaBasketballBall,
    FaFutbol,
    FaVolleyballBall,
    FaHandsHelping,
    FaRunning,
    FaMicrophone,
    FaMusic,
    FaUsers,
    FaTheaterMasks,
    FaUmbrellaBeach,
    FaStar,
    FaTrophy,
    FaHistory
} from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';

const Events = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('prochaine-edition');
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

    const handleInscriptionClick = () => {
        navigate("/inscription");
    };

    const disciplinesSportives = [
        {
            title: "Tournois FIBA 3x3",
            categories: ["Catégorie U18", "Catégorie U23"],
            icon: FaBasketballBall,
            image: basket3x3,
            color: "primary"
        },
        {
            title: "Tournois 5x5",
            categories: ["Hommes", "Dames"],
            icon: FaBasketballBall,
            image: basket5x5,
            color: "secondary"
        },
        {
            title: "Tournoi de football à 7",
            categories: ["Hommes", "Dames"],
            icon: FaFutbol,
            image: football,
            color: "primary"
        },
        {
            title: "Tournoi de beach volley",
            categories: ["Hommes"],
            icon: FaVolleyballBall,
            image: volley,
            color: "secondary"
        },
        {
            title: "Tournoi de handball mixte",
            categories: ["Mixte"],
            icon: FaHandsHelping,
            image: handball,
            color: "primary"
        },
        {
            title: "Kick-boxing",
            categories: ["Hommes"],
            icon: GiBoxingGlove,
            image: kickboxing,
            color: "secondary"
        },
        {
            title: "Course « PosyPosy »",
            categories: ["Hommes"],
            icon: FaRunning,
            image: course,
            color: "primary"
        }
    ];

    const animationsCulturelles = [
        {
            title: "Conférence « NOSYW Mihaino ny Tanora »",
            description: "Les jeunes peuvent exprimer leurs problèmes, partager leurs réalités et proposer des solutions pour leur développement.",
            icon: FaMicrophone,
            color: "primary"
        },
        {
            title: "Concours de danse traditionnelle par fokontany",
            description: "Valorisation des danses ancestrales et du patrimoine culturel de chaque quartier.",
            icon: FaMusic,
            color: "secondary"
        },
        {
            title: "Concours de propreté des quartiers",
            description: "Promotion de l'engagement citoyen et du respect de l'environnement.",
            icon: FaUsers,
            color: "primary"
        },
        {
            title: "Concours des meilleurs déguisements",
            description: "Créativité, originalité et expression festive à l'honneur.",
            icon: FaTheaterMasks,
            color: "secondary"
        },
        {
            title: "Jeux, quiz et animations sur la plage",
            description: "Activités ludiques et interactives pour toute la famille, intégrant sensibilisation à la protection de l'environnement.",
            icon: FaUmbrellaBeach,
            color: "primary"
        },
        {
            title: "Soirée de clôture « FIESTA NIGHT »",
            description: "Grande soirée animée par des artistes locaux et nationaux de renom.",
            icon: FaStar,
            color: "secondary"
        }
    ];

    const archives = [
        { year: "2024", image: archive2024, title: "Édition 2024", participants: "450+", disciplines: "12" },
        { year: "2023", image: archive2023, title: "Édition 2023", participants: "380+", disciplines: "10" },
        { year: "2022", image: archive2022, title: "Édition 2022", participants: "300+", disciplines: "8" },
        { year: "2021", image: archive2021, title: "Lancement officiel", participants: "150+", disciplines: "4" }
    ];

    return (
        <section 
            id="events" 
            ref={sectionRef}
            className="relative py-20 bg-white overflow-hidden"
        >
            {/* Nouvelles formes décoratives */}
            <div className="absolute inset-0 z-0">
{/* Forme coquillage élégant en haut à gauche */}
<div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-90">
    <div
        className="w-full h-full bg-primary animate-float-slow"
        style={{
            clipPath: 'path("M 50 10 C 70 5, 90 15, 95 35 C 100 55, 85 75, 65 85 C 45 95, 25 85, 15 65 C 5 45, 20 25, 35 15 C 40 12, 45 10, 50 10 Z")',
            filter: 'drop-shadow(0 4px 15px rgba(20, 184, 166, 0.25))'
        }}
    ></div>
</div>
                {/* Forme en vague moderne en bas à droite */}
                <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-90">
                  <div
        className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 animate-float-slow"
        style={{
            clipPath: 'path("M 50 5 C 60 15, 75 10, 85 25 C 95 40, 90 60, 75 75 C 60 90, 40 90, 25 75 C 10 60, 5 40, 15 25 C 25 10, 40 15, 50 5 Z")',
            filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))'
        }}
    ></div>
                </div>
            </div>

            {/* Overlay très léger */}
            <div className="absolute inset-0 bg-white/5 z-10"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
                {/* En-tête de section avec animation */}
                <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Évén<span className="text-secondary">ements</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8 line-grow"></div>
                    
                    {/* Navigation par onglets avec animation */}
                    <div className={`flex flex-wrap justify-center gap-4 mb-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                        <button
                            onClick={() => setActiveTab('prochaine-edition')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm border-2 ${
                                activeTab === 'prochaine-edition'
                                    ? 'bg-primary text-white shadow-lg scale-105 border-primary'
                                    : 'bg-white text-gray-700 hover:bg-primary/10 hover:text-primary card-hover border-gray-200'
                            }`}
                        >
                            Prochaine édition
                        </button>
                        <button
                            onClick={() => setActiveTab('disciplines')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm border-2 ${
                                activeTab === 'disciplines'
                                    ? 'bg-primary text-white shadow-lg scale-105 border-primary'
                                    : 'bg-white text-gray-700 hover:bg-primary/10 hover:text-primary card-hover border-gray-200'
                            }`}
                        >
                            Disciplines
                        </button>
                        <button
                            onClick={() => setActiveTab('archives')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm border-2 ${
                                activeTab === 'archives'
                                    ? 'bg-primary text-white shadow-lg scale-105 border-primary'
                                    : 'bg-white text-gray-700 hover:bg-primary/10 hover:text-primary card-hover border-gray-200'
                            }`}
                        >
                            Archives
                        </button>
                    </div>
                </div>

                {/* Contenu des onglets */}
                <div className={`transition-all duration-500 ${isVisible ? 'scale-in' : 'opacity-0 scale-95'}`}>
                    {/* Prochaine édition */}
                    {activeTab === 'prochaine-edition' && (
                        <div className="space-y-16">
                            {/* En-tête édition 2025 */}
                            <div className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                                    Édition <span className="text-secondary animate-pulse">2025</span>
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in-up" style={{animationDelay: '0.3s'}}>
                                    Du 22 au 28 Décembre 2025 à Farafangana - Sport, Culture et Jeunesse réunis
                                </p>
                            </div>

                            {/* Informations principales */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                {/* Image avec le même style que About */}
                                <div className={`relative ${isVisible ? 'fade-in-left' : 'opacity-0'}`}>
                                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group transform hover:scale-[1.02] transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10 mix-blend-overlay"></div>
                                        <img
                                            src={eventImage}
                                            alt="Prochaine édition Agnambahy Mifety"
                                            className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Effet de brillance au hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    </div>
                                    {/* Élément décoratif flottant */}
                                    <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-secondary rounded-full opacity-100 animate-pulse-gentle"></div>
                                    <div className="absolute -top-3 -left-3 w-16 h-16 bg-primary rounded-full opacity-100 animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
                                </div>

                                {/* Informations dates et lieu - NOUVEAU DESIGN */}
                                <div className={`space-y-8 ${isVisible ? 'fade-in-right' : 'opacity-0'}`}>
                                    {/* Nouveau design pour Date et Lieu */}
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="group relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 fade-in-up" style={{animationDelay: '0.4s'}}>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center icon-bounce">
                                                    <FaCalendarAlt className="text-white text-xl" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg mb-1">Dates</h4>
                                                    <p className="text-white/90 text-base font-semibold">22 - 28 Décembre 2025</p>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        </div>

                                        <div className="group relative overflow-hidden rounded-2xl bg-secondary p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 fade-in-up" style={{animationDelay: '0.5s'}}>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center icon-bounce">
                                                    <FaMapMarkerAlt className="text-white text-xl" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg mb-1">Lieu</h4>
                                                    <p className="text-white/90 text-base font-semibold">Farafangana, Madagascar</p>
                                                
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        </div>
                                    </div>

                                    {/* À propos de l'édition - Texte simple */}
                                    <div className="space-y-4 fade-in-up" style={{animationDelay: '0.6s'}}>
                                        <p className="text-gray-700 leading-relaxed text-base">
                                            Cette année, Agnambahy Mifety reunira performances sportives, expressions culturelles et moments festifs dans une ambiance conviviale et competitives. 
                                        </p>
                                        
                                    </div>

                                    <div className="text-center lg:text-left slide-in-bottom" style={{animationDelay: '0.7s'}}>
                                        <button
                                            onClick={handleInscriptionClick}
                                            className="btn-primary btn-fill text-base px-8 py-4 transform hover:scale-105 transition-all duration-300 font-bold rounded-xl"
                                        >
                                            S'inscrire maintenant
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Disciplines Sportives avec images */}
                            <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 fade-in-up">
                                        Disciplines <span className="text-secondary">Sportives</span>
                                    </h3>
                                    <p className="text-gray-600 max-w-2xl mx-auto fade-in-up" style={{animationDelay: '0.2s'}}>
                                        Compétitions ouvertes à tous, mêlant performance, convivialité et esprit sportif
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {disciplinesSportives.map((discipline, index) => (
                                        <div 
                                            key={index}
                                            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 card-hover group scroll-reveal ${
                                                isVisible ? 'revealed' : ''
                                            }`}
                                            style={{transitionDelay: `${index * 0.1}s`}}
                                        >
                                            {/* Image en haut */}
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={discipline.image}
                                                    alt={discipline.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${
                                                        discipline.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                                                    }`}>
                                                        <discipline.icon className="text-lg" />
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-10"></div>
                                            </div>
                                            
                                            {/* Contenu en bas */}
                                            <div className="p-5">
                                                <h4 className={`font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform duration-300 ${
                                                    discipline.color === 'primary' ? 'text-primary' : 'text-secondary'
                                                }`}>
                                                    {discipline.title}
                                                </h4>
                                                <div className="space-y-2">
                                                    {discipline.categories.map((cat, catIndex) => (
                                                        <div key={catIndex} className="flex items-center space-x-2">
                                                            <div className={`w-2 h-2 rounded-full ${
                                                                discipline.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                                                            }`}></div>
                                                            <span className="text-sm text-gray-600">{cat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Animations Culturelles - NOUVEAU DESIGN */}
                            <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.3s'}}>
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 fade-in-up">
                                        Animations <span className="text-secondary">Culturelles</span>
                                    </h3>

                                    <p className="text-gray-600 max-w-2xl mx-auto fade-in-up" style={{animationDelay: '0.4s'}}>
                                        Découvrez la richesse culturelle de Farafangana à travers des activités uniques et engageantes
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {animationsCulturelles.map((animation, index) => (
                                        <div 
                                            key={index}
                                            className={`group relative overflow-hidden rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 scroll-reveal ${
                                                isVisible ? 'revealed' : ''
                                            } ${
                                                animation.color === 'primary' 
                                                    ? 'bg-primary' 
                                                    : 'bg-secondary'
                                            }`}
                                            style={{transitionDelay: `${index * 0.1}s`}}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl icon-bounce bg-white/20">
                                                    <animation.icon className="text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                                        {animation.title}
                                                    </h4>
                                                    <p className="text-white/90 leading-relaxed text-base">
                                                        {animation.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Final */}
                            <div className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.8s'}}>
                                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl card-hover transform hover:scale-102 transition-all duration-300">
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                                        Prêt à vivre l'aventure ?
                                    </h3>
                                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
                                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-base">
                                        Rejoignez-nous pour cette édition 2025 exceptionnelle et créez des souvenirs 
                                        inoubliables autour du sport, de la culture et de la fête.
                                    </p>
                                    <div>
                                        <button
                                            onClick={handleInscriptionClick}
                                            className="btn-primary btn-fill text-base px-8 py-4 transform hover:scale-105 transition-all duration-300 font-bold rounded-xl"
                                        >
                                            Je participe à l'aventure
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Disciplines (onglet séparé) */}
                    {activeTab === 'disciplines' && (
                        <div className="space-y-16">
                            <div className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                                    Toutes les <span className="text-secondary">Disciplines</span>
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Découvrez l'ensemble des activités sportives et culturelles proposées
                                </p>
                            </div>

                            {/* Disciplines Sportives avec images */}
                            <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                                <h4 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                                    Disciplines <span className="text-secondary">Sportives</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {disciplinesSportives.map((discipline, index) => (
                                        <div 
                                            key={index}
                                            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 card-hover group ${
                                                isVisible ? 'revealed' : ''
                                            }`}
                                            style={{transitionDelay: `${index * 0.1}s`}}
                                        >
                                            {/* Image en haut */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={discipline.image}
                                                    alt={discipline.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 right-4">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${
                                                        discipline.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                                                    }`}>
                                                        <discipline.icon className="text-xl" />
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16"></div>
                                            </div>
                                            
                                            {/* Contenu en bas */}
                                            <div className="p-6 text-center">
                                                <h4 className={`font-semibold text-lg mb-3 ${
                                                    discipline.color === 'primary' ? 'text-primary' : 'text-secondary'
                                                }`}>
                                                    {discipline.title}
                                                </h4>
                                                <div className="space-y-2">
                                                    {discipline.categories.map((cat, catIndex) => (
                                                        <div key={catIndex} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                                            {cat}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Animations Culturelles & Festives - MÊME STYLE QUE ANIMATIONS CULTURELLES */}
                            <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.2s'}}>
                                <h4 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                                    Animations <span className="text-secondary">Culturelles & Festives</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {animationsCulturelles.map((animation, index) => (
                                        <div 
                                            key={index}
                                            className={`group relative overflow-hidden rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 scroll-reveal ${
                                                isVisible ? 'revealed' : ''
                                            } ${
                                                animation.color === 'primary' 
                                                    ? 'bg-primary' 
                                                    : 'bg-secondary'
                                            }`}
                                            style={{transitionDelay: `${index * 0.1}s`}}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl icon-bounce bg-white/20">
                                                    <animation.icon className="text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                                        {animation.title}
                                                    </h4>
                                                    <p className="text-white/90 leading-relaxed text-base">
                                                        {animation.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}>
                                <button
                                    onClick={handleInscriptionClick}
                                    className="btn-primary btn-fill text-base px-8 py-4 transform hover:scale-105 transition-all duration-300 font-bold rounded-xl"
                                >
                                    Choisir ma discipline
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Archives */}
                    {activeTab === 'archives' && (
                        <div className="space-y-16">
                            <div className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                                    Nos <span className="text-secondary">Archives</span>
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Revivez les moments forts des éditions précédentes d'Agnambahy Mifety
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {archives.map((archive, index) => (
                                    <div 
                                        key={archive.year}
                                        className={`group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 card-hover ${
                                            isVisible ? 'revealed' : ''
                                        }`}
                                        style={{transitionDelay: `${index * 0.1}s`}}
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={archive.image}
                                                alt={`Édition ${archive.year}`}
                                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                                <span className="text-white text-sm bg-primary/80 px-3 py-1 rounded-full">
                                                    {archive.participants} participants
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white/90 text-primary font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                                                {archive.year}
                                            </div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                                                {archive.title}
                                            </h4>
                                            <div className="flex justify-between text-sm text-gray-600 mb-4">
                                                <span>{archive.disciplines} disciplines</span>
                                                <span>{archive.participants}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <div className="text-center p-2 bg-primary/5 rounded-lg">
                                                    <div className="text-primary font-bold text-sm">{archive.disciplines}</div>
                                                    <div className="text-xs text-gray-600">Disciplines</div>
                                                </div>
                                                <div className="text-center p-2 bg-secondary/5 rounded-lg">
                                                    <div className="text-secondary font-bold text-sm">{archive.participants}</div>
                                                    <div className="text-xs text-gray-600">Participants</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Timeline des archives */}
                            <div className={`bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-2xl mt-8 card-hover ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
                                <h4 className="text-2xl font-bold text-center text-primary mb-6">
                                    Évolution d'Agnambahy Mifety
                                </h4>
                                <div className="flex justify-between items-center relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2"></div>
                                    {archives.map((archive, index) => (
                                        <div key={archive.year} className="relative z-10 text-center">
                                            <div className={`w-8 h-8 rounded-full ${
                                                index === 0 ? 'bg-secondary' : 'bg-primary'
                                            } mx-auto mb-2`}></div>
                                            <div className="text-sm font-semibold text-gray-700">{archive.year}</div>
                                            <div className="text-xs text-gray-500">{archive.disciplines} disciplines</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Events;