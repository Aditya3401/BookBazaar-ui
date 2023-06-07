import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import Footer from "../Components/Footer";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/Mail/SendMail`, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        enqueueSnackbar("Password sent on your Email", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        navigate("/signin");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar("Unable to send Email. Enter correct email.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
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
          <LockPersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </Typography>
          <TextField
            margin="normal"
            label="Email"
            name="email"
            autoComplete="email"
            fullWidth
            id="standard-basic"
            variant="standard"
            error={errors.email ? true : false}
            helperText={
              (errors.email?.type === "required" && "Email is required") ||
              (errors.email?.type === "pattern" && "Email format is incorrect")
            }
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            })}
          />
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Remember your password?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
