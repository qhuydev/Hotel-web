import React from "react";
import { Typography, Box } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        py: 2,
        mt: "auto"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 My App — All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
