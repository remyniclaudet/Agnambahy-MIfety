import { useState, useEffect, useRef } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../../utils/firebaseClient"
import Step1ChoixActivite from "./Step1ChoixActivite"
import Step2Equipe from "./Step2Equipe"
import Step3Responsable from "./Step3Responsable"
import Step4Confirmation from "./Step4Confirmation"
import { FaUsers, FaUserFriends, FaClipboardCheck, FaCheckCircle, FaHome, FaShieldAlt } from "react-icons/fa"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function InscriptionWizard() {
  const [step, setStep] = useState(1)
  const [activites, setActivites] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const formContainerRef = useRef(null)

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

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    fetchActivites()
    // Smooth scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Auto-focus sur le premier champ
    setTimeout(() => {
      const firstInput = formContainerRef.current?.querySelector('input, select, button')
      if (firstInput && step === 1) firstInput.focus?.()
    }, 300)
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
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    setStep((prev) => {
      const next = prev + 1
      // Animation de transition
      if (formContainerRef.current) {
        formContainerRef.current.style.opacity = '0'
        formContainerRef.current.style.transform = 'translateY(10px)'
      }
      setTimeout(() => {
        if (formContainerRef.current) {
          formContainerRef.current.style.opacity = '1'
          formContainerRef.current.style.transform = 'translateY(0)'
        }
      }, 300)
      return next
    })
  }

  const prevStep = () => {
    setStep((prev) => {
      const prevStep = prev - 1
      if (formContainerRef.current) {
        formContainerRef.current.style.opacity = '0'
        formContainerRef.current.style.transform = 'translateY(-10px)'
      }
      setTimeout(() => {
        if (formContainerRef.current) {
          formContainerRef.current.style.opacity = '1'
          formContainerRef.current.style.transform = 'translateY(0)'
        }
      }, 300)
      return prevStep
    })
  }

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const steps = [
    { number: 1, label: "Activité", icon: FaUsers, description: "Choisissez votre activité" },
    { number: 2, label: "Équipe", icon: FaUserFriends, description: "Nommez votre équipe" },
    { number: 3, label: "Responsable", icon: FaUsers, description: "Informations du responsable" },
    { number: 4, label: "Confirmation", icon: FaClipboardCheck, description: "Vérifiez et validez" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50/50">
      <Navbar />
      
      <main className="flex-1 py-4 sm:py-8 px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Bouton retour accueil - visible sur mobile et desktop */}
          <div className="mb-6">
            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              aria-label="Retour à l'accueil"
            >
              <FaHome className="w-4 h-4" />
              <span className="hidden sm:inline">Retour à l'accueil</span>
              <span className="sm:hidden">Accueil</span>
            </button>
          </div>

          {/* En-tête */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 animate-fade-in">
              Inscription aux <span className="text-primary animate-gradient">Activités</span>
            </h1>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-3 sm:mb-4 animate-line-grow"></div>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Rejoignez l'aventure en 4 étapes simples et rapides
            </p>
          </div>

          {/* Barre de progression adaptative */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between relative mb-4 sm:mb-0">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex flex-col items-center flex-1 relative z-10">
                  <div className="relative">
                    <div
                      className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 font-bold transition-all duration-300 ${
                        step > stepItem.number
                          ? "bg-gradient-to-r from-primary to-secondary border-transparent text-white shadow-lg"
                          : step === stepItem.number
                          ? "border-primary bg-white text-primary shadow-lg transform scale-110"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                      aria-current={step === stepItem.number ? "step" : undefined}
                    >
                      {step > stepItem.number ? (
                        <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 animate-check-in" />
                      ) : (
                        <stepItem.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    {step === stepItem.number && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <span
                      className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                        step >= stepItem.number ? "text-primary font-semibold" : "text-gray-500"
                      }`}
                    >
                      {stepItem.label}
                    </span>
                    <span className="hidden sm:block text-xs text-gray-400 mt-1">
                      {stepItem.description}
                    </span>
                  </div>
                </div>
              ))}

              {/* Ligne de progression */}
              <div className="absolute top-5 sm:top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Indicateur de progression mobile */}
            <div className="sm:hidden text-center mt-4">
              <span className="text-sm font-semibold text-primary">
                Étape {step} sur {steps.length}
              </span>
            </div>
          </div>

          {/* Contenu des étapes avec animation */}
          <div 
            ref={formContainerRef}
            className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
            style={{ opacity: 1, transform: 'translateY(0)' }}
          >
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
                isMobile={isMobile}
              />
            )}
            {step === 3 && (
              <Step3Responsable
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                isMobile={isMobile}
              />
            )}
            {step === 4 && (
              <Step4Confirmation
                formData={formData}
                prevStep={prevStep}
                activites={activites}
                isMobile={isMobile}
              />
            )}
          </div>

          {/* Message de confidentialité */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-sm">
            <div className="flex items-center">
              <FaShieldAlt className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Vos informations sont sécurisées et restent confidentielles
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Nous ne partageons jamais vos données personnelles avec des tiers
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}