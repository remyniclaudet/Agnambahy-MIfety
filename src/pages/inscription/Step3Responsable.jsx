import { useState } from "react"
import { FaUser, FaEnvelope, FaPhone, FaInfoCircle } from "react-icons/fa"

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
    <div className="p-6 lg:p-8 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Responsable de l'équipe
        </h2>
        <p className="text-gray-600">Renseignez les informations du responsable</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
          <input type="text" value={responsable.first_name} onChange={(e) => handleChange("first_name", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
          <input type="text" value={responsable.last_name} onChange={(e) => handleChange("last_name", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
          <input type="tel" value={responsable.phone} onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" value={responsable.email} onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"/>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
        <button onClick={prevStep} className="btn-secondary px-8 py-3 text-lg font-semibold">Retour</button>
        <button onClick={handleNext} className="btn-primary px-8 py-3 text-lg font-semibold">Continuer</button>
      </div>
    </div>
  )
}
