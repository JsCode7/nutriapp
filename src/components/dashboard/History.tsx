import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { supabase } from '../../lib/supabase'

export const History = () => {
  const [logs, setLogs] = useState<any[]>([])
  const [foodHistory, setFoodHistory] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    fetchHistory()
    fetchFoodHistory()
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('height')
      .eq('id', '00000000-0000-0000-0000-000000000000')
      .maybeSingle()
    if (data) setProfile(data)
  }

  const fetchFoodHistory = async () => {
    const { data } = await supabase
      .from('food_logs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) {
      const grouped = data.reduce((acc: any, log: any) => {
        const date = new Date(log.created_at).toLocaleDateString()
        if (!acc[date]) {
          acc[date] = { date, kcal: 0, protein: 0, carbs: 0, fats: 0 }
        }
        acc[date].kcal += log.kcal
        acc[date].protein += log.protein
        acc[date].carbs += log.carbs
        acc[date].fats += log.fats || 0
        return acc
      }, {})
      setFoodHistory(Object.values(grouped))
    }
  }

  const fetchHistory = async () => {
    const { data } = await supabase
      .from('weight_logs')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (data) {
      setLogs(data.map(log => ({
        ...log,
        date: new Date(log.created_at).toLocaleDateString()
      })))
    }
  }

  const calculateBMI = (weight: number) => {
    if (!profile?.height || weight <= 0) return '0.0'
    const heightM = profile.height / 100
    return (weight / (heightM * heightM)).toFixed(1)
  }

  return (
    <div className="history-view">
      <header className="view-header">
        <h1>Historial</h1>
        <p>Progreso de peso y % de grasa</p>
      </header>

      <div className="premium-card chart-card">
        <h3>Evolución del Peso</h3>
        <div style={{ width: '100%', height: 300, marginTop: '1rem' }}>
          <ResponsiveContainer>
            <LineChart data={logs}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--text-muted)" 
                fontSize={12}
                tickFormatter={(str) => {
                  const parts = str.split('/')
                  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : str
                }}
              />
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={12} 
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(13, 18, 31, 0.8)', 
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="var(--primary)" 
                strokeWidth={3}
                dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="premium-card logs-card">
        <h3>Historial de Consumo Diario</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Kcal</th>
                <th>Prot (g)</th>
                <th>Carbs (g)</th>
                <th>Grasas (g)</th>
              </tr>
            </thead>
            <tbody>
              {foodHistory.map((day, idx) => (
                <tr key={idx}>
                  <td>{day.date}</td>
                  <td>{day.kcal}</td>
                  <td>{day.protein}</td>
                  <td>{day.carbs}</td>
                  <td>{day.fats.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="premium-card logs-card">
        <h3>Registros de Peso</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Peso</th>
                <th>Grasa</th>
                <th>IMC</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice().reverse().map((log) => (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td>{log.weight} kg</td>
                  <td>{log.fat_percent}%</td>
                  <td>{calculateBMI(log.weight)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .history-view {
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
        
        .chart-card { padding: 1.5rem; }
        .chart-card h3, .logs-card h3 {
          margin: 0;
          font-size: 1.1rem;
          color: white;
        }
        .table-responsive {
          overflow-x: auto;
          margin-top: 1rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          color: white;
        }
        th {
          text-align: left;
          padding: 1rem;
          color: var(--text-muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          border-bottom: 1px solid var(--glass-border);
        }
        td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.95rem;
        }
        tr:last-child td {
          border-bottom: none;
        }
      `}</style>
    </div>
  )
}
