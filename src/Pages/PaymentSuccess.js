import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams();

  return (
    <Box>
      <Box display="flex" justifyContent="center" sx={{ mt: 15 }}>
        <img
          style={{ width: 100, height: 100 }}
          src="/assets/Images/Payment-Success.png"
          alt="payment-successful"
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 36,
            fontFamily: "Montserrat",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Purchase Success!
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <center>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              fontFamily: "Montserrat",
              display: "flex",
              justifyContent: "center",
              ml: { lg: 0, md: 0, xs: 3 },
              mr: { lg: 0, md: 0, xs: 3 },
            }}
          >
            Thank’s for your order at BookBazaar. Your order will be processed
            as soon as possible.
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              fontFamily: "Montserrat",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Make sure you make note of your order number, which is
          </Typography>
          <span>
            <b>&nbsp;{paymentId}</b>
          </span>
          .
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              fontFamily: "Montserrat",
              display: "flex",
              justifyContent: "center",
              ml: { lg: 0, md: 0, xs: 3 },
              mr: { lg: 0, md: 0, xs: 3 },
            }}
          >
            You will be receiving an email shortly with invoice from your order.
          </Typography>
        </center>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          &lt; &nbsp; &nbsp;Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
