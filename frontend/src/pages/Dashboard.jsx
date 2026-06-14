import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/api/dashboard/student')
        setData(res.data)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }
    load()
  }, [])

  return (
    <div className="container">
      <h1>EduPrime - Dashboard</h1>
      {!data && <p>Carregando...</p>}
      {data && (
        <div>
          <p>Cursos matriculados: {data.cursosMatriculados}</p>
          <p>Assinatura: {data.assinatura}</p>
          <h3>Progresso</h3>
          <ul>
            {data.progresso.map((p) => (
              <li key={p.curso}>{p.curso}: {Math.round(p.progresso)}%</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
