import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import eventImage from '../../../assets/AM4.jpg';
import archive2024 from '../../../assets/AM2.jpg';
import archive2023 from '../../../assets/AM2.jpg';
import archive2022 from '../../../assets/AM2.jpg';
import archive2021 from '../../../assets/AM2.jpg';

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
            icon: "🏀",
            color: "primary"
        },
        {
            title: "Tournois 5x5",
            categories: ["Équipes hommes", "Équipes dames"],
            icon: "🏀",
            color: "secondary"
        },
        {
            title: "Tournoi de football à 7",
            categories: ["Hommes", "Dames"],
            icon: "⚽",
            color: "primary"
        },
        {
            title: "Tournoi de beach volley",
            categories: ["Hommes"],
            icon: "🏐",
            color: "secondary"
        },
        {
            title: "Tournoi de handball mixte",
            categories: ["Mixte"],
            icon: "🤾",
            color: "primary"
        },
        {
            title: "Kick-boxing",
            categories: ["Compétition"],
            icon: "🥊",
            color: "secondary"
        },
        {
            title: "Course « PosyPosy »",
            categories: ["Course populaire"],
            icon: "🏃",
            color: "primary"
        }
    ];

    const animationsCulturelles = [
        {
            title: "Conférence « NOSYW Mihaino ny Tanora »",
            description: "Les jeunes peuvent exprimer leurs problèmes, partager leurs réalités et proposer des solutions pour leur développement.",
            icon: "🗣️",
            color: "primary"
        },
        {
            title: "Concours de danse traditionnelle par fokontany",
            description: "Valorisation des danses ancestrales et du patrimoine culturel de chaque quartier.",
            icon: "💃",
            color: "secondary"
        },
        {
            title: "Concours de propreté des quartiers",
            description: "Promotion de l'engagement citoyen et du respect de l'environnement.",
            icon: "🧹",
            color: "primary"
        },
        {
            title: "Concours des meilleurs déguisements",
            description: "Créativité, originalité et expression festive à l'honneur.",
            icon: "🎭",
            color: "secondary"
        },
        {
            title: "Jeux, quiz et animations sur la plage",
            description: "Activités ludiques et interactives pour toute la famille, intégrant sensibilisation à la protection de l'environnement.",
            icon: "🏖️",
            color: "primary"
        },
        {
            title: "Soirée de clôture « FIESTA NIGHT »",
            description: "Grande soirée animée par des artistes locaux et nationaux de renom.",
            icon: "🎉",
            color: "secondary"
        }
    ];

    const archives = [
        { year: "2024", image: archive2024, title: "Édition 2024", participants: "450+", disciplines: "12" },
        { year: "2023", image: archive2023, title: "Édition 2023", participants: "380+", disciplines: "10" },
        { year: "2022", image: archive2022, title: "Édition 2022", participants: "300+", disciplines: "8" },
        { year: "2021", image: archive2021, title: "Lancement officiel", participants: "150+", disciplines: "4" }
    ];


     // Écouter l'événement personnalisé pour changer d'onglet
        const handleTabChange = (event) => {
            setActiveTab(event.detail);
        };

        window.addEventListener('changeEventsTab', handleTabChange);

    return (
        <section 
            id="events" 
            ref={sectionRef}
            className="relative py-20 bg-gray-50 overflow-hidden"
        >
            {/* Éléments décoratifs avec animations */}
            <div className={`absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 float ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 float ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                 style={{animationDelay: '1s'}}></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                                activeTab === 'prochaine-edition'
                                    ? 'bg-primary text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-primary/10 hover:text-primary card-hover'
                            }`}
                        >
                            Prochaine édition
                        </button>
                        <button
                            onClick={() => setActiveTab('disciplines')}
                            className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                                activeTab === 'disciplines'
                                    ? 'bg-primary text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-primary/10 hover:text-primary card-hover'
                            }`}
                        >
                            Disciplines
                        </button>
                        <button
                            onClick={() => setActiveTab('archives')}
                            className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                                activeTab === 'archives'
                                    ? 'bg-primary text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-primary/10 hover:text-primary card-hover'
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
                                {/* Image */}
                                <div className={`relative ${isVisible ? 'fade-in-left' : 'opacity-0'}`}>
                                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl image-zoom group">
                                        <img
                                            src={eventImage}
                                            alt="Prochaine édition Agnambahy Mifety"
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white text-base font-semibold bg-primary/80 px-3 py-1.5 rounded-full scale-in">
                                                Édition 2025
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-primary rounded-2xl z-0 pulse-slow"></div>
                                </div>

                                {/* Informations dates et lieu */}
                                <div className={`space-y-8 ${isVisible ? 'fade-in-right' : 'opacity-0'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="card-hover p-6 rounded-xl bg-primary/5 border-l-4 border-primary transform hover:scale-105 transition-all duration-300 fade-in-up" style={{animationDelay: '0.4s'}}>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center icon-bounce">
                                                    <span className="text-lg">📅</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">Dates</h4>
                                                    <p className="text-base text-primary font-bold">22-28 DÉC 2025</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-hover p-6 rounded-xl bg-secondary/5 border-l-4 border-secondary transform hover:scale-105 transition-all duration-300 fade-in-up" style={{animationDelay: '0.5s'}}>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center icon-bounce">
                                                    <span className="text-lg">📍</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">Lieu</h4>
                                                    <p className="text-base text-secondary font-bold">Farafangana</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border-l-4 border-primary card-hover transform hover:scale-102 transition-all duration-300 fade-in-up" style={{animationDelay: '0.6s'}}>
                                        <h4 className="font-semibold text-gray-900 mb-2">À propos de l'édition 2025</h4>
                                        <p className="text-gray-600">
                                            Cette édition réunira performances sportives, expressions culturelles et moments festifs 
                                            dans une ambiance conviviale et compétitive.
                                        </p>
                                    </div>

                                    <div className="text-center lg:text-left slide-in-bottom" style={{animationDelay: '0.7s'}}>
                                        <button
                                            onClick={handleInscriptionClick}
                                            className="btn-primary btn-fill text-base px-6 py-3 transform hover:scale-105 transition-all duration-300"
                                        >
                                            S'inscrire maintenant
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Disciplines Sportives */}
                            <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 fade-in-up">
                                        Disciplines <span className="text-secondary">Sportives</span>
                                    </h3>
                                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
                                    <p className="text-gray-600 max-w-2xl mx-auto fade-in-up" style={{animationDelay: '0.2s'}}>
                                        Compétitions ouvertes à tous, mêlant performance, convivialité et esprit sportif
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {disciplinesSportives.map((discipline, index) => (
                                        <div 
                                            key={index}
                                            className={`p-6 rounded-xl border-l-4 transition-all duration-500 card-hover group scroll-reveal ${
                                                isVisible ? 'revealed' : ''
                                            } ${
                                                discipline.color === 'primary' 
                                                    ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                                                    : 'border-secondary bg-secondary/5 hover:bg-secondary/10'
                                            }`}
                                            style={{transitionDelay: `${index * 0.1}s`}}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg icon-bounce ${
                                                    discipline.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'
                                                }`}>
                                                    {discipline.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`font-semibold text-base mb-2 group-hover:translate-x-1 transition-transform duration-300 fade-in-left ${
                                                        discipline.color === 'primary' ? 'text-primary' : 'text-secondary'
                                                    }`}>
                                                        {discipline.title}
                                                    </h4>
                                                    <div className="space-y-1">
                                                        {discipline.categories.map((cat, catIndex) => (
                                                            <div key={catIndex} className="flex items-center space-x-2 fade-in-up" style={{animationDelay: `${catIndex * 0.05}s`}}>
                                                                <div className={`w-2 h-2 rounded-full pulse-slow ${
                                                                    discipline.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                                                                }`}></div>
                                                                <span className="text-sm text-gray-600">{cat}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Animations Culturelles */}
                            <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.3s'}}>
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 fade-in-up">
                                        Animations <span className="text-secondary">Culturelles & Festives</span>
                                    </h3>
                                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
                                    <p className="text-gray-600 max-w-2xl mx-auto fade-in-up" style={{animationDelay: '0.4s'}}>
                                        Valorisation du patrimoine culturel, engagement citoyen et moments festifs
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {animationsCulturelles.map((animation, index) => (
                                        <div 
                                            key={index}
                                            className={`p-6 rounded-xl border-l-4 transition-all duration-500 card-hover group scroll-reveal ${
                                                isVisible ? 'revealed' : ''
                                            } ${
                                                animation.color === 'primary' 
                                                    ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                                                    : 'border-secondary bg-secondary/5 hover:bg-secondary/10'
                                            }`}
                                            style={{transitionDelay: `${index * 0.1}s`}}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg icon-bounce ${
                                                    animation.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'
                                                }`}>
                                                    {animation.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`font-semibold text-base mb-3 group-hover:translate-x-1 transition-transform duration-300 fade-in-left ${
                                                        animation.color === 'primary' ? 'text-primary' : 'text-secondary'
                                                    }`}>
                                                        {animation.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 leading-relaxed fade-in-up" style={{animationDelay: '0.2s'}}>
                                                        {animation.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Final - Prêt à participer à l'aventure */}
                            <div className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.8s'}}>
                                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl card-hover transform hover:scale-102 transition-all duration-300">
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 fade-in-up">
                                        Prêt à participer à l'aventure ?
                                    </h3>
                                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
                                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto fade-in-up" style={{animationDelay: '0.3s'}}>
                                        Rejoignez-nous pour cette édition 2025 exceptionnelle et vivez des moments inoubliables 
                                        de sport, de culture et de festivités.
                                    </p>
                                    <div className="fade-in-up" style={{animationDelay: '0.5s'}}>
                                        <button
                                            onClick={handleInscriptionClick}
                                            className="btn-primary btn-fill text-base px-6 py-3 transform hover:scale-105 transition-all duration-300"
                                        >
                                            S'inscrire maintenant
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
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in-up" style={{animationDelay: '0.3s'}}>
                                    Découvrez l'ensemble des activités sportives et culturelles proposées
                                </p>
                            </div>

                            {/* Disciplines Sportives */}
                            <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                                <h4 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center fade-in-up">
                                    Disciplines <span className="text-secondary">Sportives</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {disciplinesSportives.map((discipline, index) => (
                                        <div 
                                            key={index}
                                            className={`p-6 rounded-xl border-l-4 transition-all duration-500 card-hover group scroll-reveal ${
                                                isVisible ? 'revealed' : ''
                                            } ${
                                                discipline.color === 'primary' 
                                                    ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                                                    : 'border-secondary bg-secondary/5 hover:bg-secondary/10'
                                            }`}
                                            style={{transitionDelay: `${index * 0.1}s`}}
                                        >
                                            <div className="text-center">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-4 icon-bounce ${
                                                    discipline.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'
                                                }`}>
                                                    {discipline.icon}
                                                </div>
                                                <h4 className={`font-semibold text-base mb-3 fade-in-up ${
                                                    discipline.color === 'primary' ? 'text-primary' : 'text-secondary'
                                                }`}>
                                                    {discipline.title}
                                                </h4>
                                                <div className="space-y-2">
                                                    {discipline.categories.map((cat, catIndex) => (
                                                        <div key={catIndex} className="text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full fade-in-up" style={{animationDelay: `${catIndex * 0.05}s`}}>
                                                            {cat}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Animations Culturelles */}
                            <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.2s'}}>
                                <h4 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center fade-in-up">
                                    Animations <span className="text-secondary">Culturelles & Festives</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {animationsCulturelles.map((animation, index) => (
                                        <div 
                                            key={index}
                                            className={`p-6 rounded-xl border-l-4 transition-all duration-500 card-hover group scroll-reveal ${
                                                isVisible ? 'revealed' : ''
                                            } ${
                                                animation.color === 'primary' 
                                                    ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                                                    : 'border-secondary bg-secondary/5 hover:bg-secondary/10'
                                            }`}
                                            style={{transitionDelay: `${index * 0.1}s`}}
                                        >
                                            <div className="text-center">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-4 icon-bounce ${
                                                    animation.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'
                                                }`}>
                                                    {animation.icon}
                                                </div>
                                                <h4 className={`font-semibold text-base mb-3 fade-in-up ${
                                                    animation.color === 'primary' ? 'text-primary' : 'text-secondary'
                                                }`}>
                                                    {animation.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 leading-relaxed fade-in-up" style={{animationDelay: '0.2s'}}>
                                                    {animation.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}>
                                <button
                                    onClick={handleInscriptionClick}
                                    className="btn-primary btn-fill text-base px-6 py-3 transform hover:scale-105 transition-all duration-300"
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
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in-up" style={{animationDelay: '0.3s'}}>
                                    Revivez les moments forts des éditions précédentes d'Agnambahy Mifety
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {archives.map((archive, index) => (
                                    <div 
                                        key={archive.year}
                                        className={`group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 card-hover scroll-reveal ${
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
                                                <span className="text-white text-sm bg-primary/80 px-3 py-1 rounded-full scale-in">
                                                    {archive.participants} participants
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white/90 text-primary font-bold px-3 py-1 rounded-full text-sm shadow-lg pulse-slow">
                                                {archive.year}
                                            </div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 fade-in-up">
                                                {archive.title}
                                            </h4>
                                            <div className="flex justify-between text-sm text-gray-600 mb-4">
                                                <span className="fade-in-left">{archive.disciplines} disciplines</span>
                                                <span className="fade-in-right">{archive.participants}</span>
                                            </div>
                                            {/* Statistiques avec animations */}
                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <div className="text-center p-2 bg-primary/5 rounded-lg fade-in-up" style={{animationDelay: '0.2s'}}>
                                                    <div className="text-primary font-bold text-sm">{archive.disciplines}</div>
                                                    <div className="text-xs text-gray-600">Disciplines</div>
                                                </div>
                                                <div className="text-center p-2 bg-secondary/5 rounded-lg fade-in-up" style={{animationDelay: '0.3s'}}>
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
                                <h4 className="text-2xl font-bold text-center text-primary mb-6 fade-in-up">
                                    Évolution d'Agnambahy Mifety
                                </h4>
                                <div className="flex justify-between items-center relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 line-grow"></div>
                                    {archives.map((archive, index) => (
                                        <div key={archive.year} className="relative z-10 text-center fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                                            <div className={`w-8 h-8 rounded-full ${
                                                index === 0 ? 'bg-secondary' : 'bg-primary'
                                            } mx-auto mb-2 pulse-slow`}></div>
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