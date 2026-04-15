from pydantic import BaseModel
from typing import List, Optional

class DealResponse(BaseModel):
    model_config = {"extra": "ignore"}

    internalName: str
    title: str
    dealID: str
    deal_url: str
    salePrice: str
    normalPrice: str
    savings: str
    thumb: str
    cluster: Optional[int] = None
    cluster_label: Optional[str] = None

class AnalysisResult(BaseModel):
    game: str
    recommendations: List[DealResponse]