import { WeightLogForm } from '../forms/WeightLogForm'
import { FoodLogForm } from '../forms/FoodLogForm'

export const LogView = () => {
  return (
    <div className="log-view">
      <header className="view-header">
        <h1>Nuevo Registro</h1>
        <p>Añade tu peso o comidas del día</p>
      </header>
      
      <div className="forms-container">
        <WeightLogForm />
        <FoodLogForm />
      </div>

      <style>{`
        .log-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .view-header {
          margin-bottom: 0.5rem;
        }
        .view-header h1 {
          font-size: 2.2rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }
        .view-header p {
          color: var(--text-muted);
          margin-top: 0.2rem;
        }
        .forms-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </div>
  )
}
