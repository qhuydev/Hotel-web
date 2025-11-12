import React from "react";
import Box from "@mui/material/Box";
import CardItem from './Cards/CardItem'

function ListCards() {
  const cards = [
    {
      title: "Shrimp and Chorizo Paella",
      subheader: "September 14, 2016",
      image: "/images/anh1.jpg",
      description:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
      method: [
        "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo...",
      ],
    },
    // thêm nhiều card khác nếu muốn
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "center",
      }}
    >
      {cards.map((card, index) => (
        <CardItem key={index} {...card} />
      ))}
    </Box>
  );
}

export default ListCards;
