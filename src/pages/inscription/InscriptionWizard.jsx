import { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../../utils/firebaseClient"
import Step1ChoixActivite from "./Step1ChoixActivite"
import Step2Equipe from "./Step2Equipe"
import Step3Participants from "./Step3Responsable"
import Step4Confirmation from "./Step4Confirmation"
import { FaUsers, FaUserFriends, FaClipboardCheck, FaCheckCircle } from "react-icons/fa"

export default function InscriptionWizard() {
  const [step, setStep] = useState(1)
  const [activites, setActivites] = useState([])
  const [loading, setLoading] = useState(false)

 const [formData, setFormData] = useState({
  activite_id: null,
  activite_nom: "",
  type_activite: "",
  sexe: "",
  categorie_age: "",
  equipe_nom: "",
  responsable_first_name: "",
  responsable_last_name: "",
  responsable_email: "",
  responsable_phone: "",
})


  useEffect(() => {
    fetchActivites()
  }, [])

  const fetchActivites = async () => {
    setLoading(true)
    try {
      const activitesCollection = collection(db, "activites")
      const q = query(activitesCollection, orderBy("created_at", "desc"))
      const querySnapshot = await getDocs(q)

      const activitesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setActivites(activitesData)
    } catch (error) {
      console.error("Erreur lors du chargement des activités:", error)
      alert("Erreur lors du chargement des activités")
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const updateFormData = (data) => {
    console.log("Mise à jour des données :", data)
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const steps = [
    { number: 1, label: "Activité", icon: FaUsers },
    { number: 2, label: "Équipe", icon: FaUserFriends },
    { number: 3, label: "Participants", icon: FaUsers },
    { number: 4, label: "Confirmation", icon: FaClipboardCheck },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Inscription aux <span className="text-primary">Activités</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rejoignez l'aventure Agnambahy Mifety ! Inscrivez votre équipe en quelques étapes simples.
          </p>
        </div>

        {/* Barre de progression */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between relative">
            {steps.map((stepItem) => (
              <div key={stepItem.number} className="flex flex-col items-center flex-1">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold transition-all duration-300 ${
                    step > stepItem.number
                      ? "bg-primary border-primary text-white"
                      : step === stepItem.number
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {step > stepItem.number ? (
                    <FaCheckCircle className="w-6 h-6" />
                  ) : (
                    <stepItem.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium mt-2 ${
                    step >= stepItem.number ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {stepItem.label}
                </span>
              </div>
            ))}

            {/* Ligne de progression */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Contenu des étapes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {step === 1 && (
            <Step1ChoixActivite
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              activites={activites}
              loading={loading}
            />
          )}
          {step === 2 && (
            <Step2Equipe
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <Step3Participants
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 4 && (
            <Step4Confirmation
              formData={formData}
              prevStep={prevStep}
              activites={activites}
            />
          )}
        </div>

        {/* Informations importantes */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
            <FaClipboardCheck className="w-5 h-5 mr-2" />
            Informations importantes
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Votre inscription sera en attente de validation par l'administration</li>
            <li>• Tous les champs marqués d'un * sont obligatoires</li>
            <li>• Le nombre de participants est limité par activité</li>
            <li>• Vous recevrez un email de confirmation après validation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
