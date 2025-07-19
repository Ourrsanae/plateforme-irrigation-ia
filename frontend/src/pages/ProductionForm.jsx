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
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

export default function ProductionForm() {
  const [form, setForm] = useState({
    ALLSKY_SFC_SW_DWN: "",
    T2M_MAX: "",
    T2M_MIN: "",
    RH2M: "",
    PRECTOTCORR: "",
    WS2M: "",
  });
  const [result, setResult] = useState(null);

  const labels = {
    ALLSKY_SFC_SW_DWN: "Irradiance solaire (kWh/m²/jour)",
    T2M_MAX: "Température maximale (°C)",
    T2M_MIN: "Température minimale (°C)",
    RH2M: "Humidité relative (%)",
    PRECTOTCORR: "Précipitation totale (mm/jour)",
    WS2M: "Vitesse du vent à 2m (m/s)",
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8000/predict_production", {
      ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, parseFloat(v)])),
    });
    setResult(response.data.prediction_L_par_jour);
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 7 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
          Estimation de la production d’eau <br /> (par technique)
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
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={500}>
              Résultats (L/jour) :
            </Typography>
            <List>
              {Object.entries(result).map(([tech, value]) => (
                <ListItem key={tech} disablePadding>
                  <ListItemText
                    primary={`${tech} : ${value} L/jour`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
