import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  Typography,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { selectBook } from "../Redux/Actions/books";
import { addToCartAndUpdateBackend } from "../Redux/Actions/cart";
import { useSnackbar } from "notistack";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";
import { DiscussionEmbed } from "disqus-react";
import FooterMain from "../Components/FooterMain";

const BookPage = () => {
  const dispatch = useDispatch();
  let { bookId } = useParams();
  let book = useSelector((state) => state.book);
  const [loading, setLoading] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        setLoading(true);
        await axios
          .get(`${process.env.REACT_APP_API_URL}/Books/GetBookById/${bookId}`, {
            headers: {
              Authorization: basicAuthHeader,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            // console.log(res.data);
            dispatch(selectBook(res.data));
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      };
      fetchBook();
    }
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid
          container
          style={{
            minHeight: "500px",
            margin: "auto",
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            display="flex"
            justifyContent="center"
            sx={{
              alignItems: "center",
              mt: { lg: 0, md: 0, xs: 4 },
            }}
          >
            <img
              src="/assets/CategoryCover/HistoricalFiction.jpg"
              // src={book.bookImage}
              alt={book.title}
              style={{ aspectRatio: 2 / 3 }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              display="flex"
              sx={{
                m: "auto",
                py: 3,
                px: 6,
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "800",
                  fontSize: "36px",
                  lineHeight: "44px",
                  color: "black",
                  marginBottom: "10px",
                }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="h3"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "22px",
                  lineHeight: "44px",
                  color: "#707070",
                }}
              >
                <span style={{ color: "black" }}>Author : </span>
                {book.authorName}
              </Typography>
              <Rating
                name="half-rating-read"
                defaultValue={book?.rating}
                precision={0.1}
                readOnly
              />
              <Typography
                variant="h3"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "25px",
                  lineHeight: "44px",
                  color: "#707070",
                }}
              >
                <span style={{ color: "black" }}>Price : </span>₹{book.price}
              </Typography>
              <Typography
                variant="h3"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "21px",
                  lineHeight: "44px",
                  color: "#707070",
                }}
              >
                <span style={{ color: "black" }}>ISBN Number : </span>
                {book.isbn}
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  fontSize: "20px",
                  lineHeight: "44px",
                  color: "black",
                }}
              >
                Description :
              </Typography>
              <Box
                sx={{ maxHeight: "185px", overflowY: "scroll", pr: 2, mb: 2 }}
              >
                <Typography
                  variant="h4"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                    fontSize: "18px",
                    lineHeight: "35px",
                    color: "#707070",
                    textAlign: "justify",
                    marginBottom: "10px",
                  }}
                >
                  {book.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                disabled={book.quantityInStore <= 0 ? true : false}
                endIcon={<ShoppingCartIcon />}
                onClick={() => {
                  dispatch(addToCartAndUpdateBackend(book));
                  enqueueSnackbar("Book Added in Cart Successfully", {
                    variant: "success",
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                  });
                }}
              >
                {book.quantityInStore <= 0 ? "Sold out" : "Add to Cart"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
      <Container>
        <DiscussionEmbed
          shortname="BookBazaar"
          config={{
            //url: this.props.article.url,
            identifier: book.id,
            title: book.title,
            language: "English", //e.g. for Traditional Chinese (Taiwan)
          }}
        />
      </Container>
      <FooterMain />
    </>
  );
};

export default BookPage;
