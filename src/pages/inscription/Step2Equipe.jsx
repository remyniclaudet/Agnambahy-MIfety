import { useState } from "react"
import { FaUsers, FaUser, FaInfoCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa"

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
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          {isActiviteIndividuelle ? "Votre pseudo" : "Nom de l'équipe"}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
        <p className="text-gray-600 text-lg">
          {isActiviteIndividuelle 
            ? "Choisissez un pseudo unique pour vous identifier" 
            : "Donnez un nom à votre équipe"
          }
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Information contextuelle */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 mb-8 card-hover">
          <div className="flex items-start space-x-4">
            <FaInfoCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-primary text-lg mb-2">
                {isActiviteIndividuelle ? "Pseudo individuel" : "Nom d'équipe"}
              </h3>
              <p className="text-gray-700">
                {isActiviteIndividuelle 
                  ? "Ce pseudo vous identifiera lors de la compétition. Choisissez un nom unique et facile à retenir."
                  : "Ce nom représentera votre équipe tout au long de l'événement. Soyez créatif !"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Champ nom d'équipe / pseudo */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 card-hover">
          <label className="block text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FaUsers className="w-6 h-6 mr-4 text-primary" />
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
            className="w-full px-6 py-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-lg font-medium shadow-sm"
            required
            maxLength={50}
          />
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              {isActiviteIndividuelle 
                ? "Minimum 2 caractères, maximum 50 caractères"
                : "Minimum 2 caractères, maximum 50 caractères"
              }
            </p>
            <span className={`text-sm font-medium ${
              equipeNom.length > 50 ? 'text-red-600' : 'text-gray-400'
            }`}>
              {equipeNom.length}/50
            </span>
          </div>
        </div>

        {/* Aperçu activité */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 card-hover">
          <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center">
            <FaUser className="w-5 h-5 mr-3 text-primary" />
            Activité sélectionnée
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-bold text-primary text-xl">{formData.activite_nom}</div>
              <div className="text-gray-600 mt-2">
                {formData.type_activite === "collectif" ? "Activité collective" : "Activité individuelle"}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 capitalize">
                {formData.sexe}
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                {formData.categorie_age}
              </span>
              {formData.min_joueurs && formData.max_joueurs && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                  {formData.min_joueurs}-{formData.max_joueurs} joueurs
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Exemples de noms */}
        {!isActiviteIndividuelle && (
          <div className="mt-8">
            <h4 className="text-base font-semibold text-gray-700 mb-4">Quelques idées de noms :</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="text-sm text-gray-600 bg-gray-100 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-200 transition-all duration-200 card-hover"
                  onClick={() => setEquipeNom(exemple)}
                >
                  {exemple}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
        <button 
          onClick={prevStep}
          className="btn-secondary btn-fill text-base px-10 py-3 text-lg transform hover:scale-105 transition-all duration-300"
        >
          <span>Retour</span>
        </button>
        <button 
          onClick={handleNext}
          disabled={!equipeNom.trim() || equipeNom.trim().length < 2}
          className="btn-primary btn-fill text-base px-6 py-3 text-lg transform hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
        >
          <span>Continuer</span>
        </button>
      </div>
    </div>
  )
}