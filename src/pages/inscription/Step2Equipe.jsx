import { useState } from "react"
import { FaUsers, FaUser, FaInfoCircle } from "react-icons/fa"

export default function Step2Equipe({ formData, updateFormData, nextStep, prevStep }) {
  const [equipeNom, setEquipeNom] = useState(formData.equipe_nom || "")

  const handleNext = () => {
    if (!equipeNom.trim()) {
      alert("Veuillez saisir un nom d'équipe ou un pseudo")
      return
    }

    if (equipeNom.trim().length < 2) {
      alert("Le nom d'équipe doit contenir au moins 2 caractères")
      return
    }

    updateFormData({ 
      equipe_nom: equipeNom.trim()
    })
    nextStep()
  }

  const isActiviteIndividuelle = formData.type_activite === "individuel"

  return (
    <div className="p-6 lg:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {isActiviteIndividuelle ? "Votre pseudo" : "Nom de l'équipe"}
        </h2>
        <p className="text-gray-600">
          {isActiviteIndividuelle 
            ? "Choisissez un pseudo unique pour vous identifier" 
            : "Donnez un nom à votre équipe"
          }
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Information contextuelle */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                {isActiviteIndividuelle ? "Pseudo individuel" : "Nom d'équipe"}
              </h3>
              <p className="text-blue-800 text-sm">
                {isActiviteIndividuelle 
                  ? "Ce pseudo vous identifiera lors de la compétition. Choisissez un nom unique et facile à retenir."
                  : "Ce nom représentera votre équipe tout au long de l'événement. Soyez créatif !"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Champ nom d'équipe / pseudo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaUsers className="w-5 h-5 mr-3 text-primary" />
            {isActiviteIndividuelle ? "Votre pseudo *" : "Nom de l'équipe *"}
          </label>
          
          <input
            type="text"
            value={equipeNom}
            onChange={(e) => setEquipeNom(e.target.value)}
            placeholder={
              isActiviteIndividuelle 
                ? "Ex: SuperJoueur, Champion2024, ProPlayer..."
                : "Ex: Les Aigles de Farafangana, Team Victory, Les Invincibles..."
            }
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-lg font-medium"
            required
            maxLength={50}
          />
          
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-500">
              {isActiviteIndividuelle 
                ? "Minimum 2 caractères, maximum 50 caractères"
                : "Minimum 2 caractères, maximum 50 caractères"
              }
            </p>
            <span className={`text-sm ${
              equipeNom.length > 50 ? 'text-red-600' : 'text-gray-400'
            }`}>
              {equipeNom.length}/50
            </span>
          </div>
        </div>

        {/* Aperçu activité */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <FaUser className="w-4 h-4 mr-2 text-primary" />
            Activité sélectionnée
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="font-bold text-primary text-lg">{formData.activite_nom}</div>
              <div className="text-sm text-gray-600 mt-1">
                {formData.type_activite === "collectif" ? "Activité collective" : "Activité individuelle"}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                {formData.sexe}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {formData.categorie_age}
              </span>
              {formData.min_joueurs && formData.max_joueurs && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {formData.min_joueurs}-{formData.max_joueurs} joueurs
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Exemples de noms */}
        {!isActiviteIndividuelle && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quelques idées de noms :</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Les Faucons de Farafangana",
                "Team Victory",
                "Les Invincibles", 
                "Dream Team",
                "Elite Squad",
                "Champions Zone"
              ].map((exemple, index) => (
                <div 
                  key={index}
                  className="text-xs text-gray-600 bg-gray-100 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => setEquipeNom(exemple)}
                >
                  {exemple}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
        <button 
          onClick={prevStep}
          className="btn-secondary px-8 py-3 text-lg font-semibold flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour</span>
        </button>
        <button 
          onClick={handleNext}
          disabled={!equipeNom.trim() || equipeNom.trim().length < 2}
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