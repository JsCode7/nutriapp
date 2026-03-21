import { WeightLogForm } from '../forms/WeightLogForm'
import { FoodLogForm } from '../forms/FoodLogForm'

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Bienvenido, Usuario</h1>
        <p>Tu resumen de hoy</p>
      </header>

      <div className="metrics-grid">
        <div className="premium-card metric">
          <h3>Peso Actual</h3>
          <div className="value">75.5 <small>kg</small></div>
          <div className="change decrease">-0.5 kg esta semana</div>
        </div>
        <div className="premium-card metric">
          <h3>IMC</h3>
          <div className="value">23.4</div>
          <div className="status success">Normal</div>
        </div>
        <div className="premium-card metric">
          <h3>% Grasa</h3>
          <div className="value">18.2 <small>%</small></div>
          <div className="target">Meta: 15%</div>
        </div>
      </div>

      <div className="tracking-section">
        <div className="forms-grid">
          <WeightLogForm />
          <FoodLogForm />
        </div>

        <div className="premium-card recommendations">
          <h3>💡 Recomendaciones del Día</h3>
          <ul className="rec-list">
            <li>Recuerda beber al menos 2.5L de agua hoy.</li>
            <li>Añade una porción de espinacas a tu próxima comida para más hierro.</li>
            <li>Prueba 15 min de tenis de mesa para mejorar tus reflejos hoy.</li>
          </ul>
        </div>

        <div className="premium-card kcal-tracker">
          <h3>Consumo de Calorías</h3>
          <div className="kcal-progress">
            <div className="progress-circle">
              <span className="current">1,450</span>
              <span className="limit">/ 2,200 kcal</span>
            </div>
            <div className="macros-breakdown">
              <div className="macro">
                <span>Proteínas</span>
                <div className="bar"><div className="fill" style={{width: '60%'}}></div></div>
                <span>90g / 150g</span>
              </div>
              <div className="macro">
                <span>Carbohidratos</span>
                <div className="bar"><div className="fill" style={{width: '45%'}}></div></div>
                <span>120g / 250g</span>
              </div>
              <div className="macro">
                <span>Grasas</span>
                <div className="bar"><div className="fill" style={{width: '30%'}}></div></div>
                <span>40g / 70g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .dashboard-header h1 {
          margin: 0;
          font-size: 2rem;
        }
        .dashboard-header p {
          color: var(--text-muted);
          margin: 0.5rem 0 0 0;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .forms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .metric .value {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0.5rem 0;
          color: var(--primary);
        }
        .metric small {
          font-size: 1rem;
          color: var(--text-muted);
        }
        .change { font-size: 0.9rem; }
        .decrease { color: var(--success); }
        .status { font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block; }
        .status.success { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        
        .kcal-progress {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          align-items: center;
          margin-top: 1rem;
        }
        .progress-circle {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 180px;
          border: 8px solid var(--border);
          border-left-color: var(--primary);
          border-radius: 50%;
        }
        .progress-circle .current { font-size: 2rem; font-weight: 700; }
        .progress-circle .limit { font-size: 0.9rem; color: var(--text-muted); }

        .macros-breakdown {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .macro {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .macro .bar {
          height: 8px;
          background: var(--border);
          border-radius: 4px;
          overflow: hidden;
        }
        .macro .fill {
          height: 100%;
          background: var(--primary);
          border-radius: 4px;
        }
        .rec-list {
          list-style: none;
          padding: 0;
          margin: 1rem 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .rec-list li {
          background: rgba(59, 130, 246, 0.1);
          padding: 0.8rem;
          border-radius: 8px;
          border-left: 4px solid var(--accent);
          font-size: 0.95rem;
        }
        @media (max-width: 768px) {
          .kcal-progress {
            grid-template-columns: 1fr;
            justify-items: center;
          }
        }
      `}</style>
    </div>
  )
}
