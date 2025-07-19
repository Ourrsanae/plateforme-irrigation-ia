from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

# --- CORS (pour React frontend) ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change en production !
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Charger tables besoins/techniques
df_tech = pd.read_csv("production_cout_techniques.csv")
df_besoins = pd.read_csv("besoins_eau_cultures.csv")

# Charger modèles ML
MODELS = {
    "Fog harvesting": joblib.load("modele_fog.pkl"),
    "Hydropanel": joblib.load("modele_hydropanel.pkl"),
    "Agri-PV": joblib.load("modele_agripv.pkl"),
    "Condensation passive": joblib.load("modele_condensation.pkl")
}
FEATURES = [
    "ALLSKY_SFC_SW_DWN", "T2M_MAX", "T2M_MIN", "RH2M", "PRECTOTCORR", "WS2M"
]

class MeteoInput(BaseModel):
    ALLSKY_SFC_SW_DWN: float
    T2M_MAX: float
    T2M_MIN: float
    RH2M: float
    PRECTOTCORR: float
    WS2M: float
    besoin_L_jour: Optional[float] = None  # nouveau champ facultatif

class BesoinInput(BaseModel):
    culture: str
    surface_ha: float

@app.post("/predict_production")
def predict_production(data: MeteoInput):
    df = pd.DataFrame([data.dict()])
    results = {}
    besoins = data.besoin_L_jour
    for technique, model in MODELS.items():
        pred = model.predict(df[FEATURES])[0]  # production L/jour pour 1 module
        try:
            prod_unite = float(df_tech[df_tech["Technique"] == technique]["Production_L_jour_unite"].values[0])
        except:
            prod_unite = None
        result = {"production_L_jour": round(pred, 2)}
        # calculer le nombre d'unités seulement si besoin précisé et prod_unite existe
        if besoins and prod_unite and prod_unite > 0:
            n_unites = np.ceil(besoins / pred) if pred > 0 else None
            result["nombre_unites"] = int(n_unites) if n_unites else None
        results[technique] = result
    return {"resultats": results}

@app.post("/estimate_needs")
def estimate_needs(data: BesoinInput):
    besoin_ha = df_besoins[df_besoins["Culture"].str.lower() == data.culture.lower()]["Besoins_L_jour_ha"].values[0]
    besoin_total = besoin_ha * data.surface_ha
    results = []
    for idx, row in df_tech.iterrows():
        nb_unites = np.ceil(besoin_total / row["Production_L_jour_unite"])
        cout_total = nb_unites * row["Cout_unitaire_EUR"]
        results.append({
            "Technique": row["Technique"],
            "Production_unite_L_jour": row["Production_L_jour_unite"],
            "Nombre_unites": int(nb_unites),
            "Cout_total_EUR": cout_total
        })
    return {
        "besoin_total_L_jour": besoin_total,
        "synthese": results
    }
@app.get("/cultures")
def get_cultures():
    return list(df_besoins["Culture"].unique())
