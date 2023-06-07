import { Card, Typography, Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";

const OrderItemsCard = ({ item }) => {
  return (
    <Card variant="outlined" sx={{ padding: "10px 12px" }}>
      <Box display="flex">
        <Box>
          <img height="80px" width="60px" src={item.bookImage} />
        </Box>
        <Box sx={{ ml: 3, width: "100%", mt: 1 }}>
          <Typography fontSize="18px" fontWeight="600" fontFamily="Montserrat">
            {item.title}
          </Typography>
          <Box
            sx={{ mt: 1, width: "100%" }}
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              fontSize="16px"
              fontWeight="700"
              fontFamily="Montserrat"
              color="#50B83C"
            >
              ₹ {item.price}
            </Typography>
            <Typography
              fontSize="14px"
              fontWeight="400"
              fontFamily="Montserrat"
              sx={{ mr: 4 }}
            >
              {item.quantityInOrder} item
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// const orderItems = [
//   {
//     image: "/assets/CategoryCover/HistoricalFiction.jpg",
//     title: "New Book",
//     price: "500",
//     quantity: "1",
//   },
//   {
//     image: "/assets/CategoryCover/HistoricalFiction.jpg",
//     title: "New Book",
//     price: "500",
//     quantity: "1",
//   },
// ];

export default function OrderItems({ orderID }) {
  const [orderItems, setOrderItems] = useState([]);

  const GetOrder = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/Order/GetOrder/${orderID}`, {
        headers: {
          Authorization: basicAuthHeader,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrderItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetOrder();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {orderItems.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <OrderItemsCard item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
