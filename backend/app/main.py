from fastapi import FastAPI
from app.api.endpoints import router as api_router

app = FastAPI(
    title="GamePrice AI",
    description="Análise inteligente de preços de jogos usando K-Means",
    version="1.0.0"
)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "GamePrice AI API is running!"}