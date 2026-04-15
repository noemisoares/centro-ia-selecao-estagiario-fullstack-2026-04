from fastapi import APIRouter, Depends
from app.services.cheapshark import CheapSharkService
from app.core.strategy import KMeansStrategy
from app.models.schemas import AnalysisResult

router = APIRouter()

@router.get("/analyze/{game_title}", response_model=AnalysisResult)
async def analyze_game(
    game_title: str, 
    service: CheapSharkService = Depends(),
    strategy: KMeansStrategy = Depends()
):
    """
    Busca ofertas de um jogo e utiliza o K-Means para 
    classificar as melhores oportunidades.
    """
    # busca os dados
    raw_deals = await service.fetch_deals(game_title)
    
    # aplica o k-means
    analyzed_deals = strategy.analyze(raw_deals)
    
    return {
        "game": game_title,
        "recommendations": analyzed_deals
    }