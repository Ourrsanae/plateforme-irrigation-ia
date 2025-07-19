// import React, { useState } from "react";
// import axios from "axios";

// export default function ProductionForm() {
//   const [form, setForm] = useState({
//     ALLSKY_SFC_SW_DWN: "",
//     T2M_MAX: "",
//     T2M_MIN: "",
//     RH2M: "",
//     PRECTOTCORR: "",
//     WS2M: "",
//   });
//   const [result, setResult] = useState(null);

//   const labels = {
//     ALLSKY_SFC_SW_DWN: "Irradiance solaire (kWh/m²/jour)",
//     T2M_MAX: "Température maximale (°C)",
//     T2M_MIN: "Température minimale (°C)",
//     RH2M: "Humidité relative (%)",
//     PRECTOTCORR: "Précipitation totale (mm/jour)",
//     WS2M: "Vitesse du vent à 2m (m/s)",
//   };

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.post("http://localhost:8000/predict_production", {
//       ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, parseFloat(v)])),
//     });
//     setResult(response.data.prediction_L_par_jour);
//   };

//   return (
//     <div style={{ maxWidth: 450, margin: "auto", marginTop: 50 }}>
//       <h2>Estimation de la production d’eau (par technique)</h2>
//       <form onSubmit={handleSubmit}>
//         {Object.keys(form).map((k) => (
//           <div key={k} style={{ marginBottom: 12 }}>
//             <label>{labels[k]} :</label>
//             <input
//               type="number"
//               name={k}
//               step="any"
//               value={form[k]}
//               onChange={handleChange}
//               required
//               style={{ width: "100%", padding: 6 }}
//             />
//           </div>
//         ))}
//         <button type="submit" style={{ marginTop: 20, width: "100%" }}>Prédire</button>
//       </form>
//       {result && (
//         <div style={{ marginTop: 20 }}>
//           <b>Résultats (L/jour) :</b>
//           <ul>
//             {Object.entries(result).map(([tech, value]) => (
//               <li key={tech}>{tech}: {value} L/jour</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import DashboardResults from "./DashboardResults"; // adapte le chemin si besoin

export default function ProductionForm() {
  const [form, setForm] = useState({
  ALLSKY_SFC_SW_DWN: "",
  T2M_MAX: "",
  T2M_MIN: "",
  RH2M: "",
  PRECTOTCORR: "",
  WS2M: "",
  besoin_L_jour: "", // <--- nouveau champ
});
const [result, setResult] = useState(null);

const labels = {
  ALLSKY_SFC_SW_DWN: "Irradiance solaire (kWh/m²/jour)",
  T2M_MAX: "Température maximale (°C)",
  T2M_MIN: "Température minimale (°C)",
  RH2M: "Humidité relative (%)",
  PRECTOTCORR: "Précipitation totale (mm/jour)",
  WS2M: "Vitesse du vent à 2m (m/s)",
  besoin_L_jour: "Besoins en eau totale (L/jour)", // <--- label pour le champ
};


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await axios.post("http://localhost:8000/predict_production", {
    ...Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, parseFloat(v)])
    ),
  });
  setResult(response.data.resultats);
};


  return (
    <Box sx={{
        maxWidth: 1000,           // Largeur plus grande
        mx: "auto",
        mt: 7,
        mb: 7,
        bgcolor: "#f5f7fa",      // Couleur de fond douce
        borderRadius: 5,         // Coins plus arrondis
        boxShadow: 6,            // Ombre portée plus visible
        p: 5,                    // Padding plus large
        border: "2px solid #a5d6a7", // Bordure verte claire
      }}
    >

      <Paper elevation={0}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          p: 0,}}>
        <Typography variant="h4"
            align="center"
            fontWeight={700}
            gutterBottom
            color="primary"
            sx={{ mb: 3, letterSpacing: 1 }}>
          Estimation de la production d’eau <br /> par technique
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          {Object.keys(form).map((k) => (
            <TextField
              key={k}
              label={labels[k]}
              name={k}
              type="number"
              variant="outlined"
              value={form[k]}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              inputProps={{ step: "any" }}
            />
          ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Prédire
          </Button>
        </form>
        {result && (
                <>
                  {/* Dashboard/chart en premier */}
                  <Box sx={{ mt: 4 }}>
                    <DashboardResults results={result} />
                  </Box>
                  
                  {/* Résultats écrits ensuite */}
                          {/* <Box
                            sx={{
                              mt: 5,
                              bgcolor: "#e3f2fd",
                              borderRadius: 3,
                              p: 3,
                              boxShadow: 2,
                              border: "1px solid #90caf9",
                            }}
                          >
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              color="#1565c0"
                              sx={{ mb: 1 }}
                            >
                              Résultats :
                            </Typography> */}

                    {/* <List>
            {Object.entries(result).map(([tech, val]) => (
              <ListItem key={tech} disablePadding>
                <ListItemText
                  primary={
                    <span>
                      <span style={{ color: "#051321ff", fontWeight: 500 }}>{tech}</span>
                      {`: `}
                      <span style={{ color: "#388e3c" }}>
                        {val.production_L_jour} L/jour
                      </span>
                      {val.nombre_unites !== undefined && (
                        <span style={{ color: "#4a1515ff", fontWeight: 500 }}>
                          {" | Nombre d'unités : "}
                          <span style={{ color: "#c62424ff", fontWeight: 500 }}>{val.nombre_unites}</span>
                       </span>
                       
                      )}
                    </span>
                  }
                />
              </ListItem>

                      ))}
                    </List> */}
                  {/* </Box> */}
                </>
              )}


      </Paper>
    </Box>
  );
}
