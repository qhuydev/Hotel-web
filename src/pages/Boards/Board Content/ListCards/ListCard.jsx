import React from "react";
import { Grid, Box } from "@mui/material";
import CardItem from "./Cards/CardItem";

function ListCards() {
  const cards = [
  {
    id: 1,
    title: "Phòng Deluxe Sea View – Ocean Hotel",
    subheader: "Giảm 15%",
    image: "/images/anh2.jpg",
    price: "950.000",
    roomType: "Deluxe Sea View",
    adults: 2,
    children: 1,
    description:
      "Phòng hướng biển với ban công riêng, phù hợp cho kỳ nghỉ thư giãn.",
    amenities: ["TV", "Mini Bar", "Điều hòa", "View biển", "Wifi miễn phí"],
  },
  {
    id: 2,
    title: "Suite Gia Đình – Royal Resort",
    subheader: "Tặng 2 bữa sáng",
    image: "/images/anh3.jpg",
    price: "1.500.000",
    roomType: "Family Suite",
    adults: 4,
    children: 2,
    description:
      "Phòng diện tích lớn, phù hợp cho nhóm bạn và gia đình đông người.",
    amenities: ["Bếp nhỏ", "Sofa", "TV 55 inch", "Bồn tắm lớn", "Ban công"],
  },
  {
    id: 3,
    title: "Phòng Tiêu Chuẩn – City Center Hotel",
    subheader: "Giảm giá hôm nay",
    image: "/images/anh9.jpg",
    price: "650.000",
    roomType: "Standard",
    adults: 2,
    children: 0,
    description: "Phòng gọn gàng, sạch sẽ, phù hợp chuyến công tác ngắn ngày.",
    amenities: ["TV", "Wifi miễn phí", "Máy sấy tóc", "Điều hòa"],
  },
  {
    id: 4,
    title: "Phòng VIP Panorama View – Sky Tower",
    subheader: "Tặng 1 voucher spa",
    image: "/images/bgc.jpg",
    price: "2.300.000",
    roomType: "VIP Panorama",
    adults: 2,
    children: 1,
    description:
      "Tầm nhìn toàn cảnh thành phố, nội thất cao cấp, trải nghiệm sang trọng.",
    amenities: ["Bồn tắm đứng", "Loa Bluetooth", "Minibar", "View 360°"],
  },
  {
    id: 5,
    title: "Bungalow Sân Vườn – Green Village",
    subheader: "Ưu đãi đặt sớm",
    image: "/images/anh5.jpg",
    price: "1.200.000",
    roomType: "Garden Bungalow",
    adults: 3,
    children: 1,
    description:
      "Phòng dạng bungalow nằm giữa không gian xanh mát, yên tĩnh.",
    amenities: ["Sân vườn", "Wifi", "Điều hòa", "Bồn tắm", "BBQ Area"],
  },
  {
    id: 6,
    title: "Phòng Studio – Modern House",
    subheader: "Giảm 10%",
    image: "/images/anh6.jpg",
    price: "780.000",
    roomType: "Studio",
    adults: 2,
    children: 0,
    description: "Phòng phong cách hiện đại, đầy đủ tiện nghi, tự do thoải mái.",
    amenities: ["Bếp nhỏ", "Máy giặt", "TV", "Ban công"],
  },
  {
    id: 7,
    title: "Phòng Hướng Hồ – Lakeside Resort",
    subheader: "Tặng vé chèo sup",
    image: "/images/anh7.jpg",
    price: "1.350.000",
    roomType: "Lake View",
    adults: 2,
    children: 1,
    description:
      "View hồ thơ mộng, không gian yên bình, rất thích hợp để nghỉ dưỡng.",
    amenities: ["View hồ", "Điều hòa", "Ghế phơi nắng", "Minibar"],
  },
  {
    id: 8,
    title: "Suite Thượng Hạng – Paradise Hotel",
    subheader: "Tặng trái cây khi nhận phòng",
    image: "/images/anh8.jpg",
    price: "1.900.000",
    roomType: "Premium Suite",
    adults: 3,
    children: 1,
    description:
      "Thiết kế sang trọng, phòng rộng rãi, dịch vụ đẳng cấp chuẩn 5 sao.",
    amenities: ["Bồn tắm lớn", "TV 4K", "Minibar", "View thành phố"],
  },
];


  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardItem {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListCards;
