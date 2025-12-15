import { useState, useEffect } from "react"
import { FaUser, FaEnvelope, FaPhone, FaInfoCircle, FaArrowRight, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from "react-icons/fa"

export default function Step3Responsable({ formData, updateFormData, nextStep, prevStep, isMobile }) {
  const [responsable, setResponsable] = useState({
    first_name: formData.responsable_first_name || "",
    last_name: formData.responsable_last_name || "",
    email: formData.responsable_email || "",
    phone: formData.responsable_phone || ""
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {}
    
    // Validation prénom
    if (touched.first_name && !responsable.first_name.trim()) {
      newErrors.first_name = "Le prénom est obligatoire"
    } else if (responsable.first_name.length > 0 && responsable.first_name.length < 2) {
      newErrors.first_name = "Minimum 2 caractères"
    }
    
    // Validation nom
    if (touched.last_name && !responsable.last_name.trim()) {
      newErrors.last_name = "Le nom est obligatoire"
    } else if (responsable.last_name.length > 0 && responsable.last_name.length < 2) {
      newErrors.last_name = "Minimum 2 caractères"
    }
    
    // Validation email
    if (touched.email) {
      if (!responsable.email.trim()) {
        newErrors.email = "L'email est obligatoire"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(responsable.email)) {
        newErrors.email = "Format d'email invalide"
      }
    }
    
    // Validation téléphone
    if (touched.phone) {
      if (!responsable.phone.trim()) {
        newErrors.phone = "Le téléphone est obligatoire"
      } else if (!/^[\d\s\+\(\)\.-]{8,}$/.test(responsable.phone)) {
        newErrors.phone = "Numéro invalide"
      }
    }
    
    setErrors(newErrors)
  }, [responsable, touched])

  const handleChange = (field, value) => {
    setResponsable({ ...responsable, [field]: value })
    if (!touched[field]) {
      setTouched({ ...touched, [field]: true })
    }
  }

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
  }

  const handleNext = () => {
    // Marquer tous les champs comme touchés
    const allTouched = Object.keys(responsable).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    // Vérifier les erreurs
    const newErrors = {}
    if (!responsable.first_name.trim()) newErrors.first_name = "Le prénom est obligatoire"
    if (!responsable.last_name.trim()) newErrors.last_name = "Le nom est obligatoire"
    if (!responsable.email.trim()) newErrors.email = "L'email est obligatoire"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(responsable.email)) newErrors.email = "Format d'email invalide"
    if (!responsable.phone.trim()) newErrors.phone = "Le téléphone est obligatoire"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Animation sur le premier champ en erreur
      const firstErrorField = Object.keys(newErrors)[0]
      const input = document.querySelector(`[name="${firstErrorField}"]`)
      input?.classList.add('animate-shake')
      input?.focus()
      setTimeout(() => input?.classList.remove('animate-shake'), 500)
      return
    }

    updateFormData({
      responsable_first_name: responsable.first_name.trim(),
      responsable_last_name: responsable.last_name.trim(),
      responsable_email: responsable.email.trim(),
      responsable_phone: responsable.phone.trim()
    })
    nextStep()
  }

  const isFieldValid = (field) => {
    return touched[field] && responsable[field].length > 0 && !errors[field]
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          Informations du responsable
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-3 sm:mb-4 animate-line-grow"></div>
        <p className="text-gray-600 text-sm sm:text-lg px-2">Renseignez les informations du responsable</p>
      </div>

      {/* Information contextuelle */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 card-hover">
        <div className="flex items-start">
          <FaInfoCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary text-base sm:text-lg mb-2">Contact principal</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Ces informations nous permettront de vous contacter pour la confirmation et les communications importantes.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        {/* Prénom et Nom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
              <FaUser className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
              Prénom *
            </label>
            <div className="relative">
              <input 
                name="first_name"
                type="text" 
                value={responsable.first_name} 
                onChange={(e) => handleChange("first_name", e.target.value)}
                onBlur={() => handleBlur("first_name")}
                placeholder="Votre prénom"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-base font-medium shadow-sm ${
                  errors.first_name 
                    ? "border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400" 
                    : isFieldValid("first_name")
                    ? "border-green-300 focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    : "border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                }`}
                required
                aria-invalid={!!errors.first_name}
                aria-describedby="first-name-error"
              />
              {isFieldValid("first_name") && (
                <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.first_name && (
              <p id="first-name-error" className="text-red-600 text-sm mt-2 flex items-center animate-slide-down">
                <FaExclamationCircle className="w-3 h-3 mr-2" />
                {errors.first_name}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
              <FaUser className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
              Nom *
            </label>
            <div className="relative">
              <input 
                name="last_name"
                type="text" 
                value={responsable.last_name} 
                onChange={(e) => handleChange("last_name", e.target.value)}
                onBlur={() => handleBlur("last_name")}
                placeholder="Votre nom"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-base font-medium shadow-sm ${
                  errors.last_name 
                    ? "border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400" 
                    : isFieldValid("last_name")
                    ? "border-green-300 focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    : "border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                }`}
                required
                aria-invalid={!!errors.last_name}
                aria-describedby="last-name-error"
              />
              {isFieldValid("last_name") && (
                <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.last_name && (
              <p id="last-name-error" className="text-red-600 text-sm mt-2 flex items-center animate-slide-down">
                <FaExclamationCircle className="w-3 h-3 mr-2" />
                {errors.last_name}
              </p>
            )}
          </div>
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
            <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-secondary" />
            Téléphone *
          </label>
          <div className="relative">
            <input 
              name="phone"
              type="tel" 
              value={responsable.phone} 
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              placeholder="+261 34 12 345 67"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-base font-medium shadow-sm ${
                errors.phone 
                  ? "border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400" 
                  : isFieldValid("phone")
                  ? "border-green-300 focus:ring-2 focus:ring-green-200 focus:border-green-400"
                  : "border-gray-300 focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
              }`}
              required
              aria-invalid={!!errors.phone}
              aria-describedby="phone-error"
            />
            {isFieldValid("phone") && (
              <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>
          {errors.phone && (
            <p id="phone-error" className="text-red-600 text-sm mt-2 flex items-center animate-slide-down">
              <FaExclamationCircle className="w-3 h-3 mr-2" />
              {errors.phone}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">Format international recommandé</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
            <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-secondary" />
            Email *
          </label>
          <div className="relative">
            <input 
              name="email"
              type="email" 
              value={responsable.email} 
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="votre@email.com"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-base font-medium shadow-sm ${
                errors.email 
                  ? "border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400" 
                  : isFieldValid("email")
                  ? "border-green-300 focus:ring-2 focus:ring-green-200 focus:border-green-400"
                  : "border-gray-300 focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
              }`}
              required
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {isFieldValid("email") && (
              <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>
          {errors.email && (
            <p id="email-error" className="text-red-600 text-sm mt-2 flex items-center animate-slide-down">
              <FaExclamationCircle className="w-3 h-3 mr-2" />
              {errors.email}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">Vous recevrez une confirmation par email</p>
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 mt-6">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4">Récapitulatif</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-primary font-semibold text-sm mb-2">Activité</h4>
            <p className="text-gray-700 text-base font-medium">{formData.activite_nom}</p>
            <p className="text-gray-600 text-sm mt-1">
              {formData.type_activite === "collectif" ? "Collective" : "Individuelle"} • {formData.categorie_age}
            </p>
          </div>
          <div>
            <h4 className="text-secondary font-semibold text-sm mb-2">Équipe / Pseudo</h4>
            <p className="text-gray-700 text-base font-medium">{formData.equipe_nom}</p>
          </div>
        </div>
      </div>

      {/* Boutons de navigation */}
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
          className={`btn-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group relative overflow-hidden ${
            isMobile ? 'w-full' : ''
          }`}
        >
          <span className="relative z-10">Vérifier l'inscription</span>
          <FaArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  )
}