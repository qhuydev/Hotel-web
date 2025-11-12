import React from "react";
import ListCards from "./ListCards/ListCard";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function BoardContent() {
  return (
    <Box sx={{ marginTop: "40px", marginLeft: "20px" }}>
      {/* Tiêu đề */}
      <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center', marginBottom: '30px'}}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: "4px",
        }}
      >
        Danh sách phòng khách sạn
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: "#666",
          marginBottom: "20px",
        }}
      >
        Chọn phòng phù hợp với nhu cầu nghỉ dưỡng của bạn
      </Typography>
      </Box>
      {/* Danh sách phòng */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        <ListCards />
      </Box>
    </Box>
  );
}

export default BoardContent;
