import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Test de connexion
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Erreur de connexion Supabase:', error.message)
  } else {
    console.log('✅ Connexion Supabase réussie!')
    console.log('Session utilisateur:', data.session ? 'Connecté' : 'Non connecté')
  }
})