import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../utils/firebaseClient"
import { FaCheckCircle, FaEdit, FaArrowLeft, FaInfoCircle } from "react-icons/fa"

export default function Step4Confirmation({ formData, prevStep, activites }) {
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
        created_at: new Date()
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'inscription : " + err.message)
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
      <div className="p-12 text-center">
        <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Inscription <span className="text-primary">réussie</span> !
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 line-grow"></div>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Votre inscription a été enregistrée avec succès. 
          Vous recevrez un email de confirmation une fois validée par l'administration.
        </p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="btn-primary px-10 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
        >
          Retour à l'accueil
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          Confirmation de l'inscription
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
        <p className="text-gray-600 text-lg">Vérifiez les informations avant validation</p>
      </div>

      {/* Information contextuelle */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 mb-8 card-hover">
        <div className="flex items-start space-x-4">
          <FaInfoCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary text-lg mb-2">Dernière vérification</h3>
            <p className="text-gray-700">
              Veuillez vérifier attentivement toutes les informations ci-dessous. 
              Si tout est correct, cliquez sur "Confirmer l'inscription".
            </p>
          </div>
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6 card-hover">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-primary font-semibold text-lg mb-2">Activité</h4>
              <p className="text-gray-700 text-xl font-medium">{formData.activite_nom}</p>
            </div>
            <div>
              <h4 className="text-primary font-semibold text-lg mb-2">Type d'activité</h4>
              <p className="text-gray-700 capitalize">{formData.type_activite}</p>
            </div>
            <div>
              <h4 className="text-primary font-semibold text-lg mb-2">Catégorie</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 capitalize">
                  {formData.sexe}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                  {formData.categorie_age}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-secondary font-semibold text-lg mb-2">Équipe / Pseudo</h4>
              <p className="text-gray-700 text-xl font-medium">{formData.equipe_nom}</p>
            </div>
            <div>
              <h4 className="text-secondary font-semibold text-lg mb-2">Responsable</h4>
              <p className="text-gray-700 text-lg">{formData.responsable_first_name} {formData.responsable_last_name}</p>
            </div>
            <div>
              <h4 className="text-secondary font-semibold text-lg mb-2">Contact</h4>
              <p className="text-gray-700">{formData.responsable_email}</p>
              <p className="text-gray-700">{formData.responsable_phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
        <div className="flex space-x-4">
          <button 
            onClick={prevStep}
            className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center space-x-3 transform hover:scale-105 transition-all duration-300"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          <button 
            onClick={prevStep}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
          >
            <FaEdit className="w-5 h-5" />
            <span>Modifier</span>
          </button>
        </div>
        <button 
          onClick={handleConfirmation}
          disabled={loading}
          className="btn-primary px-10 py-4 text-lg font-semibold flex items-center space-x-3 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Traitement...</span>
            </>
          ) : (
            <>
              <FaCheckCircle className="w-5 h-5" />
              <span>Confirmer l'inscription</span>
            </>
          )}
        </button>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full card-hover">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Confirmer l'inscription
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-center mb-6">
              Êtes-vous sûr de vouloir confirmer cette inscription ? 
              Cette action est définitive.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary flex-1 py-3"
              >
                Non, annuler
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary flex-1 py-3"
              >
                Oui, confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}