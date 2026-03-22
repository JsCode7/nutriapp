import { useState, useEffect } from 'react'
import { User, TrendingUp, Flame, Plus, Activity } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import tipsData from '../../data/tips.json'

interface DashboardProps {
  onNavigate: (view: string) => void
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [loading, setLoading] = useState(true)
  const [dailyTips, setDailyTips] = useState<any[]>([])
  const [metrics, setMetrics] = useState({
    weight: 0,
    fat: 0,
    bmi: 0,
    kcalConsumed: 0,
    proteinConsumed: 0,
    carbsConsumed: 0,
    fatsConsumed: 0,
    kcalGoal: 2000,
    proteinGoal: 150,
    carbsGoal: 250,
    fatsGoal: 70,
    height: 175
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    // 1. Fetch Profile/Goals
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', '00000000-0000-0000-0000-000000000000')
      .single()

    // 2. Fetch Latest Weight
    const { data: weightLogs } = await supabase
      .from('weight_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)

    // 3. Fetch Today's Food
    const today = new Date().toISOString().split('T')[0]
    const { data: foodLogs } = await supabase
      .from('food_logs')
      .select('*')
      .gte('created_at', today)

    const kcalSum = foodLogs?.reduce((acc, log) => acc + log.kcal, 0) || 0
    const proteinSum = foodLogs?.reduce((acc, log) => acc + log.protein, 0) || 0
    const carbsSum = foodLogs?.reduce((acc, log) => acc + log.carbs, 0) || 0
    const fatsSum = foodLogs?.reduce((acc, log) => acc + (log.fats || 0), 0) || 0

    const latestWeight = weightLogs?.[0]?.weight || 0
    const heightM = (profile?.height || 175) / 100

    setMetrics({
      weight: latestWeight,
      fat: weightLogs?.[0]?.fat_percent || 0,
      bmi: latestWeight > 0 ? parseFloat((latestWeight / (heightM * heightM)).toFixed(1)) : 0,
      kcalConsumed: kcalSum,
      proteinConsumed: proteinSum,
      carbsConsumed: carbsSum,
      fatsConsumed: fatsSum,
      kcalGoal: profile?.kcal_goal || 2000,
      proteinGoal: profile?.protein_goal || 150,
      carbsGoal: profile?.carbs_goal || 250,
      fatsGoal: profile?.fats_goal || 70,
      height: profile?.height || 175
    })

    // Randomize 3 tips based on date
    const dateSeed = new Date().toDateString()
    const seededRandom = (seed: string) => {
      let hash = 0
      for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash)
      return (index: number) => (Math.abs(Math.sin(hash + index)) * tipsData.length) | 0
    }
    const getRandom = seededRandom(dateSeed)
    const selected = new Set<number>()
    while(selected.size < 3) selected.add(getRandom(selected.size))
    setDailyTips(Array.from(selected).map(i => tipsData[i]))

    setLoading(false)
  }

  const kcalPercent = Math.min((metrics.kcalConsumed / metrics.kcalGoal) * 100, 100)

  if (loading) return <div className="loading-screen">Cargando tu progreso...</div>

  return (
    <div className="dashboard-v2">
      <header className="dash-header">
        <div className="user-info">
          <h1>Hola, Usuario</h1>
        </div>
        <div className="header-actions">
          <div className="profile-badge">
            <User size={24} />
          </div>
        </div>
      </header>

      <section className="metrics-grid">
        <div className="premium-card metric-card">
          <div className="metric-header">
            <span>Peso Actual</span>
            <TrendingUp size={16} color="#10b981" />
          </div>
          <div className="metric-value">
            {metrics.weight} <span className="unit">kg</span>
          </div>
        </div>

        <div className="premium-card metric-card">
          <div className="metric-header">
            <span>IMC</span>
          </div>
          <div className="metric-value">{metrics.bmi}</div>
          <div className={`bmi-status ${metrics.bmi < 18.5 ? 'low' : metrics.bmi < 25 ? 'normal' : 'high'}`}>
            {metrics.bmi < 18.5 ? 'Bajo' : metrics.bmi < 25 ? 'Normal' : 'Sobrepeso'}
          </div>
        </div>

        <div className="premium-card metric-card">
          <div className="metric-header">
            <span>% Grasa</span>
          </div>
          <div className="metric-value">
            {metrics.fat} <span className="unit">%</span>
          </div>
          <div className="fat-sparkline">
            <Activity size={16} strokeWidth={1} />
          </div>
        </div>
      </section>

      <section className="consumption-section">
        <div className="premium-card main-consumption-card">
          <div className="card-header">
            <h3>Consumo Diario</h3>
            <Flame size={20} color="#f59e0b" />
          </div>
          
          <div className="circular-progress-container">
            <div className="progress-outer" style={{ background: `conic-gradient(var(--primary) ${kcalPercent}%, rgba(255,255,255,0.05) 0)` }}>
              <div className="progress-inner">
                <div className="kcal-info">
                  <span className="current">{metrics.kcalConsumed}</span>
                  <span className="total">/ {metrics.kcalGoal} kcal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="macros-horizontal">
            <div className="macro-bar-item">
              <div className="macro-info-row">
                <span>Proteína</span>
                <span>{metrics.proteinConsumed}/{metrics.proteinGoal}g</span>
              </div>
              <div className="macro-progress-bg">
                <div className="macro-progress-fill protein" style={{ width: `${Math.min((metrics.proteinConsumed/metrics.proteinGoal)*100, 100)}%` }}></div>
              </div>
            </div>

            <div className="macro-bar-item">
              <div className="macro-info-row">
                <span>Carbs</span>
                <span>{metrics.carbsConsumed}/{metrics.carbsGoal}g</span>
              </div>
              <div className="macro-progress-bg">
                <div className="macro-progress-fill carbs" style={{ width: `${Math.min((metrics.carbsConsumed/metrics.carbsGoal)*100, 100)}%` }}></div>
              </div>
            </div>

            <div className="macro-bar-item">
              <div className="macro-info-row">
                <span>Grasas</span>
                <span>{metrics.fatsConsumed}/{metrics.fatsGoal}g</span>
              </div>
              <div className="macro-progress-bg">
                <div className="macro-progress-fill fats" style={{ width: `${Math.min((metrics.fatsConsumed/metrics.fatsGoal)*100, 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recommendations-row">
        <h3>Consejos del Día</h3>
        <div className="tips-container">
          {dailyTips.map((tip, i) => (
            <div key={i} className="premium-card tip-card">
              <p>{tip.text}</p>
              <a href={tip.link} target="_blank" rel="noopener noreferrer">Más info</a>
            </div>
          ))}
        </div>
      </section>

      <button className="fab-button" onClick={() => onNavigate('log')}>
        <Plus size={32} />
      </button>

      <style>{`
        .dashboard-v2 {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 2rem;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .dash-header h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin: 0;
          color: white;
        }
        .profile-badge {
          width: 3rem;
          height: 3rem;
          background: var(--bg-glass);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          color: white;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .metric-card {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 1rem;
          background: var(--bg-glass);
        }
        .metric-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
        }
        .metric-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
        }
        .unit {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--text-muted);
        }
        .bmi-status {
          font-size: 0.65rem;
          padding: 0.15rem 0.5rem;
          border-radius: 20px;
          align-self: flex-start;
          font-weight: 700;
        }
        .bmi-status.normal { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .bmi-status.low { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .bmi-status.high { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

        .main-consumption-card {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.8rem;
        }
        .card-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
        }

        .circular-progress-container {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .progress-outer {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.5s ease;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
        }
        .progress-inner {
          width: 174px;
          height: 174px;
          background: #080c16;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kcal-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .kcal-info .current {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          line-height: 1;
        }
        .kcal-info .total {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .macros-horizontal {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .macro-info-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.4rem;
          color: white;
          font-weight: 500;
        }
        .macro-progress-bg {
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
          overflow: hidden;
        }
        .macro-progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        .macro-progress-fill.protein { background: var(--accent-blue); box-shadow: 0 0 8px var(--accent-blue); }
        .macro-progress-fill.carbs { background: var(--accent-cyan); box-shadow: 0 0 8px var(--accent-cyan); }
        .macro-progress-fill.fats { background: var(--accent-orange); box-shadow: 0 0 8px var(--accent-orange); }

        .fab-button {
          position: fixed;
          bottom: 7rem;
          right: 1.5rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .fab-button:hover { transform: scale(1.1); background: rgba(255, 255, 255, 0.15); }

        .loading-screen {
          height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .recommendations-row {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .recommendations-row h3 {
          margin: 0;
          font-size: 1.1rem;
          color: white;
        }
        .tips-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .tip-card {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          font-size: 0.85rem;
          line-height: 1.4;
          background: rgba(255,255,255,0.03);
        }
        .tip-card p { margin: 0; color: white; }
        .tip-card a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8rem;
        }

        @media (max-width: 600px) {
          .metrics-grid { grid-template-columns: 1fr 1fr; }
          .metrics-grid > :last-child { grid-column: span 2; }
          .dash-header h1 { font-size: 1.8rem; }
          .tips-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
