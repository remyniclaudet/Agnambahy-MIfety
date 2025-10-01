import { useState } from "react"

export default function Step1ChoixActivite({ formData, updateFormData, nextStep }) {
  const [selectedActivite, setSelectedActivite] = useState(formData.activite || "")
  const [sexe, setSexe] = useState(formData.sexe || "")
  const [categorieAge, setCategorieAge] = useState(formData.categorie_age || "")

  const handleNext = () => {
    console.log("Étape 1 validée :", { selectedActivite, sexe, categorieAge })
    updateFormData({ activite: selectedActivite, sexe, categorie_age: categorieAge })
    nextStep()
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Choix de l'activité</h2>
      <select value={selectedActivite} onChange={(e) => setSelectedActivite(e.target.value)} className="border p-2 w-full mb-4">
        <option value="">-- Choisir une activité --</option>
        <option value="basket3x3">Basket 3x3</option>
        <option value="basket5x5">Basket 5x5</option>
        <option value="moto">Moto</option>
      </select>

      <select value={sexe} onChange={(e) => setSexe(e.target.value)} className="border p-2 w-full mb-4">
        <option value="">-- Sexe --</option>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
      </select>

      <select value={categorieAge} onChange={(e) => setCategorieAge(e.target.value)} className="border p-2 w-full mb-4">
        <option value="">-- Catégorie d'âge --</option>
        <option value="U18">U18</option>
        <option value="U23">U23</option>
        <option value="Open">Open</option>
      </select>

      <button onClick={handleNext} className="btn-primary">Suivant</button>
    </div>
  )
}
