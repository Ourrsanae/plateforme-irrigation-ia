import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des modules nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardResults({ results }) {
  if (!results) return null;

  const labels = Object.keys(results);
  const productions = labels.map((k) => results[k].production_L_jour);
  const units = labels.map((k) => results[k].nombre_unites || 0);

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2, color: "#1b5e20", fontWeight: 700 }}>
       Résultats
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {labels.map((tech) => (
          <Grid item xs={12} sm={6} md={3} key={tech}>
            <Card
              elevation={6}
              sx={{
                bgcolor: "#e8f5e9",
                border: "2px solid #66bb6a",
                borderRadius: 4,
                minHeight: 120,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="#2e7d32"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  {tech}
                </Typography>
                <Typography>
                  <b>Production:</b>{" "}
                  <span style={{ color: "#1976d2" }}>
                    {results[tech].production_L_jour} L/jour
                  </span>
                </Typography>
                {"nombre_unites" in results[tech] && (
                  <Typography>
                    <b>Unités nécessaires:</b>{" "}
                    <span style={{ color: "#c62828", fontWeight: 600 }}>
                      {results[tech].nombre_unites}
                    </span>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graphique barres */}
      <div style={{ maxWidth: 900, margin: "40px auto", background: "#fff", borderRadius: 14, boxShadow: "0 0 18px #e0e0e0", padding: 20 }}>
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Production (L/jour)",
                data: productions,
                backgroundColor: "#1976d2",
                borderRadius: 5,
              },
              {
                label: "Unités nécessaires",
                data: units,
                backgroundColor: "#c62828",
                borderRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: "top" },
              title: {
                display: true,
                text: "Comparatif production et unités",
                font: { size: 18 },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                title: { display: true, text: "Technique" },
              },
              y: {
                beginAtZero: true,
                title: { display: true, text: "Valeur" },
                grid: { color: "#e0e0e0" },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
