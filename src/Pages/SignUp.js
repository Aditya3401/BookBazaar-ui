import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import Footer from "../Components/Footer";
import axios from "axios";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/User/signUp`, data)
      .then((response) => {
        console.log(response.data);
        reset();
        // setMessage("User Signed Up Successfully");
        // setSeverity("success");
        // setOpen(true);
        setLoading(false);
        navigate("/signin");
      })
      .catch((error) => {
        setMessage("Error while signing up. Email already exists.");
        setLoading(false);
        setSeverity("error");
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="off"
                error={errors.firstName ? true : false}
                helperText={
                  (errors.firstName?.type === "required" &&
                    "First Name is required") ||
                  (errors.firstName?.type === "maxLength" &&
                    "Max 30 characters allowed")
                }
                {...register("firstName", { required: true, maxLength: 30 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="off"
                error={errors.lastName ? true : false}
                helperText={
                  (errors.lastName?.type === "required" &&
                    "Last Name is required") ||
                  (errors.lastName?.type === "maxLength" &&
                    "Max 30 characters allowed")
                }
                {...register("lastName", { required: true, maxLength: 30 })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                error={errors.email ? true : false}
                helperText={
                  (errors.email?.type === "required" && "Email is required") ||
                  (errors.email?.type === "pattern" &&
                    "Email format is incorrect")
                }
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                error={errors.password ? true : false}
                helperText={
                  (errors.password?.type === "required" &&
                    "Password is required") ||
                  (errors.password?.type === "pattern" &&
                    "Password should contain UpperCase, LowerCase, Number, SpecialCharacter and min 8 characters")
                }
                {...register("password", {
                  required: true,
                  pattern:
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                })}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ mt: 5 }} />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
