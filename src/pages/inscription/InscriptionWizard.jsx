import { useState } from "react"
import Step1ChoixActivite from "./Step1ChoixActivite"

export default function InscriptionWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    activite: null,
    sexe: null,
    categorie_age: null,
    equipe_nom: "",
    participants: [], // tableau de joueurs avec leurs infos
  })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const updateFormData = (data) => {
    console.log("Mise à jour des données :", data)
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {step === 1 && (
        <Step1ChoixActivite
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}
    </div>
  )
}
