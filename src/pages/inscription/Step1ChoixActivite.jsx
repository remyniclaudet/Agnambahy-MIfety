import { useState } from "react"
import { FaUsers, FaUser, FaVenusMars, FaCalendarAlt, FaInfoCircle } from "react-icons/fa"

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
      case "masculin": return "bg-blue-100 text-blue-800"
      case "feminin": return "bg-pink-100 text-pink-800"
      default: return "bg-purple-100 text-purple-800"
    }
  }

  const getTypeColor = (type) => type === "collectif" 
    ? "bg-blue-50 text-blue-700 border-blue-200" 
    : "bg-green-50 text-green-700 border-green-200"

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-gray-600 mt-4">Chargement des activités...</p>
      </div>
    )
  }

  const activiteSelectionnee = activites.find(a => a.id === selectedActivite)

  return (
    <div className="p-6 lg:p-8">
      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Choisissez votre <span className="text-primary">activité</span>
        </h2>
        <p className="text-gray-600">Sélectionnez l'activité à laquelle vous souhaitez participer</p>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <div className="flex items-start space-x-3">
          <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Comment choisir ?</h3>
            <p className="text-blue-800 text-sm">
              Chaque activité a ses propres caractéristiques (type, sexe, catégorie d'âge). 
              Sélectionnez celle qui correspond à votre profil. Les informations détaillées s'affichent ci-dessous.
            </p>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Activités disponibles ({activites.length})
          </h3>

          {activites.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <FaUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Aucune activité disponible</h4>
              <p className="text-gray-600">Les inscriptions pourront bientôt commencer</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {activites.map((activite) => (
                <div
                  key={activite.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                    selectedActivite === activite.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedActivite(activite.id)}
                  role="button"
                  aria-pressed={selectedActivite === activite.id}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-xl">{activite.nom}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(activite.type)}`}>
                          {getTypeIcon(activite.type)}
                          <span className="ml-1 capitalize">{activite.type}</span>
                        </span>
                      </div>

                      {activite.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed">{activite.description}</p>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center space-x-2">
                          <FaVenusMars className="w-4 h-4 text-gray-400" />
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getSexeColor(activite.sexe)}`}>
                            {activite.sexe}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {activite.categorie_age}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaUsers className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 font-medium">
                            {activite.min_joueurs && activite.max_joueurs 
                              ? `${activite.min_joueurs} - ${activite.max_joueurs} joueurs`
                              : "Nombre libre"
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`ml-4 flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                      selectedActivite === activite.id
                        ? "bg-primary border-primary"
                        : "border-gray-300"
                    }`}>
                      {selectedActivite === activite.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
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
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-primary mb-3 flex items-center">
              <FaInfoCircle className="w-4 h-4 mr-2" />
              Activité sélectionnée
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-bold text-gray-900 text-lg">{activiteSelectionnee.nom}</h5>
                <p className="text-gray-600 text-sm mt-1">{activiteSelectionnee.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  <span className="capitalize">{activiteSelectionnee.sexe}</span>
                  {" • "}
                  <span>{activiteSelectionnee.categorie_age}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
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
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button 
          onClick={handleNext}
          disabled={!selectedActivite}
          className="btn-primary px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>Continuer</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
