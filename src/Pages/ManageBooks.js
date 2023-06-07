import { Box, Container, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ManageBooksTable from "../Components/ManageBooksTable";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";
import { useSelector } from "react-redux";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);

  const showBooks = async () => {
    setLoading(true);
    let url;
    if (user.isAdmin) {
      url = `${process.env.REACT_APP_API_URL}/Books/GetBooks`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/Vendor/GetVendor_Published_Books/${user.userID}`;
    }
    await axios
      .get(url, {
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
    showBooks();
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
              Manage Books
            </Typography>
          </Box>
          <ManageBooksTable books={books} showBooks={showBooks} />
        </Container>
      )}
    </>
  );
};

export default ManageBooks;
