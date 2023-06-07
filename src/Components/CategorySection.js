import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const BookCard = ({ categoryId, categoryName, routeName }) => {
  const navigate = useNavigate();
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        height: "100px",
        width: "400px",
        fontFamily: "Montserrat",
        fontWeight: "600",
        fontSize: "20px",
        lineHeight: "17px",
        transition: "all 0.3s",
        border: "1px solid rgb(224 224 224)",
        borderRadius: "6px",
        color: "#6e6c6c",
      }}
      sx={{
        p: 2,
        ":hover": {
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        },
      }}
      onClick={() => navigate(`/${routeName}/${categoryId}`)}
    >
      <center>{categoryName}</center>
    </Box>
  );
};

export default function CategorySection() {
  const categoryData = [
    {
      categoryId: "976EF95F-5A5D-4BAF-80F1-267C4D3ABB8F",
      categoryName: "Classics",
      routeName: "classics",
    },
    {
      categoryId: "7F7FC9A7-72E0-47B1-A098-29320300D94E",
      categoryName: "Comic Book",
      routeName: "comic-book",
    },
    {
      categoryId: "CD669767-BAAA-4E07-95C2-DA945A349C40",
      categoryName: "Detective and Mystery",
      routeName: "detective-and-mystery",
    },
    {
      categoryId: "5B13081B-344A-406A-8497-0DB329DCD5DA",
      categoryName: "Fantasy",
      routeName: "fantasy",
    },
    {
      categoryId: "955569FF-DD95-4878-A950-F0755E5FD1C0",
      categoryName: "Historical Fiction",
      routeName: "historical-fiction",
    },
    {
      categoryId: "3F025C52-0103-4449-8049-9A5F0A0FC57E",
      categoryName: "Horror",
      routeName: "horror",
    },
  ];
  return (
    <>
      <Box sx={{ p: 5 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: { lg: "40px", md: "40px", xs: "30px" },
            lineHeight: "17px",
            color: "#858585",
            background: "#fff",
          }}
          mb={6}
        >
          Book Categories
        </Typography>
        <Box sx={{ mx: 6 }}>
          <Grid container spacing={5}>
            {categoryData.map((category, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <BookCard
                  categoryId={category.categoryId}
                  categoryImage={category.categoryImage}
                  categoryName={category.categoryName}
                  routeName={category.routeName}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
