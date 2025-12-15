import React from 'react';
import { 
    FaFacebook, 
    FaWhatsapp, 
    FaEnvelope, 
    FaHome, 
    FaInfoCircle, 
    FaCalendarAlt, 
    FaHandshake, 
    FaDonate, 
    FaPhone, 
    FaTrophy,
    FaHistory,
    FaHeart,
    FaUsers
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const openWhatsApp = () => {
        const message = "Bonjour, je souhaite contacter Agnambahy Mifety...";
        window.open(`https://wa.me/261342106888?text=${encodeURIComponent(message)}`, '_blank');
    };

    const openFacebook = () => {
        window.open('https://www.facebook.com/share/1BSAxRLWNB/?mibextid=wwXIfr', '_blank');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const handleEventsNavigation = (tab) => {
        const eventsSection = document.getElementById('events');
        if (eventsSection) {
            const offsetTop = eventsSection.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                const event = new CustomEvent('changeEventsTab', { detail: tab });
                window.dispatchEvent(event);
            }, 500);
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            {/* Section principale du footer */}
            <div className="relative overflow-hidden">
                {/* Éléments décoratifs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo et description */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center mb-4">
                                <img
                                    src="/AM.png"
                                    alt="Agnambahy Mifety"
                                    className="h-12 w-auto"
                                />
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                Agnambahy Mifety - Sport, Culture et Jeunesse à Farafangana. 
                                Ensemble, créons des moments inoubliables et développons les talents de demain.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={openFacebook}
                                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook className="text-white text-lg" />
                                </button>
                                <button
                                    onClick={openWhatsApp}
                                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp className="text-white text-lg" />
                                </button>
                                <a
                                    href="mailto:agnambahymifety@gmail.com"
                                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
                                    aria-label="Email"
                                >
                                    <FaEnvelope className="text-white text-lg" />
                                </a>
                            </div>
                        </div>

                        {/* Liens rapides */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => scrollToSection('hero')}
                                        className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm flex items-center space-x-2 w-full text-left"
                                    >
                                        <FaHome className="w-4 h-4" />
                                        <span>Accueil</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection('apropos')}
                                        className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm flex items-center space-x-2 w-full text-left"
                                    >
                                        <FaInfoCircle className="w-4 h-4" />
                                        <span>À propos</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleEventsNavigation('prochaine-edition')}
                                        className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm flex items-center space-x-2 w-full text-left"
                                    >
                                        <FaCalendarAlt className="w-4 h-4" />
                                        <span>Événements</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection('sponsors')}
                                        className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm flex items-center space-x-2 w-full text-left"
                                    >
                                        <FaHandshake className="w-4 h-4" />
                                        <span>Sponsors</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Liens ressources */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Ressources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => scrollToSection('donation')}
                                        className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm flex items-center space-x-2 w-full text-left"
                                    >
                                        <FaDonate className="w-4 h-4" />
                                        <span>Faire un don</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection('contact')}
                                        className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm flex items-center space-x-2 w-full text-left"
                                    >
                                        <FaPhone className="w-4 h-4" />
                                        <span>Contact</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleEventsNavigation('disciplines')}
                                        className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm flex items-center space-x-2 w-full text-left"
                                    >
                                        <FaTrophy className="w-4 h-4" />
                                        <span>Disciplines</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleEventsNavigation('archives')}
                                        className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm flex items-center space-x-2 w-full text-left"
                                    >
                                        <FaHistory className="w-4 h-4" />
                                        <span>Archives</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <FaEnvelope className="text-primary text-lg flex-shrink-0" />
                                    <a 
                                        href="mailto:agnambahymifety@gmail.com"
                                        className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm break-words"
                                    >
                                        agnambahymifety@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaWhatsapp className="text-secondary text-lg flex-shrink-0" />
                                    <button
                                        onClick={openWhatsApp}
                                        className="text-gray-300 hover:text-secondary transition-colors duration-200 text-sm text-left"
                                    >
                                        +261 34 21 068 88
                                    </button>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaFacebook className="text-primary text-lg flex-shrink-0" />
                                    <button
                                        onClick={openFacebook}
                                        className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm text-left"
                                    >
                                        Page Facebook
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section de copyright */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © {currentYear} Agnambahy Mifety. Tous droits réservés.
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 flex-wrap justify-center">
                            <span className="flex items-center space-x-1">
                                <FaTrophy className="w-3 h-3" />
                                <span>Sport</span>
                            </span>
                            <span className="text-primary">•</span>
                            <span className="flex items-center space-x-1">
                                <FaHeart className="w-3 h-3" />
                                <span>Culture</span>
                            </span>
                            <span className="text-secondary">•</span>
                            <span className="flex items-center space-x-1">
                                <FaUsers className="w-3 h-3" />
                                <span>Jeunesse</span>
                            </span>
                            <span className="text-primary">•</span>
                            <span>Farafangana</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;