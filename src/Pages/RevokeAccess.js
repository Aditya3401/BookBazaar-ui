import React from "react";
import Navbar from "../Components/Navbar";
import { Box, Icon, Paper, Typography } from "@mui/material";
import FooterMain from "../Components/FooterMain";
import img from "../Images/revoke-access.png";
import { motion, AnimatePresence } from "framer-motion";

const RevokeAccess = () => {
  const modal = {
    hidden: {
      y: "200vh",
      opacity: 0,
    },
    visible: {
      y: "0px",
      opacity: 1,
      transition: { delay: 0.5 },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          variants={modal}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "14vh",
            marginBottom: "18vh",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              width: { lg: "50%", md: "50%", xs: "90%" },
              height: { lg: "50%", md: "50%", xs: "90%" },
              display: "flex",
              justifyContent: "center",
              padding: "30px 0px",
              boxShadow: 3,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{ height: 100, width: 100 }}
                  src={img}
                  alt="revoke-access"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { lg: 36, md: 36, xs: 20 },
                    fontFamily: "Montserrat",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Account Access Revoked
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <center>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Your account access has been revoked.
                    <br /> The most common cause of this is a Violation of User
                    Agreement and Policy
                  </Typography>
                </center>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default RevokeAccess;
