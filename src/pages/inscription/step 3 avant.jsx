import { useState, useEffect } from "react"
import { FaPlus, FaTrash, FaUser, FaEnvelope, FaUserTie, FaStar, FaInfoCircle, FaCamera, FaUpload } from "react-icons/fa"
import { supabase } from "../../utils/supabaseClient"

export default function Step3Participants({ formData, updateFormData, nextStep, prevStep }) {
  const [participants, setParticipants] = useState(formData.participants || [])
  const [coach, setCoach] = useState(formData.coach || { first_name: "", last_name: "", email: "", photo_url: "", role: "coach" })
  const [capitaineId, setCapitaineId] = useState(formData.capitaine_id || "")
  const [maxParticipants, setMaxParticipants] = useState(formData.max_joueurs || 0)
  const [minParticipants, setMinParticipants] = useState(formData.min_joueurs || 1)
  const [uploading, setUploading] = useState(null)
  const [storageError, setStorageError] = useState("")

  const isActiviteIndividuelle = formData.type_activite === "individuel"
  const isActiviteCollective = formData.type_activite === "collectif"

  useEffect(() => {
    setMaxParticipants(formData.max_joueurs || 10)
    setMinParticipants(formData.min_joueurs || 1)
  }, [formData.max_joueurs, formData.min_joueurs])

  // Vérifier si le bucket photos existe
  const checkStorageBucket = async () => {
    try {
      const { data, error } = await supabase.storage.getBucket('photos')
      if (error) {
        console.warn('Bucket photos non trouvé, création nécessaire')
        setStorageError('Le système de stockage des photos n\'est pas configuré. Contactez l\'administrateur.')
      }
    } catch (error) {
      console.error('Erreur de vérification du bucket:', error)
      setStorageError('Erreur de connexion au stockage.')
    }
  }

  useEffect(() => {
    checkStorageBucket()
  }, [])

  const addParticipant = () => {
    const totalJoueurs = participants.length
    const avecCoach = coach.first_name.trim() ? 1 : 0
    
    if (totalJoueurs + avecCoach >= maxParticipants) {
      alert(`Nombre maximum de participants atteint (${maxParticipants})`)
      return
    }
    
    setParticipants([...participants, { 
      first_name: "", 
      last_name: "", 
      email: "", 
      photo_url: "",
      role: "joueur"
    }])
  }

  const removeParticipant = (index) => {
    const newParticipants = [...participants]
    
    // Supprimer la photo du storage si elle existe
    if (newParticipants[index].photo_url) {
      deletePhotoFromStorage(newParticipants[index].photo_url)
    }
    
    if (capitaineId === `participant_${index}`) {
      setCapitaineId("")
    }
    
    newParticipants.splice(index, 1)
    setParticipants(newParticipants)
  }

  const handleParticipantChange = (index, field, value) => {
    const newParticipants = [...participants]
    newParticipants[index][field] = value
    setParticipants(newParticipants)
  }

  const handleCoachChange = (field, value) => {
    setCoach({ ...coach, [field]: value })
  }

  // Fonction pour uploader une photo
  const handlePhotoUpload = async (file, type, index = null) => {
    if (!file) return

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La photo ne doit pas dépasser 5MB")
      return
    }

    if (!file.type.startsWith('image/')) {
      alert("Veuillez sélectionner une image valide")
      return
    }

    setUploading({ type, index })
    setStorageError("")

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `participants/${fileName}`

      console.log('Début upload:', filePath)

      // Upload vers Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Erreur upload:', uploadError)
        
        if (uploadError.message.includes('bucket') || uploadError.message.includes('RLS')) {
          setStorageError('Erreur de configuration du stockage. Contactez l\'administrateur.')
          throw new Error('STORAGE_CONFIG_ERROR')
        }
        throw uploadError
      }

      console.log('Upload réussi:', data)

      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath)

      console.log('URL publique:', publicUrl)

      // Mettre à jour l'URL de la photo
      if (type === 'participant' && index !== null) {
        // Supprimer l'ancienne photo si elle existe
        if (participants[index].photo_url) {
          await deletePhotoFromStorage(participants[index].photo_url)
        }
        
        const newParticipants = [...participants]
        newParticipants[index].photo_url = publicUrl
        setParticipants(newParticipants)
      } else if (type === 'coach') {
        // Supprimer l'ancienne photo si elle existe
        if (coach.photo_url) {
          await deletePhotoFromStorage(coach.photo_url)
        }
        
        setCoach({ ...coach, photo_url: publicUrl })
      }

    } catch (error) {
      console.error('Erreur lors de l\'upload:', error)
      
      if (error.message === 'STORAGE_CONFIG_ERROR') {
        alert("Le système de stockage n'est pas configuré. Vous pouvez continuer sans photo pour le moment.")
      } else {
        alert("Erreur lors de l'upload de la photo. Vous pouvez continuer sans photo pour le moment.")
      }
    } finally {
      setUploading(null)
    }
  }

  // Fonction pour supprimer une photo du storage
  const deletePhotoFromStorage = async (photoUrl) => {
    try {
      if (!photoUrl) return
      
      const fileName = photoUrl.split('/').pop()
      if (!fileName) return

      const { error } = await supabase.storage
        .from('photos')
        .remove([`participants/${fileName}`])
      
      if (error) {
        console.error('Erreur suppression photo:', error)
      }
    } catch (error) {
      console.error('Erreur suppression photo:', error)
    }
  }

  // Fonction pour supprimer une photo
  const removePhoto = async (type, index = null) => {
    if (type === 'participant' && index !== null) {
      if (participants[index].photo_url) {
        await deletePhotoFromStorage(participants[index].photo_url)
      }
      const newParticipants = [...participants]
      newParticipants[index].photo_url = ""
      setParticipants(newParticipants)
    } else if (type === 'coach') {
      if (coach.photo_url) {
        await deletePhotoFromStorage(coach.photo_url)
      }
      setCoach({ ...coach, photo_url: "" })
    }
  }

  const handleNext = () => {
    // Si erreur de storage, on permet de continuer sans photo
    const allowWithoutPhoto = storageError !== ""

    // Validation pour les activités collectives
    if (isActiviteCollective) {
      const totalJoueurs = participants.length
      const coachRempli = coach.first_name.trim() && coach.last_name.trim() && coach.email.trim()
      const totalAvecCoach = totalJoueurs + (coachRempli ? 1 : 0)

      if (totalJoueurs < minParticipants) {
        alert(`Nombre minimum de joueurs non atteint. Minimum requis : ${minParticipants}`)
        return
      }

      if (totalAvecCoach > maxParticipants) {
        alert(`Nombre maximum de participants dépassé. Maximum autorisé : ${maxParticipants}`)
        return
      }

      // Validation des joueurs
      for (let i = 0; i < participants.length; i++) {
        const p = participants[i]
        if (!p.first_name.trim() || !p.last_name.trim() || !p.email.trim()) {
          alert(`Veuillez remplir tous les champs pour le joueur ${i + 1}`)
          return
        }
        
        if (!isValidEmail(p.email)) {
          alert(`Email invalide pour le joueur ${i + 1}`)
          return
        }

        // Photo obligatoire sauf si erreur de storage
        if (!allowWithoutPhoto && !p.photo_url) {
          alert(`Veuillez ajouter une photo pour le joueur ${i + 1}`)
          return
        }
      }

      // Validation du coach si renseigné
      if (coachRempli) {
        if (!isValidEmail(coach.email)) {
          alert("Email invalide pour le coach")
          return
        }
        if (!allowWithoutPhoto && !coach.photo_url) {
          alert("Veuillez ajouter une photo pour le coach")
          return
        }
      }

      // Validation du capitaine
      if (!capitaineId && participants.length > 0) {
        alert("Veuillez sélectionner un capitaine pour l'équipe")
        return
      }
    }

    // Validation pour les activités individuelles
    if (isActiviteIndividuelle) {
      if (participants.length !== 1) {
        alert("Une activité individuelle ne peut avoir qu'un seul participant")
        return
      }

      const p = participants[0]
      if (!p.first_name.trim() || !p.last_name.trim() || !p.email.trim()) {
        alert("Veuillez remplir tous les champs")
        return
      }

      if (!isValidEmail(p.email)) {
        alert("Email invalide")
        return
      }

      // Photo obligatoire sauf si erreur de storage
      if (!allowWithoutPhoto && !p.photo_url) {
        alert("Veuillez ajouter votre photo")
        return
      }
    }

    // Préparer les données finales
    const formDataToUpdate = {
      participants: participants.map((p, index) => ({
        ...p,
        role: isActiviteIndividuelle ? "individuel" : "joueur"
      }))
    }

    if (isActiviteCollective) {
      formDataToUpdate.coach = coach.first_name.trim() ? coach : null
      formDataToUpdate.capitaine_id = capitaineId
      
      if (capitaineId.startsWith('participant_')) {
        const capitaineIndex = parseInt(capitaineId.split('_')[1])
        formDataToUpdate.capitaine_email = participants[capitaineIndex]?.email
      } else if (capitaineId === 'coach') {
        formDataToUpdate.capitaine_email = coach.email
      }
    }

    updateFormData(formDataToUpdate)
    nextStep()
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const getTotalParticipants = () => {
    const totalJoueurs = participants.length
    const coachRempli = coach.first_name.trim() ? 1 : 0
    return totalJoueurs + coachRempli
  }

  // Composant pour l'upload de photo
  const PhotoUpload = ({ type, index, currentPhoto, onPhotoUpload, onPhotoRemove }) => {
    const [isDragging, setIsDragging] = useState(false)

    const handleFileSelect = (file) => {
      onPhotoUpload(file, type, index)
    }

    const handleDragOver = (e) => {
      e.preventDefault()
      setIsDragging(true)
    }

    const handleDragLeave = (e) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFileSelect(file)
    }

    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <FaCamera className="w-4 h-4 mr-2 text-gray-400" />
          Photo {storageError ? "(Optionnel - Système temporairement indisponible)" : "*"}
        </label>
        
        {storageError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
            <p className="text-yellow-800 text-sm">{storageError}</p>
          </div>
        )}
        
        {currentPhoto ? (
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
              <img 
                src={currentPhoto} 
                alt="Photo participant" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => document.getElementById(`photo-input-${type}-${index}`).click()}
                className="btn-secondary text-sm flex items-center space-x-2"
              >
                <FaUpload className="w-3 h-3" />
                <span>Changer</span>
              </button>
              <button
                type="button"
                onClick={() => onPhotoRemove(type, index)}
                className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-2"
              >
                <FaTrash className="w-3 h-3" />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
            } ${uploading?.type === type && uploading?.index === index ? 'opacity-50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById(`photo-input-${type}-${index}`).click()}
          >
            {uploading?.type === type && uploading?.index === index ? (
              <div className="space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-gray-600">Upload en cours...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <FaCamera className="w-8 h-8 text-gray-400 mx-auto" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Cliquez ou glissez-déposez une photo
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, JPEG (max. 5MB)
                  </p>
                  {storageError && (
                    <p className="text-xs text-yellow-600 mt-1">
                      Vous pouvez continuer sans photo pour le moment
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <input
          id={`photo-input-${type}-${index}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) handleFileSelect(file)
            e.target.value = ''
          }}
        />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {isActiviteIndividuelle ? "Vos informations" : "Membres de l'équipe"}
        </h2>
        <p className="text-gray-600">
          {isActiviteIndividuelle 
            ? "Renseignez vos informations personnelles"
            : `Ajoutez les membres de votre équipe (${getTotalParticipants()}/${maxParticipants})`
          }
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Informations pour activités individuelles */}
        {isActiviteIndividuelle && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FaUser className="w-5 h-5 mr-2 text-primary" />
                Vos informations *
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Colonne gauche - Informations personnelles */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      placeholder="Votre prénom"
                      value={participants[0]?.first_name || ""}
                      onChange={(e) => handleParticipantChange(0, "first_name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={participants[0]?.last_name || ""}
                      onChange={(e) => handleParticipantChange(0, "last_name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" />
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={participants[0]?.email || ""}
                      onChange={(e) => handleParticipantChange(0, "email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Colonne droite - Photo */}
                <div>
                  <PhotoUpload
                    type="participant"
                    index={0}
                    currentPhoto={participants[0]?.photo_url}
                    onPhotoUpload={handlePhotoUpload}
                    onPhotoRemove={removePhoto}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section pour activités collectives */}
        {isActiviteCollective && (
          <>
            {/* En-tête avec compteur */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Participants: {getTotalParticipants()}/{maxParticipants}
                </span>
                {minParticipants > 0 && (
                  <span className="text-sm text-gray-500 ml-4">
                    Minimum: {minParticipants} joueur(s)
                  </span>
                )}
              </div>
              <button 
                onClick={addParticipant}
                disabled={getTotalParticipants() >= maxParticipants}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlus className="w-4 h-4" />
                <span>Ajouter un joueur</span>
              </button>
            </div>

            {/* Liste des joueurs */}
            <div className="space-y-6 mb-8">
              {participants.map((participant, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <FaUser className="w-4 h-4 mr-2 text-primary" />
                      Joueur {index + 1} {capitaineId === `participant_${index}` && (
                        <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
                          <FaStar className="w-3 h-3 mr-1" />
                          Capitaine
                        </span>
                      )}
                    </h3>
                    {participants.length > minParticipants && (
                      <button
                        onClick={() => removeParticipant(index)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Colonne gauche - Informations */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          placeholder="Prénom"
                          value={participant.first_name}
                          onChange={(e) => handleParticipantChange(index, "first_name", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          placeholder="Nom"
                          value={participant.last_name}
                          onChange={(e) => handleParticipantChange(index, "last_name", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" />
                          Email *
                        </label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={participant.email}
                          onChange={(e) => handleParticipantChange(index, "email", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Colonne droite - Photo */}
                    <div>
                      <PhotoUpload
                        type="participant"
                        index={index}
                        currentPhoto={participant.photo_url}
                        onPhotoUpload={handlePhotoUpload}
                        onPhotoRemove={removePhoto}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section Coach */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FaUserTie className="w-5 h-5 mr-2 text-blue-600" />
                Coach (Optionnel)
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Colonne gauche - Informations coach */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom du coach
                    </label>
                    <input
                      type="text"
                      placeholder="Prénom"
                      value={coach.first_name}
                      onChange={(e) => handleCoachChange("first_name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du coach
                    </label>
                    <input
                      type="text"
                      placeholder="Nom"
                      value={coach.last_name}
                      onChange={(e) => handleCoachChange("last_name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" />
                      Email du coach
                    </label>
                    <input
                      type="email"
                      placeholder="coach@example.com"
                      value={coach.email}
                      onChange={(e) => handleCoachChange("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Colonne droite - Photo coach */}
                <div>
                  <PhotoUpload
                    type="coach"
                    currentPhoto={coach.photo_url}
                    onPhotoUpload={handlePhotoUpload}
                    onPhotoRemove={removePhoto}
                  />
                </div>
              </div>
            </div>

            {/* Sélection du capitaine */}
            {participants.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <FaStar className="w-5 h-5 mr-2 text-yellow-600" />
                  Sélection du capitaine *
                </h3>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">
                    Choisissez le capitaine de l'équipe parmi les joueurs ou le coach
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option Coach comme capitaine */}
                    {coach.first_name.trim() && (
                      <label className="flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-yellow-400">
                        <input
                          type="radio"
                          name="capitaine"
                          value="coach"
                          checked={capitaineId === "coach"}
                          onChange={(e) => setCapitaineId(e.target.value)}
                          className="text-yellow-600 focus:ring-yellow-500"
                        />
                        <div className="flex items-center space-x-3">
                          {coach.photo_url && (
                            <img src={coach.photo_url} alt="Coach" className="w-10 h-10 rounded-full object-cover" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">Coach: {coach.first_name} {coach.last_name}</div>
                            <div className="text-sm text-gray-500">{coach.email}</div>
                          </div>
                        </div>
                      </label>
                    )}

                    {/* Options Joueurs comme capitaine */}
                    {participants.map((participant, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-yellow-400">
                        <input
                          type="radio"
                          name="capitaine"
                          value={`participant_${index}`}
                          checked={capitaineId === `participant_${index}`}
                          onChange={(e) => setCapitaineId(e.target.value)}
                          className="text-yellow-600 focus:ring-yellow-500"
                        />
                        <div className="flex items-center space-x-3">
                          {participant.photo_url && (
                            <img src={participant.photo_url} alt={`Joueur ${index + 1}`} className="w-10 h-10 rounded-full object-cover" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">Joueur {index + 1}: {participant.first_name} {participant.last_name}</div>
                            <div className="text-sm text-gray-500">{participant.email}</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {participants.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <FaUser className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun joueur</h3>
                <p className="text-gray-600 mb-4">Commencez par ajouter les joueurs de votre équipe</p>
                <button 
                  onClick={addParticipant}
                  className="btn-primary"
                >
                  Ajouter le premier joueur
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
        <button 
          onClick={prevStep}
          className="btn-secondary px-8 py-3 text-lg font-semibold flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour</span>
        </button>
        <button 
          onClick={handleNext}
          disabled={
            isActiviteIndividuelle 
              ? !participants[0]?.first_name || !participants[0]?.last_name || !participants[0]?.email || !participants[0]?.photo_url
              : participants.length < minParticipants || !capitaineId
          }
          className="btn-primary px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>Continuer</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}