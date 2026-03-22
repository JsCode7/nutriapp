import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const DEFAULT_ID = '00000000-0000-0000-0000-000000000000'

export const Settings = () => {
  const [profile, setProfile] = useState({
    id: DEFAULT_ID,
    height: 175,
    weight_goal: 70,
    kcal_goal: 2000,
    protein_goal: 150,
    carbs_goal: 250,
    fats_goal: 70
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', DEFAULT_ID)
      .maybeSingle()
    if (data) setProfile(data)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ ...profile, id: DEFAULT_ID })
      
      if (error) throw error
      alert('Configuración guardada!')
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="settings-view">
      <header className="view-header">
        <h1>Ajustes</h1>
        <p>Configura tus objetivos y perfil</p>
      </header>

      <div className="premium-card settings-card">
        <h3>Tus Metas y Perfil</h3>
        
        <form onSubmit={handleSave} className="settings-form">
          <div className="form-group-grid">
            <div className="input-field-glass">
              <label>Estatura (cm)</label>
              <input
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: +e.target.value })}
              />
            </div>

            <div className="input-field-glass">
              <label>Meta Calorías (kcal)</label>
              <input
                type="number"
                value={profile.kcal_goal}
                onChange={(e) => setProfile({ ...profile, kcal_goal: +e.target.value })}
              />
            </div>

            <div className="input-field-glass">
              <label>Meta Proteína (g)</label>
              <input
                type="number"
                value={profile.protein_goal}
                onChange={(e) => setProfile({ ...profile, protein_goal: +e.target.value })}
              />
            </div>

            <div className="input-field-glass">
              <label>Meta Carbohidratos (g)</label>
              <input
                type="number"
                value={profile.carbs_goal}
                onChange={(e) => setProfile({ ...profile, carbs_goal: +e.target.value })}
              />
            </div>

            <div className="input-field-glass">
              <label>Meta Grasas (g)</label>
              <input
                type="number"
                value={profile.fats_goal}
                onChange={(e) => setProfile({ ...profile, fats_goal: +e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="save-button" disabled={saving}>
            <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>

      <style>{`
        .settings-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .view-header { margin-bottom: 1rem; }
        .view-header h1 {
          font-size: 2.2rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }
        .view-header p { color: var(--text-muted); margin-top: 0.2rem; }

        .settings-card { padding: 1.8rem; }
        .settings-card h3 {
          margin: 0 0 1.5rem 0;
          color: white;
          font-size: 1.1rem;
        }
        .form-group-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .input-field-glass {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-field-glass label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .input-field-glass input {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 0.8rem;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field-glass input:focus {
          border-color: var(--primary);
        }
        .save-button {
          margin-top: 2rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .save-button:hover { transform: scale(1.02); }
        .save-button:disabled { opacity: 0.5; }

        @media (max-width: 600px) {
          .form-group-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
