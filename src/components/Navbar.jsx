import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEventsOpen, setIsEventsOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Détection de la taille d'écran
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileView(window.innerWidth < 1024); // lg breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Gestion du scroll pour la navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fonction pour naviguer vers une section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Fermer le menu mobile
            setIsOpen(false);
            setIsEventsOpen(false);
            
            // Scroll vers l'élément
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Fonction pour gérer la navigation des événements
    const handleEventsNavigation = (tab) => {
        // Fermer le menu mobile
        setIsOpen(false);
        setIsEventsOpen(false);
        
        // S'assurer que la section events est visible
        const eventsSection = document.getElementById('events');
        if (eventsSection) {
            const offsetTop = eventsSection.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Attendre un peu avant de changer l'onglet pour une meilleure expérience
            setTimeout(() => {
                // Déclencher le changement d'onglet dans le composant Events
                const event = new CustomEvent('changeEventsTab', { detail: tab });
                window.dispatchEvent(event);
            }, 500);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 ${isScrolled ? 'navbar-scrolled' : ''
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                src="/AM.png"
                                alt="Logo"
                                className="h-10 w-auto sm:h-14 transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Menu desktop - Centré horizontalement et verticalement */}
                    <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
                        <div className="flex space-x-4 xl:space-x-8">
                            <a 
                                href="#hero" 
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('hero');
                                }}
                            >
                                Accueil
                            </a>
                            <a 
                                href="#apropos" 
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('apropos');
                                }}
                            >
                                À propos
                            </a>

                            {/* Menu Événements avec sous-menus */}
                            <div className="relative group">
                                <button
                                    className="nav-link flex items-center focus:outline-none"
                                >
                                    Événements
                                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>

                                {/* Sous-menus Événements */}
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                                    <a 
                                        href="#prochaine-edition" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEventsNavigation('prochaine-edition');
                                        }}
                                    >
                                        Prochaine édition
                                    </a>
                                    <a 
                                        href="#disciplines" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEventsNavigation('disciplines');
                                        }}
                                    >
                                        Disciplines
                                    </a>
                                    <a 
                                        href="#archives" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEventsNavigation('archives');
                                        }}
                                    >
                                        Archives
                                    </a>
                                </div>
                            </div>
                            <a 
                                href="#sponsors" 
                                className="nav-link hidden 2xl:block"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('sponsors');
                                }}
                            >
                                Sponsors
                            </a>
                            <a 
                                href="#donation" 
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('donation');
                                }}
                            >
                                Faire un Don
                            </a>
                            <a 
                                href="#contact" 
                                className="nav-link hidden xl:block"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('contact');
                                }}
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* CTA et menu mobile */}
                    <div className="flex items-center">
                        <div className="hidden lg:ml-6 lg:flex lg:items-center">
                            <button 
                                className="btn-primary text-sm xl:text-base"
                                onClick={() => handleEventsNavigation('prochaine-edition')}
                            >
                                Découvrir l'événement
                            </button>
                        </div>

                        {/* Bouton menu mobile */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none transition-colors duration-200"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Ouvrir le menu principal</span>
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="pt-2 pb-3 space-y-1 px-2">
                        <a 
                            href="#hero" 
                            className="mobile-nav-link" 
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('hero');
                            }}
                        >
                            Accueil
                        </a>
                        <a 
                            href="#apropos" 
                            className="mobile-nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('apropos');
                            }}
                        >
                            À propos
                        </a>

                        {/* Menu déroulant Événements version mobile */}
                        <div>
                            <button
                                className="mobile-nav-link w-full text-left flex justify-between items-center"
                                onClick={() => setIsEventsOpen(!isEventsOpen)}
                            >
                                <span>Événements</span>
                                <svg className={`h-4 w-4 transition-transform ${isEventsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            {isEventsOpen && (
                                <div className="pl-4 mt-2 space-y-2 bg-gray-50 rounded-md py-2">
                                    <a 
                                        href="#prochaine-edition" 
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEventsNavigation('prochaine-edition');
                                        }}
                                    >
                                        Prochaine édition
                                    </a>
                                    <a 
                                        href="#disciplines" 
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEventsNavigation('disciplines');
                                        }}
                                    >
                                        Disciplines
                                    </a>
                                    <a 
                                        href="#archives" 
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEventsNavigation('archives');
                                        }}
                                    >
                                        Archives
                                    </a>
                                </div>
                            )}
                        </div>

                        <a 
                            href="#sponsors" 
                            className="mobile-nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('sponsors');
                            }}
                        >
                            Sponsors
                        </a>
                        <a 
                            href="#donation" 
                            className="mobile-nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('donation');
                            }}
                        >
                            Faire un Don
                        </a>
                        <a 
                            href="#contact" 
                            className="mobile-nav-link"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('contact');
                            }}
                        >
                            Contact
                        </a>
                        <div className="px-3 py-2 mt-4">
                            <button 
                                className="btn-primary w-full"
                                onClick={() => handleEventsNavigation('prochaine-edition')}
                            >
                                Découvrir l'événement
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;