import { useState } from 'react'
import { Plus } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export const WeightLogForm = () => {
  const [weight, setWeight] = useState('')
  const [fat, setFat] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('weight_logs')
        .insert([{ 
          weight: parseFloat(weight), 
          fat_percent: fat ? parseFloat(fat) : null 
        }])

      if (error) throw error
      
      alert('Registro guardado!')
      setWeight('')
      setFat('')
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="log-form premium-card" onSubmit={handleSubmit}>
      <h3>Registrar Peso</h3>
      <div className="form-group">
        <label>Peso (kg)</label>
        <input 
          type="number" 
          step="0.1" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
          placeholder="75.0"
          required 
        />
      </div>
      <div className="form-group">
        <label>% Grasa (opcional)</label>
        <input 
          type="number" 
          step="0.1" 
          value={fat} 
          onChange={(e) => setFat(e.target.value)} 
          placeholder="18.5"
        />
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        <Plus size={18} /> {loading ? 'Enviando...' : 'Guardar Registro'}
      </button>

      <style>{`
        .log-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .log-form h3 {
          color: white;
          margin: 0;
          font-size: 1.2rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .form-group input {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          color: white;
          padding: 0.8rem;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus {
          border-color: var(--primary);
        }
        .submit-btn {
          margin-top: 0.5rem;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .submit-btn:hover {
          background: var(--primary-hover);
        }
      `}</style>
    </form>
  )
}
