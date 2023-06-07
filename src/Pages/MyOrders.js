import { Box, Container, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import MyOrdersTable from "../Components/MyOrdersTable";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")).userID;

  const showOrders = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/Order/GetOrdersOfUser/${user}`, {
        headers: {
          Authorization: basicAuthHeader,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    showOrders();
  }, []);

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      {loading ? (
        <LinearProgress />
      ) : (
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              mb: 4,
              mt: 5,
            }}
          >
            <Typography
              variant="h5"
              textTransform="capitalize"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: "25px",
                lineHeight: "17px",
                color: "#858585",
              }}
            >
              My Orders
            </Typography>
          </Box>
          <MyOrdersTable orders={orders} showOrders={showOrders} />
        </Container>
      )}
    </>
  );
};

export default MyOrders;
