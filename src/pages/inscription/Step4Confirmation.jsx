import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../utils/firebaseClient"
import { FaCheckCircle, FaArrowLeft, FaInfoCircle, FaClipboardCheck, FaEnvelope, FaPhone, FaUsers, FaUser } from "react-icons/fa"

export default function Step4Confirmation({ formData, prevStep, activites, isMobile }) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await addDoc(collection(db, "equipes"), {
        activite_id: formData.activite_id,
        nom_equipe: formData.equipe_nom,
        responsable_first_name: formData.responsable_first_name,
        responsable_last_name: formData.responsable_last_name,
        responsable_email: formData.responsable_email,
        responsable_phone: formData.responsable_phone,
        statut_inscription: "en_attente",
        created_at: new Date(),
        activite_nom: formData.activite_nom,
        type_activite: formData.type_activite,
        sexe: formData.sexe,
        categorie_age: formData.categorie_age
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
      setShowModal(false)
    }
  }

  const handleConfirmation = () => {
    setShowModal(true)
  }

  if (submitted) {
    return (
      <div className="p-6 sm:p-8 md:p-12 text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaCheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 animate-check-in" />
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Inscription <span className="text-primary">réussie</span> !
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 animate-line-grow"></div>
        <div className="max-w-md mx-auto mb-8">
          <p className="text-gray-600 text-base sm:text-lg mb-4">
            Votre inscription a été enregistrée avec succès.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <FaEnvelope className="w-4 h-4 text-green-500 inline mr-2" />
              Un email de confirmation vous sera envoyé dans les prochaines minutes.
            </p>
          </div>
        </div>
        <button 
          onClick={() => window.location.href = '/'} 
          className="btn-primary px-8 py-3 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-[1.02] transition-all duration-300"
        >
          Retour à l'accueil
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          Confirmation finale
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-3 sm:mb-4 animate-line-grow"></div>
        <p className="text-gray-600 text-sm sm:text-lg px-2">Vérifiez les informations avant validation</p>
      </div>

      {/* Information contextuelle */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
        <div className="flex items-start">
          <FaClipboardCheck className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary text-base sm:text-lg mb-2">Dernière vérification</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Vérifiez attentivement toutes les informations. Une fois confirmée, l'inscription sera envoyée pour validation.
            </p>
          </div>
        </div>
      </div>

      {/* Récapitulatif détaillé */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden mb-6">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 sm:p-6">
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl flex items-center">
            <FaInfoCircle className="w-5 h-5 text-primary mr-3" />
            Récapitulatif complet
          </h3>
        </div>

        {/* Sections du récapitulatif */}
        <div className="divide-y divide-gray-100">
          {/* Section Activité */}
          <div className="p-4 sm:p-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-lg mr-4">
                <FaUsers className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-2">Activité sélectionnée</h4>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium text-base sm:text-lg">{formData.activite_nom}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 capitalize">
                      {formData.sexe}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                      {formData.categorie_age}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 capitalize">
                      {formData.type_activite}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Équipe */}
          <div className="p-4 sm:p-6">
            <div className="flex items-start">
              <div className="bg-secondary/10 p-2 rounded-lg mr-4">
                <FaUser className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-2">
                  {formData.type_activite === "collectif" ? "Équipe" : "Pseudo"}
                </h4>
                <p className="text-gray-900 font-medium text-base sm:text-lg">{formData.equipe_nom}</p>
              </div>
            </div>
          </div>

          {/* Section Responsable */}
          <div className="p-4 sm:p-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <FaUser className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-2">Responsable</h4>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium">
                    {formData.responsable_first_name} {formData.responsable_last_name}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="inline-flex items-center text-sm text-gray-600">
                      <FaEnvelope className="w-4 h-4 mr-2" />
                      {formData.responsable_email}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-600">
                      <FaPhone className="w-4 h-4 mr-2" />
                      {formData.responsable_phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message informatif */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
        <p className="text-sm sm:text-base text-gray-700 flex items-start">
          <FaInfoCircle className="w-4 h-4 text-blue-500 mt-1 mr-3 flex-shrink-0" />
          <span>
            <strong>Important :</strong> Votre inscription sera en attente de validation par l'administration. 
            Vous recevrez un email de confirmation une fois validée.
          </span>
        </p>
      </div>

      {/* Boutons d'action */}
      <div className={`flex ${isMobile ? 'flex-col-reverse gap-3' : 'justify-between'} pt-6 sm:pt-8 border-t border-gray-100`}>
        <button 
          onClick={prevStep}
          className={`btn-secondary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group ${
            isMobile ? 'w-full' : ''
          }`}
        >
          <FaArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Modifier</span>
        </button>
        
        <button 
          onClick={handleConfirmation}
          disabled={loading}
          className={`btn-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group relative overflow-hidden ${
            isMobile ? 'w-full' : ''
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
              <span className="relative z-10">Traitement...</span>
            </>
          ) : (
            <>
              <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
              <span className="relative z-10">Confirmer l'inscription</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </>
          )}
        </button>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full animate-slide-up">
            <div className="text-center mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Confirmer l'inscription
              </h3>
              <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">
                Êtes-vous sûr de vouloir finaliser cette inscription ? 
                Cette action est définitive.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary flex-1 py-3 px-4 text-sm sm:text-base"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex-1 py-3 px-4 text-sm sm:text-base"
              >
                {loading ? 'Validation...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}