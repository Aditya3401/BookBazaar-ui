import { Box, Container, IconButton, Typography, Divider } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FooterMain = () => {
  return (
    <>
      <Divider />
      <Box sx={{ background: "#f5f5f5" }}>
        <Container sx={{ py: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: { lg: "17px", md: "17px", xs: "14px" } }}
              >
                © 2023 BookBazaar. All rights reserved
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FooterMain;
