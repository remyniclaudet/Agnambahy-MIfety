import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Préparer le message pour l'email
        const emailBody = `Nom: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AObjet: ${formData.subject}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        
        // Ouvrir le client email par défaut
        window.location.href = `mailto:agnambahymifety@gmail.com?subject=${formData.subject}&body=${emailBody}`;
        
        // Réinitialiser le formulaire
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const openWhatsApp = () => {
        const message = "Bonjour, je souhaite contacter Agnambahy Mifety...";
        window.open(`https://wa.me/261342106888?text=${encodeURIComponent(message)}`, '_blank');
    };

    const openFacebook = () => {
        window.open('https://www.facebook.com/share/1BSAxRLWNB/?mibextid=wwXIfr', '_blank');
    };

    const subjects = [
        { value: '', label: 'Choisir un sujet' },
        { value: 'Question générale', label: 'Question générale' },
        { value: 'Inscription', label: 'Inscription' },
        { value: 'Partenariat', label: 'Partenariat' },
        { value: 'Don', label: 'Faire un don' },
        { value: 'Autre', label: 'Autre' }
    ];

    return (
        <section 
            id="contact" 
            ref={sectionRef}
            className="relative py-20 bg-white overflow-hidden"
        >
            {/* Éléments décoratifs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 float" style={{animationDelay: '1s'}}></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête de section */}
                <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Nous <span className="text-secondary">Contacter</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8 line-grow"></div>
                    
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Vous avez une question, un projet ou souhaitez participer à l'aventure ? 
                        L'équipe Agnambahy Mifety est à votre écoute !
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Formulaire de contact */}
                    <div className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`}>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Envoyez-nous un message</h3>
                            <p className="text-gray-600">
                                Remplissez ce formulaire et votre message sera directement adressé à notre équipe.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="fade-in-up">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom complet *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                        placeholder="Votre nom complet"
                                    />
                                </div>
                                <div className="fade-in-up" style={{animationDelay: '0.1s'}}>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse e-mail *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </div>

                            <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Objet *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                >
                                    {subjects.map((subject) => (
                                        <option key={subject.value} value={subject.value}>
                                            {subject.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="fade-in-up" style={{animationDelay: '0.3s'}}>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                                    placeholder="Votre message..."
                                ></textarea>
                            </div>

                            <div className="fade-in-up" style={{animationDelay: '0.4s'}}>
                                <button
                                    type="submit"
                                    className="btn-primary btn-fill text-base px-6 py-3 w-full transform hover:scale-105 transition-all duration-300"
                                >
                                    Envoyer le message
                                </button>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Votre message sera envoyé à : agnambahymifety@gmail.com
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Informations de contact */}
                    <div className="space-y-8">
                        {/* Coordonnées principales */}
                        <div className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 card-hover scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.2s'}}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos Coordonnées</h3>
                            
                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center icon-bounce">
                                        <span className="text-xl">✉️</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-lg">Email</h4>
                                        <a 
                                            href="mailto:agnambahymifety@gmail.com"
                                            className="text-primary font-medium hover:text-primary/80 transition-colors duration-200 text-base"
                                        >
                                            agnambahymifety@gmail.com
                                        </a>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Réponse sous 24-48 heures
                                        </p>
                                    </div>
                                </div>
                                
                                {/* WhatsApp */}
                                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center icon-bounce">
                                        <span className="text-xl">💬</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-lg">WhatsApp</h4>
                                        <button
                                            onClick={openWhatsApp}
                                            className="text-green-600 font-medium hover:text-green-700 transition-colors duration-200 text-base"
                                        >
                                            +261 34 21 068 88
                                        </button>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Réponse rapide
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Facebook */}
                                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center icon-bounce">
                                        <span className="text-xl">📘</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-lg">Facebook</h4>
                                        <button
                                            onClick={openFacebook}
                                            className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 text-base"
                                        >
                                            Page Agnambahy Mifety
                                        </button>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Actualités et événements
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Boutons d'action rapide */}
                        <div className={`bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-gray-200 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.4s'}}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Rapide</h3>
                            
                            <div className="space-y-4">
                                <button
                                    onClick={openWhatsApp}
                                    className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                                >
                                    <span>💬</span>
                                    <span>Nous écrire sur WhatsApp</span>
                                </button>
                                
                                <button
                                    onClick={() => window.location.href = 'mailto:agnambahymifety@gmail.com'}
                                    className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-gray-900 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                                >
                                    <span>✉️</span>
                                    <span>Envoyer un email direct</span>
                                </button>
                                
                                <button
                                    onClick={openFacebook}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                                >
                                    <span>📘</span>
                                    <span>Visiter notre Facebook</span>
                                </button>
                            </div>
                        </div>

                        {/* Message d'engagement */}
                        <div className={`bg-secondary/5 rounded-2xl p-6 border border-secondary/20 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{transitionDelay: '0.6s'}}>
                            <h4 className="font-semibold text-secondary mb-3 text-center text-lg">Notre Engagement</h4>
                            <p className="text-gray-600 text-center">
                                Nous nous engageons à répondre à tous vos messages dans les plus brefs délais. 
                                Votre satisfaction est notre priorité.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;