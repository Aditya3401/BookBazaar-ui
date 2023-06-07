import React from "react";
import { Typography, Box } from "@mui/material";
import { TrendingCarousal } from "./TrendingCarousal";

const TrendingSection = () => {
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
          Today's Trending
        </Typography>
        <TrendingCarousal />
      </Box>
    </>
  );
};

export default TrendingSection;
