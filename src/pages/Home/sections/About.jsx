import React, { useEffect, useRef, useState } from 'react'
import aboutImage from '../../../assets/AM7.jpg'
import {
    FaCalendarAlt,
    FaCrosshairs,
    FaHeart,
    FaUsers,
    FaEye,
    FaBasketballBall,
    FaVolleyballBall,
    FaFutbol,
    FaMusic,
    FaHandsHelping,
    FaLightbulb,
    FaPalette,
    FaChartLine,
    FaTrophy,
    FaAward,
    FaMedal,
    FaStar
} from 'react-icons/fa'

const About = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <section
            id="apropos"
            ref={sectionRef}
            className="relative py-20 bg-white overflow-hidden"
        >
            {/* Formes décoratives élégantes */}
            <div className="absolute inset-0 z-0">
                {/* Forme triangulaire moderne en haut à gauche */}

                {/* Forme hexagonale moderne en bas à droite */}
                <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-90">
                    <div
                        className="w-full h-full bg-gradient-to-tl from-red-600 to-red-800 animate-float-slow"
                        style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            animationDelay: '2s'
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
                        À <span className="text-secondary">propos</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full line-grow"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image avec animations */}
                    <div className={`relative ${isVisible ? 'fade-in-left' : 'opacity-0'}`}>
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group transform hover:scale-[1.02] transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-red-600/20 z-10 mix-blend-overlay"></div>
                            <img
                                src={aboutImage}
                                alt="Événement Agnambahy Mifety"
                                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Effet de brillance au hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </div>
                        {/* Élément décoratif flottant */}
                        <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-secondary rounded-full opacity-100 animate-pulse-gentle"></div>
                        <div className="absolute -top-3 -left-3 w-16 h-16 bg-primary rounded-full opacity-100 animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Contenu avec animations séquentielles */}
                    <div className="space-y-10">
                        {/* Historique */}
                        <div className={`relative scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.2s' }}>
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center icon-bounce">
                                <FaCalendarAlt className="text-secondary text-xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="w-3 h-3 bg-primary rounded-full mr-3 pulse-slow"></span>
                                Historique
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed fade-in-up">
                                Né en <span className="text-primary font-semibold bg-primary/20 px-1 rounded">décembre 2021</span>, Agnambahy Mifety est d'abord un tournoi de basketball 3x3 organisé à Farafangana. Au fil des éditions, l'événement s'est enrichi : basket 5x5, beach volley, foot à 7, concours de freestyle, danses urbaines, et bien plus encore.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mt-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
                                Aujourd'hui, Agnambahy Mifety est devenu un <span className="text-secondary font-semibold bg-secondary/20 px-1 rounded">rendez-vous incontournable</span>, porteur de valeurs sportives, culturelles et sociales.
                            </p>
                        </div>

                        {/* Objectifs - NOUVEAU DESIGN */}
                        <div className={`relative scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.4s' }}>
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center icon-bounce">
                                <FaCrosshairs className="text-secondary text-xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-3 h-3 bg-secondary rounded-full mr-3 pulse-slow"></span>
                                Objectifs
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Cartes bleues */}
                                <div className="group relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <div className="absolute top-4 right-4 opacity-20">
                                        <FaHandsHelping className="text-3xl" />
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                                            <FaHandsHelping className="text-white text-sm" />
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight">
                                            Promouvoir le sport et l'unité régionale
                                        </h4>
                                    </div>
                                    <p className="text-blue-100 text-sm leading-relaxed opacity-90">
                                        Favoriser la cohésion sociale à travers le sport
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>

                                <div className="group relative overflow-hidden rounded-2xl bg-secondary p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <div className="absolute top-4 right-4 opacity-20">
                                        <FaPalette className="text-3xl" />
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                                            <FaPalette className="text-white text-sm" />
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight">
                                            Développer la culture et les loisirs
                                        </h4>
                                    </div>
                                    <p className="text-blue-100 text-sm leading-relaxed opacity-90">
                                        Enrichir le paysage culturel de Farafangana
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>

                                {/* Cartes rouges */}
                                <div className="group relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <div className="absolute top-4 right-4 opacity-20">
                                        <FaLightbulb className="text-3xl" />
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                                            <FaLightbulb className="text-white text-sm" />
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight">
                                            Encourager les jeunes talents
                                        </h4>
                                    </div>
                                    <p className="text-red-100 text-sm leading-relaxed opacity-90">
                                        Détecter et valoriser les potentiels locaux
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>

                                <div className="group relative overflow-hidden rounded-2xl bg-secondary p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <div className="absolute top-4 right-4 opacity-20">
                                        <FaChartLine className="text-3xl" />
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                                            <FaChartLine className="text-white text-sm" />
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight">
                                            Attirer des partenaires pour soutenir la jeunesse
                                        </h4>
                                    </div>
                                    <p className="text-red-100 text-sm leading-relaxed opacity-90">
                                        Créer des opportunités de développement
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Valeurs - DESIGN SIMPLIFIÉ */}
                        <div className={`relative scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.6s' }}>
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center icon-bounce">
                                <FaHeart className="text-red-500 text-xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3 pulse-slow"></span>
                                Valeurs
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: FaHandsHelping, name: 'Solidarité' },
                                    { icon: FaHeart, name: 'Respect' },
                                    { icon: FaTrophy, name: 'Excellence' },
                                    { icon: FaUsers, name: 'Fierté' }
                                ].map((value, index) => (
                                    <div key={index} className="group text-center p-4 rounded-lg bg-gray-50 hover:bg-white transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100">
                                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <value.icon className="text-white text-lg" />
                                        </div>
                                        <span className="font-semibold text-gray-800 text-sm">
                                            {value.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiques avec animations */}
                <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                    <div className="text-center card-hover p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg">
                        <FaCalendarAlt className="text-primary text-2xl mx-auto mb-3" />
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-2 count-up">3+</div>
                        <div className="text-gray-600 font-semibold">Éditions réussies</div>
                    </div>
                    <div className="text-center card-hover p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg">
                        <FaBasketballBall className="text-secondary text-2xl mx-auto mb-3" />
                        <div className="text-3xl md:text-4xl font-bold text-secondary mb-2 count-up">15+</div>
                        <div className="text-gray-600 font-semibold">Disciplines</div>
                    </div>
                    <div className="text-center card-hover p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg">
                        <FaUsers className="text-primary text-2xl mx-auto mb-3" />
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-2 count-up">500+</div>
                        <div className="text-gray-600 font-semibold">Participants</div>
                    </div>
                    <div className="text-center card-hover p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg">
                        <FaEye className="text-secondary text-2xl mx-auto mb-3" />
                        <div className="text-3xl md:text-4xl font-bold text-secondary mb-2 count-up">10k+</div>
                        <div className="text-gray-600 font-semibold">Spectateurs</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;