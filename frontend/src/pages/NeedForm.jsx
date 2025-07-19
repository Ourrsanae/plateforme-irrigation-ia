import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer
} from "@mui/material";

export default function NeedForm() {
  const [cultures, setCultures] = useState([]);
  const [culture, setCulture] = useState("");
  const [surface_ha, setSurfaceHa] = useState("1");
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/cultures").then(res => {
      setCultures(res.data);
      if (res.data.length > 0) setCulture(res.data[0]);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    const response = await axios.post("http://localhost:8000/estimate_needs", {
      culture,
      surface_ha: parseFloat(surface_ha),
    });
    setResult(response.data);
  };

  return (
    <Box sx={{ maxWidth: 550, mx: "auto", mt: 7 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
          Simulateur de techniques low-cost pour l'irrigation
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormControl fullWidth margin="normal">
            <InputLabel id="culture-label">Choisir la culture</InputLabel>
            <Select
              labelId="culture-label"
              value={culture}
              label="Choisir la culture"
              onChange={e => setCulture(e.target.value)}
              required
            >
              {cultures.map((c, i) => (
                <MenuItem key={i} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Surface à irriguer (ha)"
            type="number"
            step="any"
            min="0"
            value={surface_ha}
            onChange={e => setSurfaceHa(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Calculer
          </Button>
        </form>
        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">
              Besoins totaux : {result.besoin_total_L_jour} L/jour
            </Typography>
            <TableContainer sx={{ mt: 2, borderRadius: 2, background: "#222" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Technique</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Unités nécessaires</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Coût total (€)</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Prod. unitaire (L/jour)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.synthese.map(r => (
                    <TableRow key={r.Technique}>
                      <TableCell sx={{ color: "#fff" }}>{r.Technique}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{r.Nombre_unites}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {Math.round(r.Cout_total_EUR).toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>{r.Production_unite_L_jour}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
