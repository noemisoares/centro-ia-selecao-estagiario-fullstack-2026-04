import httpx
from typing import List, Dict

HEADERS = {
    "User-Agent": "GamePriceAI/1.0 (centro-ia-selecao; student-project)"
}

class CheapSharkService:
    BASE_URL = "https://www.cheapshark.com/api/1.0"

    async def fetch_deals(self, title: str) -> List[Dict]:
        async with httpx.AsyncClient(headers=HEADERS) as client:
            response = await client.get(
                f"{self.BASE_URL}/deals",
                params={"title": title, "pageSize": 10}
            )
            response.raise_for_status()
            data = response.json()
            # retorna uma lista
            if not isinstance(data, list):
                return []
            # retorna o link de compra
            for deal in data:
                deal["deal_url"] = f"https://www.cheapshark.com/redirect?dealID={deal['dealID']}"
            return data