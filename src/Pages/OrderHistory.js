import {
  Typography,
  Box,
  Container,
  Button,
  Grid,
  Paper,
  Divider,
  LinearProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "../Components/OrderStepper";
import OrderItems from "../Components/OrderItems";
import FooterMain from "../Components/FooterMain";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import axios from "axios";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";

const OrderHistory = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { orderID } = useParams();

  const GetParticularOrder = async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/Order/GetParticularOrder/${orderID}`,
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
          },
        }
      )
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
    GetParticularOrder();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <LinearProgress />
      ) : (
        <Container sx={{ mt: 5, mb: 5 }}>
          <Box
            sx={{
              display: { lg: "flex", md: "flex", xs: "flex" },
              flexDirection: { lg: "row", md: "row", xs: "column" },
              justifyContent: {
                lg: "space-between",
                md: "space-between",
                xs: "center",
              },
            }}
          >
            <Typography
              variant="h5"
              textTransform="capitalize"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: { lg: "25px", md: "25px", xs: "25px" },
                mb: { lg: 0, md: 0, xs: 3 },
                lineHeight: "17px",
                color: "#858585",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Order Tracking
            </Typography>
            <Button
              onClick={() => navigate("/")}
              size="small"
              variant="outlined"
              sx={{ alignItems: "center" }}
            >
              <HomeIcon sx={{ mr: 1 }} />
              Go to Homepage
            </Button>
          </Box>
          <Box sx={{ mt: { lg: 8, md: 8, xs: 4 } }}>
            <Grid container spacing={2}>
              <Grid item md={8} xs={12}>
                <Paper
                  variant="outlined"
                  sx={{ padding: "28px 24px", borderRadius: "8px" }}
                >
                  <Box
                    sx={{
                      display: { lg: "flex", md: "flex", xs: "flex" },
                      flexDirection: { lg: "row", md: "row", xs: "column" },
                    }}
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography
                        fontSize="20px"
                        fontWeight="700"
                        fontFamily="Montserrat"
                      >
                        Your package in..
                      </Typography>
                      <Typography
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="Montserrat"
                      >
                        {orders.address}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        background: "#F9FAFB",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        mt: { lg: 0, md: 0, xs: 2 },
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight="600"
                        fontFamily="Montserrat"
                      >
                        Order ID:
                      </Typography>
                      <Typography
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="Montserrat"
                      >
                        {orderID}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 4, mb: 4 }}>
                    <OrderStepper orderStatus={orders.orderStatus} />
                  </Box>
                  <Divider />
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      fontSize="18px"
                      fontWeight="600"
                      fontFamily="Montserrat"
                      sx={{ mb: 2 }}
                    >
                      Inside Package
                    </Typography>
                    <OrderItems orderID={orderID} />
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={4} xs={12}>
                <Paper
                  variant="outlined"
                  sx={{ padding: "28px 24px", borderRadius: "8px" }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      fontFamily="Montserrat"
                    >
                      Subtotal
                    </Typography>
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      fontFamily="Montserrat"
                    >
                      ₹ {orders.orderTotal}.00
                    </Typography>
                  </Box>
                  <Box
                    sx={{ mt: 2 }}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      fontFamily="Montserrat"
                    >
                      Shipping
                    </Typography>
                    <Typography
                      fontWeight="500"
                      fontSize="16px"
                      fontFamily="Montserrat"
                      sx={{ mr: 4 }}
                    >
                      -
                    </Typography>
                  </Box>
                  <Box
                    sx={{ mt: 2 }}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography
                      fontWeight="700"
                      fontSize="16px"
                      fontFamily="Montserrat"
                    >
                      Order Total
                    </Typography>
                    <Typography
                      fontWeight="700"
                      fontSize="16px"
                      fontFamily="Montserrat"
                    >
                      ₹ {orders.orderTotal}.00
                    </Typography>
                  </Box>
                </Paper>
                <Box
                  sx={{
                    mt: 2,
                    background: "#F9FAFB",
                    borderRadius: "8px",
                    padding: "20px 24px",
                  }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography
                        fontWeight="700"
                        fontSize="16px"
                        fontFamily="Montserrat"
                      >
                        Have been trouble
                      </Typography>
                      <Typography
                        fontWeight="700"
                        fontSize="16px"
                        fontFamily="Montserrat"
                      >
                        on your package?
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        sx={{ padding: "9px", borderRadius: "8px" }}
                      >
                        <LocalPhoneRoundedIcon
                          sx={{ height: "20px", width: "20px" }}
                        />
                        <Typography
                          textTransform="capitalize"
                          fontSize="16px"
                          sx={{ ml: 1 }}
                        >
                          Call Us
                        </Typography>
                      </Button>
                    </Box>
                  </Box>

                  <Typography
                    sx={{ mt: 2 }}
                    fontWeight="500"
                    fontSize="14px"
                    fontFamily="Montserrat"
                  >
                    You can call us. We can help solve your problem.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}

      <FooterMain />
    </>
  );
};

export default OrderHistory;
