import React from "react";
import { Typography } from "@mui/material";

export default function Header() {
  return (
    <header>
      <Typography
        variant="h2"
        component="h1"
        color="primary"
        align="center"
        gutterBottom
      >
        🎲🔥 Hot Dice Scoreboard 🔥🎲
      </Typography>
    </header>
  );
}
