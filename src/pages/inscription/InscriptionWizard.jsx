import { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../../utils/firebaseClient"
import Step1ChoixActivite from "./Step1ChoixActivite"
import Step2Equipe from "./Step2Equipe"
import Step3Responsable from "./Step3Responsable"
import Step4Confirmation from "./Step4Confirmation"
import { FaUsers, FaUserFriends, FaClipboardCheck, FaCheckCircle, FaHome } from "react-icons/fa"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

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
    // Scroll vers le haut à chaque changement d'étape
    window.scrollTo(0, 0)
  }, [step])

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
    { number: 3, label: "Responsable", icon: FaUsers },
    { number: 4, label: "Confirmation", icon: FaClipboardCheck },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Contenu principal */}
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8 pt-24"> {/* pt-24 pour compenser la navbar fixe */}
        <div className="max-w-4xl mx-auto">
          {/* Bouton retour accueil - Step 1 seulement */}
          {step === 1 && (
            <div className="flex justify-start mb-6">
              <button
                onClick={() => window.location.href = '/'}
                className="btn-secondary flex items-center space-x-2 px-6 py-3 text-base transform hover:scale-105 transition-all duration-300"
              >
                <FaHome className="w-4 h-4" />
                <span>Retour à l'accueil</span>
              </button>
            </div>
          )}

          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Inscription aux <span className="text-secondary">Activités</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 line-grow"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rejoignez l'aventure Agnambahy Mifety ! Inscrivez votre équipe en quelques étapes simples.
            </p>
          </div>

          {/* Barre de progression */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 card-hover">
            <div className="flex items-center justify-between relative">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold transition-all duration-300 ${
                      step > stepItem.number
                        ? "bg-primary border-primary text-white shadow-lg"
                        : step === stepItem.number
                        ? "border-primary bg-primary text-white shadow-lg scale-110"
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
                    className={`text-sm font-medium mt-2 transition-colors duration-300 ${
                      step >= stepItem.number ? "text-primary font-semibold" : "text-gray-500"
                    }`}
                  >
                    {stepItem.label}
                  </span>
                </div>
              ))}

              {/* Ligne de progression */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Contenu des étapes */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden card-hover">
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
              <Step3Responsable
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
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 card-hover">
            <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
              <FaClipboardCheck className="w-5 h-5 mr-2" />
              Informations importantes
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Votre inscription sera en attente de validation par l'administration
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                Tous les champs marqués d'un * sont obligatoires
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Le nombre de participants est limité par activité
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">•</span>
                Vous recevrez un email de confirmation après validation
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      
    </div>
  )
}