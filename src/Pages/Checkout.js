import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from "../Components/Navbar";
import AddressForm from "../Components/Checkout/AddressForm";
import PaymentForm from "../Components/Checkout/PaymentForm";
import Review from "../Components/Checkout/Review";
import { useSelector } from "react-redux";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";
import axios from "axios";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Shipping address", "Review your order", "Payment details"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm activeStep={activeStep} handleNext={handleNext} />;
      case 1:
        return (
          <Review
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const user = useSelector((state) => state?.user?.user);
  const checkoutDetails = useSelector((state) => state?.checkout);
  const userName = user.firstName + " " + user.lastName;
  const userEmail = user.email;

  const data = {
    orderTotal: checkoutDetails?.price,
    address: checkoutDetails?.address,
    city: checkoutDetails?.city,
    state: checkoutDetails?.state,
    pincode: checkoutDetails?.zip,
  };

  const checkoutHandler = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/Order/GenerateOrder/${user.userID}`,
        data,
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const options = {
          key: "rzp_test_C7P80DrdG4R3Iy",
          amount: res.data.item.orderTotal,
          currency: "INR",
          name: "BookBazaar",
          description: "Payment for purchase order",
          image: "/assets/avatar.jpg",
          order_id: res.data.item.orderID,
          callback_url: `${process.env.REACT_APP_API_URL}/Order/CompleteOrderProcess`,
          prefill: {
            name: userName,
            email: userEmail,
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "700",
              fontSize: "35px",
              lineHeight: "17px",
              color: "#323232",
              mb: 1,
            }}
          >
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activeStep)}
          {activeStep === 2 && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={checkoutHandler}
                sx={{ mt: 3, ml: 1 }}
              >
                Pay With Razorpay
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Checkout;
