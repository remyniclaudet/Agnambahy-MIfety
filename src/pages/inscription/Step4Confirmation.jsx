import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../utils/firebaseClient"
import { FaCheckCircle } from "react-icons/fa"

export default function Step4Confirmation({ formData, prevStep, activites }) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
    }
  }

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4"/>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Inscription <span className="text-primary">réussie</span> !
        </h2>
        <button onClick={() => window.location.href='/'} className="btn-primary px-8 py-3">Retour à l'accueil</button>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirmation de l'inscription</h2>
        <p className="text-gray-600">Vérifiez les informations avant validation</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div><strong>Activité:</strong> {formData.activite_nom}</div>
        <div><strong>Équipe:</strong> {formData.equipe_nom}</div>
        <div><strong>Responsable:</strong> {formData.responsable_first_name} {formData.responsable_last_name}</div>
        <div><strong>Email:</strong> {formData.responsable_email}</div>
        <div><strong>Téléphone:</strong> {formData.responsable_phone}</div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
        <button onClick={prevStep} className="btn-secondary px-8 py-3">Retour</button>
        <button onClick={handleSubmit} disabled={loading} className="btn-primary px-8 py-3">
          {loading ? "Traitement..." : "Confirmer l'inscription"}
        </button>
      </div>
    </div>
  )
}
