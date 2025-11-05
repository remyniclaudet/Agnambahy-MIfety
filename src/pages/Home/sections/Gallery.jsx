import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importe tes images - tu devras créer ces dossiers dans assets
import gallery1 from '../../../assets/gallery/photo1.jpg';
import gallery2 from '../../../assets/gallery/photo2.jpg';
import gallery3 from '../../../assets/gallery/photo3.jpg';
import gallery4 from '../../../assets/gallery/photo4.jpg';
import gallery5 from '../../../assets/gallery/photo5.jpg';
import gallery6 from '../../../assets/gallery/photo6.jpg';

// Images pour médias
import newsmada from '../../../assets/medias/newsmada.jpg';
import allafrica from '../../../assets/medias/allafrica.jpg';
import localPress from '../../../assets/medias/local-press.jpg';

const Gallery = () => {
    const [activeTab, setActiveTab] = useState('photos');
    const [selectedMedia, setSelectedMedia] = useState(null);

    // Données des photos
    const photos = [
        { id: 1, src: gallery1, category: 'matchs', title: 'Finale Basketball' },
        { id: 2, src: gallery2, category: 'concerts', title: 'Concert Live' },
        { id: 3, src: gallery3, category: 'ambiance', title: 'Ambiance Générale' },
        { id: 4, src: gallery4, category: 'ceremonies', title: 'Cérémonie Ouverture' },
        { id: 5, src: gallery5, category: 'matchs', title: 'Beach Volley' },
        { id: 6, src: gallery6, category: 'concerts', title: 'Spectacle Culturel' },
    ];

    // Données des vidéos
    const videos = [
        { 
            id: 1, 
            title: 'Aftermovie Édition 2024', 
            description: 'Revivez les meilleurs moments de la dernière édition',
            duration: '2:45',
            thumbnail: gallery1
        },
        { 
            id: 2, 
            title: 'Finale Basketball 3x3', 
            description: 'Les moments forts de la grande finale',
            duration: '1:30',
            thumbnail: gallery2
        },
        { 
            id: 3, 
            title: 'Freestyle Competition', 
            description: 'Les meilleurs passages du concours de freestyle',
            duration: '3:15',
            thumbnail: gallery3
        },
        { 
            id: 4, 
            title: 'Cérémonie de Clôture', 
            description: 'Remise des prix et spectacle final',
            duration: '4:20',
            thumbnail: gallery4
        },
    ];

    // Données des médias
    const medias = [
        {
            id: 1,
            logo: newsmada,
            source: 'Newsmada',
            date: '15 Janvier 2024',
            title: 'Agnambahy Mifety : Un succès grandissant à Farafangana',
            excerpt: 'La troisième édition du festival sportif et culturel a rassemblé plus de 500 participants...',
            link: '#'
        },
        {
            id: 2,
            logo: allafrica,
            source: 'AllAfrica',
            date: '20 Décembre 2023',
            title: 'Farafangana vibre au rythme du sport et de la culture',
            excerpt: 'Le festival Agnambahy Mifety devient un événement incontournable dans la région...',
            link: '#'
        },
        {
            id: 3,
            logo: localPress,
            source: 'La Voix du Sud',
            date: '28 Décembre 2023',
            title: 'Jeunesse et solidarité au cœur d\'Agnambahy Mifety',
            excerpt: 'Porteur de valeurs fortes, l\'événement continue de rassembler les jeunes autour...',
            link: '#'
        }
    ];

    const categories = ['tous', 'matchs', 'concerts', 'ambiance', 'ceremonies'];
    const [activeCategory, setActiveCategory] = useState('tous');

    const filteredPhotos = activeCategory === 'tous' 
        ? photos 
        : photos.filter(photo => photo.category === activeCategory);

    const openLightbox = (media) => {
        setSelectedMedia(media);
    };

    const closeLightbox = () => {
        setSelectedMedia(null);
    };

    return (
        <section id="gallery" className="relative py-20 bg-white overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête de section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Gal<span className="text-secondary">erie</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Découvrez l'ambiance unique d'Agnambahy Mifety à travers nos photos, vidéos et retours médias
                    </p>
                </div>

                {/* Navigation par onglets */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('photos')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === 'photos'
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                        }`}
                    >
                        📸 Photos
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === 'videos'
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                        }`}
                    >
                        🎥 Vidéos
                    </button>
                    <button
                        onClick={() => setActiveTab('medias')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === 'medias'
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                        }`}
                    >
                        📰 Médias
                    </button>
                </div>

                {/* Contenu des onglets */}
                <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
                    {/* Section Photos */}
                    {activeTab === 'photos' && (
                        <div className="space-y-8">
                            {/* Filtres par catégorie */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 rounded-full capitalize transition-all duration-200 ${
                                            activeCategory === category
                                                ? 'bg-primary text-white'
                                                : 'bg-white text-gray-700 hover:bg-primary/10'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Grille de photos */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredPhotos.map(photo => (
                                    <div 
                                        key={photo.id}
                                        className="group relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                                        onClick={() => openLightbox(photo)}
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={photo.src}
                                                alt={photo.title}
                                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                <div className="p-4 text-white">
                                                    <h4 className="font-semibold">{photo.title}</h4>
                                                    <span className="text-sm opacity-90 capitalize">{photo.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Section Vidéos */}
                    {activeTab === 'videos' && (
                        <div className="space-y-8">
                            {/* Carousel des vidéos principales */}
                            <div className="bg-white rounded-xl p-6">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    autoplay={{ delay: 5000 }}
                                    className="rounded-lg"
                                >
                                    {videos.slice(0, 2).map(video => (
                                        <SwiperSlide key={video.id}>
                                            <div className="relative bg-black rounded-lg overflow-hidden">
                                                <img
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="w-full h-96 object-cover opacity-60"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center text-white">
                                                        <button className="w-20 h-20 bg-primary/80 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                                                            <span className="text-2xl">▶</span>
                                                        </button>
                                                        <h3 className="text-2xl font-bold mt-4">{video.title}</h3>
                                                        <p className="text-lg mt-2">{video.duration}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Liste des autres vidéos */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {videos.map(video => (
                                    <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                                        <div className="relative">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                                <button className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                                                    <span className="text-lg">▶</span>
                                                </button>
                                            </div>
                                            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                                {video.duration}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-semibold text-gray-900 mb-2">{video.title}</h4>
                                            <p className="text-gray-600 text-sm">{video.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Section Médias */}
                    {activeTab === 'medias' && (
                        <div className="space-y-8">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Ils parlent de <span className="text-primary">nous</span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {medias.map(media => (
                                    <div key={media.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        <div className="p-6 border-b border-gray-100">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={media.logo}
                                                    alt={media.source}
                                                    className="h-12 w-auto object-contain"
                                                />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{media.source}</h4>
                                                    <p className="text-sm text-gray-500">{media.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h5 className="font-bold text-lg text-gray-900 mb-3">{media.title}</h5>
                                            <p className="text-gray-600 mb-4 leading-relaxed">{media.excerpt}</p>
                                            <a 
                                                href={media.link} 
                                                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200 flex items-center"
                                            >
                                                Lire l'article
                                                <span className="ml-1">→</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Banner supplémentaire */}
                            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white">
                                <h4 className="text-2xl font-bold mb-4">Suivez notre actualité</h4>
                                <p className="mb-6 opacity-90">
                                    Restez informé des dernières nouvelles et publications
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                                        Voir plus d'articles
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox pour les photos */}
            {selectedMedia && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={closeLightbox}
                            className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors duration-200"
                        >
                            ✕
                        </button>
                        <img
                            src={selectedMedia.src}
                            alt={selectedMedia.title}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        <div className="text-white text-center mt-4">
                            <h3 className="text-xl font-semibold">{selectedMedia.title}</h3>
                            <p className="text-gray-300 capitalize">{selectedMedia.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;