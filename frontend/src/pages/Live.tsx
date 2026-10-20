import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Turbine, History } from '../types';
import Chart from '../components/Chart';

export default function Live() {
  const [ts, setTs] = useState<Turbine[]>([]);
  const [h, setH] = useState<History[]>([]);
  const [running, setRunning] = useState(false);
  const [ab, setAb] = useState(false);

  async function load() {
    try {
      const [a, b, s] = await Promise.all([
        api.get('/api/turbines'),
        api.get('/api/turbines/history?limit=50'),
        api.get('/api/simulator/status')
      ]);

      setTs(a.data);
      setH(b.data);
      setRunning(s.data.running);
    } catch (error) {
      console.error('Failed to load live monitoring data:', error);
    }
  }

  useEffect(() => {
    load();

    const i = setInterval(load, 5000);

    return () => clearInterval(i);
  }, []);

  async function act(path: string) {
    try {
      await api.post(path);
      await load();
    } catch (error) {
      console.error('Simulator action failed:', error);
    }
  }

  async function toggleAbnormal() {
    try {
      const newValue = !ab;

      await api.post('/api/simulator/abnormal', {
        enabled: newValue
      });

      setAb(newValue);
      await load();
    } catch (error) {
      console.error('Abnormality action failed:', error);
    }
  }

  return (
    <>
      <div className="title">
        <div>
          <h1>Live Monitoring</h1>
          <p>Backend-driven simulated sensors · updates every 5 seconds</p>
        </div>

        <div>
          <button
            onClick={() =>
              act(
                running
                  ? '/api/simulator/stop'
                  : '/api/simulator/start'
              )
            }
          >
            {running ? 'Stop Simulator' : 'Start Simulator'}
          </button>

          <button onClick={toggleAbnormal}>
            {ab ? 'Normal Data' : 'Trigger Abnormality'}
          </button>
        </div>
      </div>

      {ts.map((t) => (
        <div className="panel" key={t.id}>
          <div className="row">
            <h3>{t.name}</h3>
            <b>
              {t.currentHealth}/100 · {t.currentRisk}
            </b>
          </div>

          <div className="metrics big">
            <span>
              Power <b>{t.powerOutput} MW</b>
            </span>

            <span>
              Temp <b>{t.temperature}°C</b>
            </span>

            <span>
              Vibration <b>{t.vibration}</b>
            </span>

            <span>
              RPM <b>{t.rpm}</b>
            </span>

            <span>
              Wind <b>{t.windSpeed} m/s</b>
            </span>

            <span>
              Gearbox <b>{t.gearboxTemperature}°C</b>
            </span>
          </div>
        </div>
      ))}

      <Chart
        data={h}
        field="powerOutput"
        title="Live Power History"
      />
    </>
  );
}