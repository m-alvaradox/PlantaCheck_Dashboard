import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  weatherContext: string; // Ej: "Temperatura: 30°C, Humedad: 60%, etc."
};

const CohereAssistant: React.FC<Props> = ({ weatherContext }) => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);

  const COOLDOWN_MS = 15000; // 15 segundos entre consultas
  const API_KEY = 'lUK9snLLdnQnCJjLrVPbNnSLbE1D4TKT5eBnEhaF';

  const handleSend = async () => {
    setError('');
    const now = Date.now();
    if (lastRequestTime && now - lastRequestTime < COOLDOWN_MS) {
      setError('Espera unos segundos antes de hacer otra consulta.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'https://api.cohere.ai/v1/chat',
        {
          message: userInput,
          connectors: [],
          chat_history: [],
          preamble: `Eres un asistente experto en condiciones climáticas para cultivos. Usa el siguiente contexto del clima actual: ${weatherContext}`,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResponse(res.data.text);
      setLastRequestTime(now);
    } catch (err: any) {
      console.error(err);
      setError('Error al contactar a Cohere. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Asistente Climático 🌤️</h3>
      <textarea
        placeholder="¿Qué deseas saber sobre el clima para tus plantas?"
        rows={3}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Consultando...' : 'Enviar'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#eef' }}>
          <strong>Respuesta:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default CohereAssistant;
