import { useEffect, useState } from 'react'
import './App.css'

type WeatherForecast = {
    date: string
    temperatureC: number
    temperatureF: number
    summary: string
}

function App() {
    const [forecasts, setForecasts] = useState<WeatherForecast[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/WeatherForecast')
            .then(async response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                return response.json() as Promise<WeatherForecast[]>
            })
            .then(data => setForecasts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Загрузка данных о погоде...</p>
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>🌤️ Прогноз погоды</h1>
            <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Темп. (°C)</th>
                        <th>Темп. (°F)</th>
                        <th>Описание</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(item => (
                        <tr key={item.date}>
                            <td>{item.date}</td>
                            <td>{item.temperatureC}</td>
                            <td>{item.temperatureF}</td>
                            <td>{item.summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default App