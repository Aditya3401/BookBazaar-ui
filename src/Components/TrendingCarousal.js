import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

export const TrendingCarousal = () => {
  const [books, setBooks] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDragStart = (e) => e.preventDefault();

  const getItemsData = () => {
    setItems(
      books.map((arr, index) => {
        return (
          <div className="item" key={index} data-value={index + 1}>
            <img
              src="/assets/CategoryCover/HistoricalFiction.jpg"
              //src={arr.bookImage}
              onDragStart={handleDragStart}
              role="presentation"
              style={{ height: "70vh" }}
            ></img>
            {/* <img src={arr.bookImage}></img> */}
          </div>
        );
      })
    );
  };

  const GetTrendingBooks = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/Books/GetTrendingBooks`, {
        headers: {
          Authorization: basicAuthHeader,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getItemsData();
  }, [books]);

  useEffect(() => {
    GetTrendingBooks();
  }, []);

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <AliceCarousel
          autoPlay
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          disableButtonsControls
          autoPlayInterval={2000}
          infinite
          animationDuration={1000}
        />
      )}
    </>
  );
};
