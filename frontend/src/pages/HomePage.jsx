import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, minHeight: "90vh", pt: 8, display: "flex", flexDirection: "column",bgcolor: "transparent" }}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom color="common.white" >
        Plateforme intelligente d’irrigation
      </Typography>
      <Grid container spacing={4} justifyContent="center">
  <Grid item xs={12} md={5}>
    <Card
      elevation={6}
      sx={{
        borderRadius: 4,
        bgcolor: "rgba(232,245,233,0.92)",
        minHeight: 210, // <--- plus grand
        minWidth: 320,  // <--- largeur minimum
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.04)" } // Effet hover léger
      }}
    >
      <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/production")}>
        <CardContent>
          <Typography variant="h5" fontWeight={600}>
            Estimation de la production d'eau
          </Typography>
          <Typography color="text.secondary" mt={2} fontSize={17}>
            Calculer la production d’eau pour chaque technique, selon la météo du jour.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  <Grid item xs={12} md={5}>
    <Card
      elevation={6}
      sx={{
        borderRadius: 4,
        bgcolor: "rgba(227,242,253,0.92)",
        minHeight: 210,
        minWidth: 320,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.04)" }
      }}
    >
      <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/needs")}>
        <CardContent>
          <Typography variant="h5" fontWeight={600}>
            Estimation des besoins d’eau et coût
          </Typography>
          <Typography color="text.secondary" mt={2} fontSize={17}>
            Calculer les besoins d’eau, le nombre d’unités et le coût selon la culture et la surface.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
</Grid>

    </Box>
  );
}
