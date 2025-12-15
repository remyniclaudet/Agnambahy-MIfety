import { useState, useEffect, useRef } from "react"
import { FaUsers, FaUser, FaInfoCircle, FaArrowRight, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from "react-icons/fa"

export default function Step2Equipe({ formData, updateFormData, nextStep, prevStep, isMobile }) {
  const [equipeNom, setEquipeNom] = useState(formData.equipe_nom || "")
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)
  const inputRef = useRef(null)

  // Focus automatique sur le champ
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [])

  // Validation en temps réel
  useEffect(() => {
    const trimmedNom = equipeNom.trim()
    
    if (trimmedNom.length === 0) {
      setError("")
      setIsValid(false)
    } else if (trimmedNom.length < 2) {
      setError("Minimum 2 caractères")
      setIsValid(false)
    } else if (trimmedNom.length > 50) {
      setError("Maximum 50 caractères")
      setIsValid(false)
    } else {
      setError("")
      setIsValid(true)
    }
  }, [equipeNom])

  const handleNext = () => {
    if (!isValid) {
      // Animation shake
      inputRef.current?.classList.add('animate-shake')
      setTimeout(() => inputRef.current?.classList.remove('animate-shake'), 500)
      return
    }

    updateFormData({ 
      equipe_nom: equipeNom.trim()
    })
    nextStep()
  }

  const isActiviteIndividuelle = formData.type_activite === "individuel"

  const suggestions = isActiviteIndividuelle 
    ? ["SuperJoueur", "Champion2024", "ProPlayer", "MaitreJeu", "ElitePlayer"]
    : ["Les Faucons de Farafangana", "Team Victory", "Les Invincibles", "Dream Team", "Elite Squad"]

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          {isActiviteIndividuelle ? "Votre pseudo" : "Nom de l'équipe"}
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-3 sm:mb-4 animate-line-grow"></div>
        <p className="text-gray-600 text-sm sm:text-lg px-2">
          {isActiviteIndividuelle 
            ? "Choisissez un pseudo unique pour vous identifier" 
            : "Donnez un nom à votre équipe"
          }
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Champ nom d'équipe / pseudo */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 transition-all duration-300 hover:shadow-sm">
          <label className="block text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <FaUsers className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-primary" />
            {isActiviteIndividuelle ? "Votre pseudo" : "Nom de l'équipe"} *
            <span className="ml-2 text-xs text-gray-500 font-normal">(obligatoire)</span>
          </label>
          
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={equipeNom}
              onChange={(e) => setEquipeNom(e.target.value)}
              placeholder={
                isActiviteIndividuelle 
                  ? "Ex: SuperJoueur, Champion2024..."
                  : "Ex: Les Faucons de Farafangana, Team Victory..."
              }
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-300 text-base sm:text-lg font-medium shadow-sm ${
                error 
                  ? "border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400" 
                  : isValid 
                  ? "border-green-300 focus:ring-2 focus:ring-green-200 focus:border-green-400"
                  : "border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
              }`}
              required
              maxLength={50}
              aria-invalid={!!error}
              aria-describedby="error-message"
            />
            
            {/* Indicateur de validation */}
            {equipeNom.length > 0 && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isValid ? (
                  <FaCheckCircle className="w-5 h-5 text-green-500 animate-check-in" />
                ) : (
                  <FaExclamationCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          
          {/* Messages d'aide et d'erreur */}
          <div className="mt-3">
            {error ? (
              <p id="error-message" className="text-red-600 text-sm font-medium flex items-center animate-slide-down">
                <FaExclamationCircle className="w-3 h-3 mr-2" />
                {error}
              </p>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Minimum 2 caractères, maximum 50 caractères
                </p>
                <span className={`text-sm font-medium ${
                  equipeNom.length > 45 ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {equipeNom.length}/50
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-gray-700 mb-3">Suggestions :</h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((exemple, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setEquipeNom(exemple)}
                className="text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-sm transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {exemple}
              </button>
            ))}
          </div>
        </div>

        {/* Récapitulatif activité */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
            <FaUser className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary" />
            Récapitulatif activité
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-primary text-base sm:text-xl">{formData.activite_nom}</div>
              <div className="text-gray-600 text-sm sm:text-base mt-1">
                {formData.type_activite === "collectif" ? "Activité collective" : "Activité individuelle"}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 capitalize">
                {formData.sexe}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                {formData.categorie_age}
              </span>
              {formData.min_joueurs && formData.max_joueurs && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  {formData.min_joueurs}-{formData.max_joueurs} joueurs
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Boutons de navigation - Adaptés mobile */}
      <div className={`flex ${isMobile ? 'flex-col-reverse gap-3' : 'justify-between'} pt-6 sm:pt-8 border-t border-gray-100 mt-6 sm:mt-8`}>
        <button 
          onClick={prevStep}
          className={`btn-secondary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group ${
            isMobile ? 'w-full' : ''
          }`}
        >
          <FaArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Retour</span>
        </button>
        
        <button 
          onClick={handleNext}
          disabled={!isValid}
          className={`btn-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group relative overflow-hidden ${
            isMobile ? 'w-full' : ''
          }`}
        >
          <span className="relative z-10">Continuer</span>
          <FaArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  )
}