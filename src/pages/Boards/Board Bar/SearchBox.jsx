import React from "react";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import DatePickers from "./DatePickers";
import GuestSelector from "./GuestSelector";
import SearchButton from "./SearchButton";

export default function SearchBox({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, adults, setAdults, children, setChildren, onSearch }) {
  return (
    <Box
      sx={{
        marginTop: 1,
        bgcolor: "white",
        width: "100%",
        borderRadius: 3,
        p: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: "20px" }}>
        <LocationOnIcon sx={{ color: "blue", fontSize: 30 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
          Tìm phòng khách sạn
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
        <DatePickers
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
        />
        <GuestSelector
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
        />
        <SearchButton onClick={onSearch} />
      </Box>
    </Box>
  );
}
