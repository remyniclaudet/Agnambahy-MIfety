import React from 'react'
import aboutImage from '../../../assets/AM7.jpg'

const About = () => {
    return (
        <section id="about" className="relative py-20 bg-white overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête de section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        À <span className="text-secondary">propos</span>
                    </h2>
                    <div className="w-20 h-1 bg-gréadient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={aboutImage}
                                alt="Événement Agnambahy Mifety"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Cadre décoratif */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-secondary rounded-2xl z-0"></div>
                    </div>

                    {/* Contenu */}
                    <div className="space-y-10">
                        {/* Historique */}
                        <div className="relative">
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📅</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                                Historique
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Né en <span className="text-primary font-semibold">décembre 2021</span>, Agnambahy Mifety est d'abord un tournoi de basketball 3x3 organisé à Farafangana. Au fil des éditions, l'événement s'est enrichi : basket 5x5, beach volley, foot à 7, concours de freestyle, danses urbaines, et bien plus encore.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mt-4">
                                Aujourd'hui, Agnambahy Mifety est devenu un <span className="text-secondary font-semibold">rendez-vous incontournable</span>, porteur de valeurs sportives, culturelles et sociales.
                            </p>
                        </div>

                        {/* Objectifs */}
                        <div className="relative">
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-3 h-3 bg-secondary rounded-full mr-3"></span>
                                Objectifs
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                                    <h4 className="font-semibold text-primary mb-2">Promouvoir le sport et l'unité régionale</h4>
                                </div>
                                <div className="bg-secondary/5 p-4 rounded-lg border-l-4 border-secondary">
                                    <h4 className="font-semibold text-secondary mb-2">Encourager les jeunes talents</h4>
                                </div>
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                                    <h4 className="font-semibold text-primary mb-2">Développer la culture et les loisirs</h4>
                                </div>
                                <div className="bg-secondary/5 p-4 rounded-lg border-l-4 border-secondary">
                                    <h4 className="font-semibold text-secondary mb-2">Attirer des partenaires pour soutenir la jeunesse</h4>
                                </div>
                            </div>
                        </div>

                        {/* Valeurs */}
                        <div className="relative">
                            <div className="absolute -left-8 top-0 w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">❤️</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></span>
                                Valeurs
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">Solidarité</span>
                                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-semibold">Respect</span>
                                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">Excellence</span>
                                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-semibold">Fierté régionale</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;