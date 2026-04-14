#Interface e a implementação do k-means
from abc import ABC, abstractmethod
import numpy as np
from sklearn.cluster import KMeans
from typing import List, Dict

class PriceAnalysisStrategy(ABC):
    @abstractmethod
    def analyze(self, deals: List[Dict]) -> List[Dict]:
        pass

class KMeansStrategy(PriceAnalysisStrategy):
    def analyze(self, deals: List[Dict]) -> List[Dict]:
        if not deals:
            return []

        # features: [preço_atual, percentual_desconto]
        def safe_float(val):
            try:
                return float(val)
            except (TypeError, ValueError):
                return 0.0

        data = np.array([
            [safe_float(d.get('salePrice')), safe_float(d.get('savings'))]
            for d in deals
        ])

        # definir 3 clusters
        n_clusters = min(3, len(deals))
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        clusters = kmeans.fit_predict(data)

        # menor preço médio + maior desconto médio = HOT
        cluster_stats = {}
        for i, c in enumerate(clusters):
            if c not in cluster_stats:
                cluster_stats[c] = {'prices': [], 'savings': []}
            cluster_stats[c]['prices'].append(data[i][0])
            cluster_stats[c]['savings'].append(data[i][1])

        # pontuação: desconto alto e preço baixo = melhor
        def score(c):
            avg_price = np.mean(cluster_stats[c]['prices'])
            avg_savings = np.mean(cluster_stats[c]['savings'])
            return avg_savings - avg_price

        sorted_clusters = sorted(cluster_stats.keys(), key=score, reverse=True)
        # menos clusters distintos que o solicitado
        labels = {c: lbl for c, lbl in zip(sorted_clusters, ['HOT', 'WARM', 'COLD'])}

        for i, deal in enumerate(deals):
            deal['cluster'] = int(clusters[i])
            deal['cluster_label'] = labels.get(int(clusters[i]), 'WARM')

        return deals