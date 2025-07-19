import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import HomeIcon from '@mui/icons-material/Home';

const navItems = [
  { label: "Accueil", path: "/", icon: <HomeIcon fontSize="small" /> },
  { label: "Production d'eau", path: "/production", icon: <WaterDropIcon fontSize="small" /> },
  { label: "Besoins & Coût", path: "/needs", icon: <AgricultureIcon fontSize="small" /> }
];

export default function Navbar() {
  const location = useLocation();
  return (
    <AppBar position="static" sx={{ mb: 4, background: "#274472" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}           // <--- Rends le Typography cliquable !
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          Plateforme Irrigation IA
        </Typography>
        <Box>
          {navItems.map(item => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color="inherit"
              startIcon={item.icon}
              sx={{
                mx: 1,
                borderBottom: location.pathname === item.path ? "2px solid #fff" : "none"
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
