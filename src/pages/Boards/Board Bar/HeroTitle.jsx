import React from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function HeroTitle({ rating, setRating }) {
  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        Huy Hotel
      </Typography>
      <Typography variant="h6">Sang trọng • Tiện nghi • Đẳng cấp</Typography>
      <Rating
        name="rating-controlled"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
      />
    </>
  );
}
