import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import api from '../services/api';
import GameCard from '../components/GameCard';
import Loading from '../components/Loading';

export default function Results() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      navigate('/');
      return;
    }

    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/analyze/${encodeURIComponent(query)}`);
        
        if (response.data && response.data.recommendations) {
          setGames(response.data.recommendations);
        } else {
          setGames([]);
        }
      } catch (err) {
        console.error("Detalhes do Erro:", err);
        console.error("Resposta do Backend:", err.response);
        
        setError(`Ocorreu um erro: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [query, navigate]);

  return (
    <div className="flex-1 flex flex-col container mx-auto px-4 py-8 max-w-7xl relative">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group self-start"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para a busca
      </button>

      <div className="mb-8 items-center flex justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">
          Resultados para: <span className="text-indigo-400">"{query}"</span>
        </h2>
      </div>

      {loading && (
        <div className="my-auto flex flex-col items-center justify-center flex-1">
           <Loading message={`Analisando preços para ${query}...`} />
        </div>
      )}

      {!loading && error && (
        <div className="glass-panel p-8 rounded-2xl border-red-500/20 bg-red-500/5 text-center flex flex-col items-center justify-center max-w-2xl mx-auto mt-10">
          <AlertCircle className="text-red-400 w-12 h-12 mb-4" />
          <h3 className="text-lg font-bold text-slate-100 mb-2">Erro na Análise</h3>
          <p className="text-slate-400">{error}</p>
        </div>
      )}

      {!loading && !error && games.length === 0 && (
        <div className="text-center p-12 text-slate-400 max-w-md mx-auto">
          Nenhuma oferta encontrada para este jogo no momento. Tente buscar por outro título.
        </div>
      )}

      {!loading && !error && games.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <div key={`${game.dealID || index}`} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
