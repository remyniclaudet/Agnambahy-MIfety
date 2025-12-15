// src/utils/firebaseClient.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Validation de la configuration
console.log("🔧 Configuration Firebase:", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
})

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error("❌ Configuration Firebase incomplète. Vérifiez le fichier .env")
}

// Initialisation Firebase
const app = initializeApp(firebaseConfig)

// Initialisation des services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Activation de la persistance offline
enableIndexedDbPersistence(db)
  .then(() => console.log("✅ Persistance Firestore activée"))
  .catch((err) => {
    console.warn("⚠️ Persistance Firestore échouée:", err)
    if (err.code === 'failed-precondition') {
      console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.")
    } else if (err.code === 'unimplemented') {
      console.warn("The current browser doesn't support all of the features required to enable persistence")
    }
  })

// Test de connexion
export const testFirestoreConnection = async () => {
  try {
    const testCollection = collection(db, 'test_connection')
    const q = query(testCollection, limit(1))
    await getDocs(q)
    console.log("✅ Connexion Firestore établie")
    return true
  } catch (error) {
    console.error("❌ Erreur connexion Firestore:", error)
    return false
  }
}