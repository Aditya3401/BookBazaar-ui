import * as React from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useDispatch } from "react-redux";
import { addTotalPrice } from "../../Redux/Actions/checkout";

export default function Review({ activeStep, handleNext, handleBack }) {
  let cart = useSelector((state) => state?.cart.books);
  const dispatch = useDispatch();

  let total = 0;
  for (let i = 0; i < cart?.length; i++) {
    total = total + cart[i].price * cart[i].quantityInCart;
  }

  return (
    <React.Fragment>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: "22px",
          lineHeight: "17px",
          color: "#3e3c3c",
          mt: 1,
          color: "grey",
        }}
      >
        Order summary
      </Typography>
      {cart.map((book, index) => (
        <Paper variant="outlined" sx={{ mt: 2 }} key={index}>
          <Grid container sx={{ py: 2 }}>
            <Grid
              item
              sm={4.5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/assets/CategoryCover/Mystery.jpg"
                // src={book.bookImage}
                alt={book.title}
                height="150"
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item sm={7.4} sx={{ px: 2 }}>
              <Typography
                variant="h6"
                textTransform="capitalize"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "700",
                  fontSize: "18px",
                  lineHeight: "17px",
                  color: "#3e3c3c",
                  my: 1,
                }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "13px",
                  lineHeight: "17px",
                  color: "#817c7c",
                  my: 1,
                }}
              >
                by {book.authorName}
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={book.rating}
                precision={0.1}
                readOnly
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "17px",
                  color: "#817c7c",
                  mb: 1,
                }}
              >
                Qty: {book.quantityInCart}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "17px",
                  color: "#464242",
                  mt: 2,
                }}
              >
                Price: ₹{book.price * book.quantityInCart}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Typography
          variant="h6"
          textTransform="capitalize"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: "22px",
            lineHeight: "17px",
            color: "#3e3c3c",
            mt: 1,
          }}
        >
          Total
        </Typography>
        <Typography
          variant="h6"
          textTransform="capitalize"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "22px",
            lineHeight: "17px",
            color: "#3e3c3c",
            mt: 1,
            color: "grey",
          }}
        >
          ₹ {total}.00
        </Typography>
      </Box>
      <Divider sx={{ mt: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          onClick={() => {
            handleNext();
            dispatch(addTotalPrice(total));
          }}
          sx={{ mt: 3, ml: 1 }}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
