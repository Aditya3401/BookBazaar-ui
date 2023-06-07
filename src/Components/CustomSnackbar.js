import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const CustomSnackbar = ({ message, severity }) => {
  const [msg, setMsg] = useState(message);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (msg !== "") {
      setMsg("");
    }
  };
  return (
    <>
      <Snackbar
        open={msg !== "" ? true : false}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {msg || ""}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
