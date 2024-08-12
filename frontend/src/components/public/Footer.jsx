import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ marginTop: "10px" }}>
      <Typography align="center" color="primary" variant="body2" gutterBottom>
        This is a project I made to practice react. Check out the code
        here:&nbsp;
        <Link href="https://github.com/andrewrn0">
          https://github.com/andrewrn0
        </Link>
      </Typography>
      <Typography
        align="center"
        color="primary"
        sx={{
          width: "100%",
        }}
      >
        Andrew Noble | Copyright ⓒ {year}
      </Typography>
    </footer>
  );
}
