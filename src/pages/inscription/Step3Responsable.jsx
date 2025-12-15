import { useState } from "react"
import { FaUser, FaEnvelope, FaPhone, FaInfoCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa"

export default function Step3Responsable({ formData, updateFormData, nextStep, prevStep }) {
  const [responsable, setResponsable] = useState({
    first_name: formData.responsable_first_name || "",
    last_name: formData.responsable_last_name || "",
    email: formData.responsable_email || "",
    phone: formData.responsable_phone || ""
  })

  const handleChange = (field, value) => {
    setResponsable({ ...responsable, [field]: value })
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleNext = () => {
    if (!responsable.first_name || !responsable.last_name || !responsable.email || !responsable.phone) {
      alert("Veuillez remplir tous les champs")
      return
    }
    if (!isValidEmail(responsable.email)) {
      alert("Email invalide")
      return
    }

    updateFormData({
      responsable_first_name: responsable.first_name,
      responsable_last_name: responsable.last_name,
      responsable_email: responsable.email,
      responsable_phone: responsable.phone
    })
    nextStep()
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          Responsable de l'équipe
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
        <p className="text-gray-600 text-lg">Renseignez les informations du responsable</p>
      </div>

      {/* Information contextuelle */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 mb-8 card-hover">
        <div className="flex items-start space-x-4">
          <FaInfoCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary text-lg mb-2">Informations du responsable</h3>
            <p className="text-gray-700">
              Ces informations nous permettront de vous contacter pour la confirmation de l'inscription 
              et les communications importantes concernant l'événement.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6 card-hover">
        {/* Prénom et Nom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FaUser className="w-5 h-5 mr-2 text-primary" />
              Prénom *
            </label>
            <input 
              type="text" 
              value={responsable.first_name} 
              onChange={(e) => handleChange("first_name", e.target.value)}
              placeholder="Votre prénom"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-lg font-medium shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FaUser className="w-5 h-5 mr-2 text-primary" />
              Nom *
            </label>
            <input 
              type="text" 
              value={responsable.last_name} 
              onChange={(e) => handleChange("last_name", e.target.value)}
              placeholder="Votre nom"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-lg font-medium shadow-sm"
              required
            />
          </div>
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <FaPhone className="w-5 h-5 mr-2 text-secondary" />
            Téléphone *
          </label>
          <input 
            type="tel" 
            value={responsable.phone} 
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+261 34 12 345 67"
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 text-lg font-medium shadow-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <FaEnvelope className="w-5 h-5 mr-2 text-secondary" />
            Email *
          </label>
          <input 
            type="email" 
            value={responsable.email} 
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="votre@email.com"
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 text-lg font-medium shadow-sm"
            required
          />
        </div>
      </div>

      {/* Aperçu activité et équipe */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 mt-8 card-hover">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Récapitulatif</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-primary font-semibold mb-2">Activité</h4>
            <p className="text-gray-700">{formData.activite_nom}</p>
          </div>
          <div>
            <h4 className="text-secondary font-semibold mb-2">Équipe</h4>
            <p className="text-gray-700">{formData.equipe_nom}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
        <button 
          onClick={prevStep}
          className="btn-secondary btn-fill text-base px-10 py-3 text-lg transform hover:scale-105 transition-all duration-300">
          <span>Retour</span>
        </button>
        <button 
          onClick={handleNext}
         className="btn-primary btn-fill text-base px-6 py-3 text-lg transform hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
        >

          <span>Continuer</span>
        </button>
      </div>
    </div>
  )
}