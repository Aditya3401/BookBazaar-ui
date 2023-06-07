import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function PaymentForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Our Payment Partner
      </Typography>
      <Box display="flex" justifyContent="center">
        <img src="/assets/Images/razorpay.png" alt="razorpay" />
      </Box>
    </>
  );
}
