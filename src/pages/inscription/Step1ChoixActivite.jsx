import { useState, useEffect } from "react"
import { FaUsers, FaUser, FaVenusMars, FaCalendarAlt, FaInfoCircle, FaArrowRight, FaSearch, FaSpinner } from "react-icons/fa"

export default function Step1ChoixActivite({ formData, updateFormData, nextStep, activites, loading }) {
  const [selectedActivite, setSelectedActivite] = useState(formData.activite_id || null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredActivites, setFilteredActivites] = useState(activites)
  const [validationError, setValidationError] = useState("")

  // Filtrage en temps réel
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredActivites(activites)
    } else {
      const filtered = activites.filter(activite =>
        activite.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activite.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activite.sexe.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activite.categorie_age.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredActivites(filtered)
    }
  }, [searchTerm, activites])

  const handleNext = () => {
    if (!selectedActivite) {
      setValidationError("Veuillez sélectionner une activité")
      
      // Animation shake
      const container = document.querySelector('.activites-container')
      container?.classList.add('animate-shake')
      setTimeout(() => container?.classList.remove('animate-shake'), 500)
      
      return
    }

    const activite = activites.find(a => a.id === selectedActivite)
    if (!activite) return

    updateFormData({ 
      activite_id: activite.id,
      activite_nom: activite.nom,
      sexe: activite.sexe, 
      categorie_age: activite.categorie_age,
      type_activite: activite.type,
      min_joueurs: activite.min_joueurs,
      max_joueurs: activite.max_joueurs
    })
    nextStep()
  }

  const getTypeIcon = (type) => type === "collectif" 
    ? <FaUsers className="w-4 h-4 text-blue-500" /> 
    : <FaUser className="w-4 h-4 text-green-500" />

  const getSexeColor = (sexe) => {
    switch (sexe) {
      case "masculin": return "bg-blue-50 text-blue-700 border-blue-200"
      case "feminin": return "bg-pink-50 text-pink-700 border-pink-200"
      default: return "bg-purple-50 text-purple-700 border-purple-200"
    }
  }

  const getTypeColor = (type) => type === "collectif" 
    ? "bg-blue-50 text-blue-700 border-blue-200" 
    : "bg-green-50 text-green-700 border-green-200"

  if (loading) {
    return (
      <div className="p-8 sm:p-12 text-center animate-fade-in">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Chargement des activités</h3>
        <p className="text-gray-600 text-sm sm:text-base">Veuillez patienter quelques secondes...</p>
      </div>
    )
  }

  const activiteSelectionnee = activites.find(a => a.id === selectedActivite)

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Titre */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          Choisissez votre <span className="text-primary">activité</span>
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-3 sm:mb-4 animate-line-grow"></div>
        <p className="text-gray-600 text-sm sm:text-lg px-2">Sélectionnez l'activité à laquelle vous souhaitez participer</p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Rechercher une activité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 text-sm sm:text-base"
            aria-label="Rechercher une activité"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {filteredActivites.length} activité{filteredActivites.length > 1 ? 's' : ''} trouvée{filteredActivites.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Liste des activités */}
      <div className="activites-container">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary" />
            Activités disponibles
          </h3>

          {filteredActivites.length === 0 ? (
            <div className="text-center py-10 sm:py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-300">
              <FaUsers className="w-12 h-12 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h4 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2">Aucune activité trouvée</h4>
              <p className="text-gray-600 text-sm sm:text-lg">Essayez avec d'autres mots-clés</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4 md:gap-6">
              {filteredActivites.map((activite) => (
                <div
                  key={activite.id}
                  className={`border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
                    selectedActivite === activite.id
                      ? "border-primary bg-gradient-to-r from-primary/5 to-secondary/5 shadow-md transform scale-[1.02]"
                      : "border-gray-200 hover:border-primary/30 hover:bg-gray-50/50 hover:shadow-sm"
                  }`}
                  onClick={() => {
                    setSelectedActivite(activite.id)
                    setValidationError("")
                  }}
                  role="button"
                  aria-pressed={selectedActivite === activite.id}
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && setSelectedActivite(activite.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                        <h3 className="font-bold text-gray-900 text-base sm:text-xl mb-2 sm:mb-0">
                          {activite.nom}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${getTypeColor(activite.type)} self-start sm:self-auto`}>
                          {getTypeIcon(activite.type)}
                          <span className="ml-1 sm:ml-2 capitalize">{activite.type}</span>
                        </span>
                      </div>

                      {activite.description && (
                        <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base line-clamp-2">
                          {activite.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 sm:gap-4">
                        <div className="flex items-center space-x-2">
                          <FaVenusMars className="w-4 h-4 text-gray-400" />
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize ${getSexeColor(activite.sexe)}`}>
                            {activite.sexe}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                            {activite.categorie_age}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaUsers className="w-4 h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">
                            {activite.min_joueurs && activite.max_joueurs 
                              ? `${activite.min_joueurs}-${activite.max_joueurs} joueurs`
                              : "Nombre libre"
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`ml-4 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-300 ${
                      selectedActivite === activite.id
                        ? "bg-gradient-to-r from-primary to-secondary border-transparent shadow-inner"
                        : "border-gray-300"
                    }`}>
                      {selectedActivite === activite.id && (
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message d'erreur */}
        {validationError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-slide-down">
            <p className="text-red-600 text-sm font-medium flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {validationError}
            </p>
          </div>
        )}

        {/* Aperçu sélection */}
        {activiteSelectionnee && (
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8 animate-slide-up">
            <div className="flex items-start">
              <FaInfoCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h4 className="font-semibold text-primary text-base sm:text-lg">Activité sélectionnée</h4>
                  <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
                    Cliquez sur "Continuer" pour valider
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="font-bold text-gray-900 text-base sm:text-xl">{activiteSelectionnee.nom}</h5>
                    <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-1">
                      {activiteSelectionnee.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 capitalize">
                      {activiteSelectionnee.sexe}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                      {activiteSelectionnee.categorie_age}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bouton continuer */}
      <div className="flex justify-end pt-6 border-t border-gray-100">
        <button 
          onClick={handleNext}
          disabled={!selectedActivite}
          className="btn-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 group relative overflow-hidden"
        >
          <span className="relative z-10">Continuer</span>
          <FaArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  )
}