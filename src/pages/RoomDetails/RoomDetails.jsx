import React from "react";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import { useParams } from "react-router-dom";

export default function RoomDetail() {
  const { id } = useParams();
  const roomId = parseInt(id, 10);

  // Dữ liệu 8 phòng demo
  const rooms = [
    {
      title: "Phòng Genesis Luxury Regal Cruise 1",
      price: "180.000",
      adults: 2,
      children: 1,
      roomType: "Deluxe",
      description: "Phòng sang trọng với tầm nhìn biển tuyệt đẹp.",
      amenities: ["TV", "Mini Bar", "Ban công", "Điều hòa", "Bồn tắm"],
      images: ["/images/anh1.jpg", "/images/anh2.jpg", "/images/anh3.jpg"],
    },
    {
      title: "Phòng Genesis Luxury Regal Cruise 2",
      price: "200.000",
      adults: 2,
      children: 2,
      roomType: "Suite",
      description: "Phòng rộng rãi với phòng khách riêng.",
      amenities: ["TV", "Mini Bar", "Ban công", "Điều hòa", "Bồn tắm"],
      images: ["/images/anh4.jpg", "/images/anh5.jpg"],
    },
    {
      title: "Phòng Genesis Luxury Regal Cruise 3",
      price: "220.000",
      adults: 3,
      children: 1,
      roomType: "Deluxe Plus",
      description: "Phòng Deluxe Plus hiện đại, thoải mái.",
      amenities: ["TV", "Mini Bar", "Điều hòa", "Bồn tắm", "Ban công"],
      images: ["/images/anh6.jpg", "/images/anh7.jpg"],
    },
    {
      title: "Phòng Genesis Luxury Regal Cruise 4",
      price: "250.000",
      adults: 2,
      children: 0,
      roomType: "Premium",
      description: "Phòng Premium cao cấp với tiện nghi hiện đại.",
      amenities: ["TV", "Mini Bar", "Ban công", "Điều hòa", "Bồn tắm"],
      images: ["/images/anh8.jpg", "/images/anh9.jpg"],
    },
    {
      title: "Phòng Genesis Luxury Regal Cruise 5",
      price: "180.000",
      adults: 2,
      children: 2,
      roomType: "Deluxe",
      description: "Phòng thoải mái, đầy đủ tiện nghi.",
      amenities: ["TV", "Mini Bar", "Ban công", "Điều hòa", "Bồn tắm"],
      images: ["/images/anh10.jpg", "/images/anh11.jpg"],
    },
    {
      title: "Phòng Genesis Luxury Regal Cruise 6",
      price: "200.000",
      adults: 3,
      children: 1,
      roomType: "Suite",
      description: "Phòng Suite rộng rãi, tiện nghi sang trọng.",
      amenities: ["TV", "Mini Bar", "Ban công", "Điều hòa", "Bồn tắm"],
      images: ["/images/anh12.jpg", "/images/anh13.jpg"],
    },
    {
      title: "Phòng Genesis Luxury Regal Cruise 7",
      price: "220.000",
      adults: 2,
      children: 1,
      roomType: "Deluxe Plus",
      description: "Phòng Deluxe Plus với ban công hướng biển.",
      amenities: ["TV", "Mini Bar", "Ban công", "Điều hòa", "Bồn tắm"],
      images: ["/images/anh14.jpg", "/images/anh15.jpg"],
    },
    {
      title: "Phòng Genesis Luxury Regal Cruise 8",
      price: "250.000",
      adults: 4,
      children: 2,
      roomType: "Premium",
      description: "Phòng Premium rộng rãi, sang trọng.",
      amenities: ["TV", "Mini Bar", "Ban công", "Điều hòa", "Bồn tắm"],
      images: ["/images/anh16.jpg", "/images/anh17.jpg"],
    },
  ];

  const room = rooms[roomId] || rooms[0];

  return (
    <Container sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {room.title}
        </Typography>
        <Typography variant="h6" sx={{ color: "#0066ff" }}>
          {room.price} đ - {room.roomType}
        </Typography>
      </Box>

      {/* Images */}
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", mb: 3 }}>
        {room.images.map((img, idx) => (
          <Box
            key={idx}
            component="img"
            src={img}
            alt={`room-${idx}`}
            sx={{
              width: 250,
              height: 160,
              objectFit: "cover",
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
        ))}
      </Box>

      {/* Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {room.description}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Người lớn: {room.adults} | Trẻ em: {room.children}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {room.amenities.map((item, idx) => (
            <Chip key={idx} label={item} size="small" sx={{ fontSize: 12 }} />
          ))}
        </Box>
      </Box>

      {/* Booking Form */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Đặt phòng ngay:
        </Typography>
        <Button variant="contained" color="primary">
          Đặt phòng - {room.price} đ
        </Button>
      </Box>
    </Container>
  );
}
