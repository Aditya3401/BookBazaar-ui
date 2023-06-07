import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Navbar from "../Components/Navbar";
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
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToCartAndUpdateBackend,
  removeBookFromCartAndUpdateBackend,
  deleteBookFromCartAndUpdateBackend,
} from "../Redux/Actions/cart";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { fetchBooks } from "../Redux/Actions/books";
import FooterMain from "../Components/FooterMain";

const Cart = () => {
  let total = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  let cart = useSelector((state) => state?.cart.books);
  let loading = useSelector((state) => state?.cart?.isLoading);
  let error = useSelector((state) => state?.cart?.error);
  if (error) {
    enqueueSnackbar(error, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  }
  for (let i = 0; i < cart?.length; i++) {
    total = total + cart[i].price * cart[i].quantityInCart;
  }
  return (
    <>
      <Navbar />
      {loading ? (
        <LinearProgress />
      ) : (
        <Container maxWidth="lg" sx={{ p: 2, mt: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              style={{ cursor: "pointer" }}
            >
              Cart
            </Link>
          </Breadcrumbs>
          <Typography
            variant="h6"
            textTransform="capitalize"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "700",
              fontSize: "22px",
              lineHeight: "17px",
              color: "#3e3c3c",
              mt: 5,
            }}
          >
            Your Cart
          </Typography>
          {cart.length == 0 ? (
            <Box sx={{ width: "100%" }} display="flex" justifyContent="center">
              <img
                src="/assets/images/Empty-cart.jpg"
                alt="emptycart"
                height="400"
                width="400"
              />
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item sm={12} md={6}>
                {cart.map((book, index) => (
                  <Paper variant="outlined" sx={{ mt: 2 }} key={index}>
                    <Grid container sx={{ py: 2 }}>
                      <Grid
                        item
                        sm={4.5}
                        xs={12}
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
                          height="200"
                        />
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid
                        item
                        sm={7.4}
                        xs={12}
                        sx={{
                          px: 2,
                        }}
                      >
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
                            display: { lg: "block", md: "block", xs: "flex" },
                            justifyContent: { xs: "center" },
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
                            display: { lg: "block", md: "block", xs: "flex" },
                            justifyContent: { xs: "center" },
                          }}
                        >
                          by {book.authorName}
                        </Typography>
                        <Rating
                          name="half-rating-read"
                          defaultValue={book.rating}
                          precision={0.1}
                          readOnly
                          sx={{
                            mb: 3,
                            display: { lg: "flex", md: "flex", xs: "flex" },
                            justifyContent: {
                              lg: "start",
                              md: "start",
                              xs: "center",
                            },
                          }}
                        />
                        <Divider sx={{ mb: 2 }} />
                        <Box
                          display="flex"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box display="flex">
                            <Typography
                              variant="h6"
                              sx={{
                                fontFamily: "Montserrat",
                                fontWeight: "600",
                                fontSize: "18px",
                                lineHeight: "17px",
                                color: "#817c7c",
                                my: 1,
                              }}
                            >
                              Qty:
                            </Typography>
                            <ButtonGroup
                              size="small"
                              aria-label="small button group"
                              sx={{ ml: 2 }}
                            >
                              <Button
                                key="one"
                                onClick={() => {
                                  dispatch(
                                    removeBookFromCartAndUpdateBackend(
                                      book.bookID
                                    )
                                  );
                                }}
                              >
                                <RemoveIcon />
                              </Button>
                              <Button
                                key="two"
                                disableFocusRipple
                                disableRipple
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                    outline: "none",
                                  },
                                }}
                              >
                                {book.quantityInCart}
                              </Button>
                              <Button
                                key="three"
                                onClick={() => {
                                  if (
                                    book.quantityInStore === book.quantityInCart
                                  ) {
                                    enqueueSnackbar(
                                      "Quantity can not be increased due to limited stock",
                                      {
                                        variant: "error",
                                        anchorOrigin: {
                                          vertical: "bottom",
                                          horizontal: "right",
                                        },
                                      }
                                    );
                                  } else {
                                    dispatch(addToCartAndUpdateBackend(book));
                                  }
                                }}
                              >
                                <AddIcon />
                              </Button>
                            </ButtonGroup>
                          </Box>
                          <DeleteIcon
                            style={{ fill: "grey", cursor: "pointer" }}
                            onClick={() => {
                              dispatch(
                                deleteBookFromCartAndUpdateBackend(book.bookID)
                              );
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Montserrat",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "17px",
                            color: "#464242",
                            mt: 3,
                          }}
                        >
                          Price: ₹{book.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <Paper variant="outlined" sx={{ mt: 2, p: 3 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                      Subtotal
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
                      ₹ {total}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="h6"
                      textTransform="capitalize"
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        fontSize: "22px",
                        lineHeight: "17px",
                        color: "#3e3c3c",
                        mt: 2,
                      }}
                    >
                      Delivery Charge
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
                        mt: 2,
                        color: "grey",
                      }}
                    >
                      ₹ 0
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                      ₹ {total}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#ff4c3b", width: "100%" }}
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Container>
      )}
      <Box sx={{ mt: { lg: 16, md: 16, xs: 2 } }}>
        <FooterMain />
      </Box>
    </>
  );
};

export default Cart;
