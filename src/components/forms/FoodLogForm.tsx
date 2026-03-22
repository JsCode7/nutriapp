import { useState } from 'react'
import { Utensils } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export const FoodLogForm = () => {
  const [kcal, setKcal] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fats, setFats] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('food_logs')
        .insert([{ 
          kcal: parseInt(kcal), 
          protein: parseFloat(protein),
          carbs: parseFloat(carbs || '0'),
          fats: parseFloat(fats || '0'),
          created_at: new Date(date).toISOString()
        }])

      if (error) throw error

      alert('Comida registrada!')
      setKcal('')
      setProtein('')
      setCarbs('')
      setFats('')
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="log-form premium-card" onSubmit={handleSubmit}>
      <h3>Registrar Comida</h3>
      <div className="form-group">
        <label>Fecha</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Calorías (kcal)</label>
        <input 
          type="number" 
          value={kcal} 
          onChange={(e) => setKcal(e.target.value)} 
          placeholder="500" 
          required 
        />
      </div>
      <div className="form-group">
        <label>Proteínas (g)</label>
        <input 
          type="number" 
          value={protein} 
          onChange={(e) => setProtein(e.target.value)} 
          placeholder="30" 
          required 
        />
      </div>
      <div className="macro-inputs-small">
        <div className="form-group">
          <label>Carbs (g)</label>
          <input 
            type="number" 
            value={carbs} 
            onChange={(e) => setCarbs(e.target.value)} 
            placeholder="50" 
          />
        </div>
        <div className="form-group">
          <label>Grasas (g)</label>
          <input 
            type="number" 
            value={fats} 
            onChange={(e) => setFats(e.target.value)} 
            placeholder="15" 
          />
        </div>
      </div>
      <button type="submit" className="submit-btn" style={{ background: '#3b82f6' }} disabled={loading}>
        <Utensils size={18} /> {loading ? 'Enviando...' : 'Registrar'}
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
          width: 100%;
          transition: border-color 0.2s;
        }
        .form-group input:focus {
          border-color: var(--primary);
        }
        .macro-inputs-small {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .submit-btn {
          margin-top: 0.5rem;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
      `}</style>
    </form>
  )
}
