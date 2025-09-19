import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEventsOpen, setIsEventsOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // Détection de la taille d'écran
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileView(window.innerWidth < 1024); // lg breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <nav className="bg-white shadow-md relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                src="/AM.png"
                                alt="Logo"
                                className="h-10 w-auto sm:h-14"
                            />
                        </div>
                    </div>

                    {/* Menu desktop - Centré horizontalement et verticalement */}
                    <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
                        <div className="flex space-x-4 xl:space-x-8">
                            <a href="#" className="nav-link">Accueil</a>
                            <a href="#" className="nav-link">À propos</a>
                            
                            {/* Menu Événements avec sous-menus */}
                            <div className="relative group">
                                <button 
                                    className="nav-link flex items-center focus:outline-none"
                                    onClick={() => setIsEventsOpen(!isEventsOpen)}
                                >
                                    Événements
                                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                
                                {/* Sous-menus Événements */}
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Prochaine édition</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Disciplines</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Archives</a>
                                </div>
                            </div>
                            
                            <a href="#" className="nav-link">Actualités</a>
                            <a href="#" className="nav-link hidden xl:block">Galerie</a>
                            <a href="#" className="nav-link hidden 2xl:block">Sponsors</a>
                        </div>
                    </div>

                    {/* CTA et menu mobile */}
                    <div className="flex items-center">
                        <div className="hidden lg:ml-6 lg:flex lg:items-center">
                            <button className="btn-secondary text-sm xl:text-base">
                                Découvrir l'événement
                            </button>
                        </div>

                        {/* Bouton menu mobile */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
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
                <div className="lg:hidden">
                    <div className="pt-2 pb-3 space-y-1 px-2">
                        <a href="#" className="mobile-nav-link">Accueil</a>
                        <a href="#" className="mobile-nav-link">À propos</a>
                        
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
                                <div className="pl-4 mt-2 space-y-2">
                                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary">Prochaine édition</a>
                                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary">Disciplines</a>
                                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary">Archives</a>
                                </div>
                            )}
                        </div>
                        
                        <a href="#" className="mobile-nav-link">Actualités</a>
                        <a href="#" className="mobile-nav-link">Galerie</a>
                        <a href="#" className="mobile-nav-link">Sponsors</a>
                        <div className="px-3 py-2 mt-4">
                            <button className="btn-secondary w-full">
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