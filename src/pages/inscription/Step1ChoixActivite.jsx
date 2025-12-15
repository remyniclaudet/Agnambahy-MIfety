import { useState } from "react"
import { FaUsers, FaUser, FaVenusMars, FaCalendarAlt, FaInfoCircle, FaArrowRight } from "react-icons/fa"

export default function Step1ChoixActivite({ formData, updateFormData, nextStep, activites, loading }) {
  const [selectedActivite, setSelectedActivite] = useState(formData.activite_id || null)

  const handleNext = () => {
    if (!selectedActivite) {
      alert("Veuillez sélectionner une activité")
      return
    }

    const activite = activites.find(a => a.id === selectedActivite)
    if (!activite) {
      alert("Activité non trouvée")
      return
    }

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
    ? <FaUsers className="text-blue-500" /> 
    : <FaUser className="text-green-500" />

  const getSexeColor = (sexe) => {
    switch (sexe) {
      case "masculin": return "bg-blue-100 text-blue-800 border-blue-200"
      case "feminin": return "bg-pink-100 text-pink-800 border-pink-200"
      default: return "bg-purple-100 text-purple-800 border-purple-200"
    }
  }

  const getTypeColor = (type) => type === "collectif" 
    ? "bg-blue-50 text-blue-700 border-blue-200" 
    : "bg-green-50 text-green-700 border-green-200"

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Chargement des activités</h3>
        <p className="text-gray-600">Veuillez patienter...</p>
      </div>
    )
  }

  const activiteSelectionnee = activites.find(a => a.id === selectedActivite)

  return (
    <div className="p-6 lg:p-8">
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          Choisissez votre <span className="text-gray">activité</span>
        </h2>

        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
        <p className="text-gray-600 text-lg">Sélectionnez l'activité à laquelle vous souhaitez participer</p>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 mb-8 card-hover">
        <div className="flex items-start space-x-4">
          <FaInfoCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary text-lg mb-2">Comment choisir ?</h3>
            <p className="text-gray-700">
              Chaque activité a ses propres caractéristiques (type, sexe, catégorie d'âge). 
              Sélectionnez celle qui correspond à votre profil. Les informations détaillées s'affichent ci-dessous.
            </p>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FaUsers className="w-5 h-5 mr-3 text-primary" />
            Activités disponibles ({activites.length})
          </h3>

          {activites.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300 card-hover">
              <FaUsers className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">Aucune activité disponible</h4>
              <p className="text-gray-600 text-lg">Les inscriptions pourront bientôt commencer</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {activites.map((activite) => (
                <div
                  key={activite.id}
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 card-hover ${
                    selectedActivite === activite.id
                      ? "border-primary bg-primary/5 shadow-lg scale-105"
                      : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedActivite(activite.id)}
                  role="button"
                  aria-pressed={selectedActivite === activite.id}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 text-xl">{activite.nom}</h3>
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getTypeColor(activite.type)}`}>
                          {getTypeIcon(activite.type)}
                          <span className="ml-2 capitalize">{activite.type}</span>
                        </span>
                      </div>

                      {activite.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed text-base">{activite.description}</p>
                      )}

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-3">
                          <FaVenusMars className="w-5 h-5 text-gray-400" />
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border capitalize ${getSexeColor(activite.sexe)}`}>
                            {activite.sexe}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaCalendarAlt className="w-5 h-5 text-gray-400" />
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                            {activite.categorie_age}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaUsers className="w-5 h-5 text-gray-400" />
                          <span className="text-base text-gray-700 font-medium">
                            {activite.min_joueurs && activite.max_joueurs 
                              ? `${activite.min_joueurs} - ${activite.max_joueurs} joueurs`
                              : "Nombre libre"
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`ml-6 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      selectedActivite === activite.id
                        ? "bg-primary border-primary shadow-inner"
                        : "border-gray-300"
                    }`}>
                      {selectedActivite === activite.id && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Aperçu sélection */}
        {activiteSelectionnee && (
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6 mb-8 card-hover">
            <h4 className="font-semibold text-primary text-lg mb-4 flex items-center">
              <FaInfoCircle className="w-5 h-5 mr-2" />
              Activité sélectionnée
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-bold text-gray-900 text-xl">{activiteSelectionnee.nom}</h5>
                <p className="text-gray-600 text-base mt-2">{activiteSelectionnee.description}</p>
              </div>
              <div className="text-right">
                <div className="text-base text-gray-700 font-medium">
                  <span className="capitalize">{activiteSelectionnee.sexe}</span>
                  {" • "}
                  <span>{activiteSelectionnee.categorie_age}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {activiteSelectionnee.min_joueurs && activiteSelectionnee.max_joueurs
                    ? `${activiteSelectionnee.min_joueurs}-${activiteSelectionnee.max_joueurs} joueurs`
                    : "Nombre libre"
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bouton continuer */}
      <div className="flex justify-end pt-8 border-t border-gray-200">
        <button 
          onClick={handleNext}
          disabled={!selectedActivite}
          className="btn-primary btn-fill text-base px-6 py-3 text-lg transform hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
        >
          <span>Continuer</span>
        </button>
      </div>
    </div>
  )
}

