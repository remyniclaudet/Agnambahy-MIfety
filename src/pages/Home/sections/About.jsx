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
  FaChartLine
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
            {/* Éléments décoratifs avec animations */}
            <div className={`absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 float ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 float ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                 style={{animationDelay: '2s'}}></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl image-zoom group">
                            <img
                                src={aboutImage}
                                alt="Événement Agnambahy Mifety"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay au hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        {/* Cadre décoratif avec animation */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-secondary rounded-2xl z-0 pulse-slow"></div>
                    </div>

                    {/* Contenu avec animations séquentielles */}
                    <div className="space-y-10">
                        {/* Historique */}
                        <div className={`relative scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.2s'}}>
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center icon-bounce">
                                <FaCalendarAlt className="text-primary text-xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="w-3 h-3 bg-primary rounded-full mr-3 pulse-slow"></span>
                                Historique
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed fade-in-up">
                                Né en <span className="text-primary font-semibold bg-primary/10 px-1 rounded">décembre 2021</span>, Agnambahy Mifety est d'abord un tournoi de basketball 3x3 organisé à Farafangana. Au fil des éditions, l'événement s'est enrichi : basket 5x5, beach volley, foot à 7, concours de freestyle, danses urbaines, et bien plus encore.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mt-4 fade-in-up" style={{animationDelay: '0.3s'}}>
                                Aujourd'hui, Agnambahy Mifety est devenu un <span className="text-secondary font-semibold bg-secondary/10 px-1 rounded">rendez-vous incontournable</span>, porteur de valeurs sportives, culturelles et sociales.
                            </p>
                        </div>

                        {/* Objectifs */}
                        <div className={`relative scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.4s'}}>
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center icon-bounce">
                                <FaCrosshairs className="text-secondary text-xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-3 h-3 bg-secondary rounded-full mr-3 pulse-slow"></span>
                                Objectifs
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary card-hover group">
                                    <div className="flex items-center mb-2">
                                        <FaHandsHelping className="text-primary mr-2 text-sm" />
                                        <h4 className="font-semibold text-primary group-hover:translate-x-2 transition-transform duration-300">
                                            Promouvoir le sport et l'unité régionale
                                        </h4>
                                    </div>
                                    <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Favoriser la cohésion sociale à travers le sport
                                    </p>
                                </div>
                                <div className="bg-secondary/5 p-4 rounded-lg border-l-4 border-secondary card-hover group">
                                    <div className="flex items-center mb-2">
                                        <FaLightbulb className="text-secondary mr-2 text-sm" />
                                        <h4 className="font-semibold text-secondary group-hover:translate-x-2 transition-transform duration-300">
                                            Encourager les jeunes talents
                                        </h4>
                                    </div>
                                    <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Détecter et valoriser les potentiels locaux
                                    </p>
                                </div>
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary card-hover group">
                                    <div className="flex items-center mb-2">
                                        <FaPalette className="text-primary mr-2 text-sm" />
                                        <h4 className="font-semibold text-primary group-hover:translate-x-2 transition-transform duration-300">
                                            Développer la culture et les loisirs
                                        </h4>
                                    </div>
                                    <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Enrichir le paysage culturel de Farafangana
                                    </p>
                                </div>
                                <div className="bg-secondary/5 p-4 rounded-lg border-l-4 border-secondary card-hover group">
                                    <div className="flex items-center mb-2">
                                        <FaChartLine className="text-secondary mr-2 text-sm" />
                                        <h4 className="font-semibold text-secondary group-hover:translate-x-2 transition-transform duration-300">
                                            Attirer des partenaires pour soutenir la jeunesse
                                        </h4>
                                    </div>
                                    <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Créer des opportunités de développement
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Valeurs */}
                        <div className={`relative scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.6s'}}>
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center icon-bounce">
                                <FaHeart className="text-red-500 text-xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3 pulse-slow"></span>
                                Valeurs
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold card-hover transform hover:scale-110 transition-all duration-300 flex items-center">
                                    <FaHandsHelping className="mr-2" />
                                    Solidarité
                                </span>
                                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-semibold card-hover transform hover:scale-110 transition-all duration-300 flex items-center">
                                    <FaHeart className="mr-2" />
                                    Respect
                                </span>
                                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold card-hover transform hover:scale-110 transition-all duration-300 flex items-center">
                                    <FaChartLine className="mr-2" />
                                    Excellence
                                </span>
                                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-semibold card-hover transform hover:scale-110 transition-all duration-300 flex items-center">
                                    <FaUsers className="mr-2" />
                                    Fierté régionale
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiques avec animations */}
                <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.8s'}}>
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