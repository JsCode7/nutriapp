import { useState } from 'react'
import { Utensils } from 'lucide-react'

export const FoodLogForm = () => {
  const [kcal, setKcal] = useState('')
  const [protein, setProtein] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging food:', { kcal, protein, date: new Date() })
    setKcal('')
    setProtein('')
  }

  return (
    <form className="log-form premium-card" onSubmit={handleSubmit}>
      <h3>Registrar Comida</h3>
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
      <button type="submit" className="submit-btn" style={{ background: '#3b82f6' }}>
        <Utensils size={18} /> Registrar
      </button>

      <style>{`
        .log-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
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
          background: var(--bg-dark);
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 0.8rem;
          border-radius: 8px;
          outline: none;
        }
        .form-group input:focus {
          border-color: #3b82f6;
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
