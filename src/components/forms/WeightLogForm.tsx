import { useState } from 'react'
import { Plus } from 'lucide-react'

export const WeightLogForm = () => {
  const [weight, setWeight] = useState('')
  const [fat, setFat] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging weight:', { weight, fat, date: new Date() })
    // Reset form
    setWeight('')
    setFat('')
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
      <button type="submit" className="submit-btn">
        <Plus size={18} /> Guardar Registro
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
