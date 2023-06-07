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
import { useState } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Actions/user";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/User/login`, data)
      .then((response) => {
        reset();
        // setMessage("User Logged in Successfully");
        // setSeverity("success");
        // setOpen(true);
        setLoading(false);
        dispatch(login(response.data));
        const user = response.data;
        console.log(user);
        const isTemp = user.isTemp;
        const isActive = user.isActive;
        const userID = user.userID;

        if (!isActive) {
          navigate(`/revokeaccess/${userID}`);
        } else {
          if (isTemp) {
            navigate("/ChangePassword");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data || "Error while Sighning in");
        setSeverity("error");
        setLoading(false);
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password ? true : false}
            helperText={
              errors.password?.type === "required" && "Password is required"
            }
            {...register("password", { required: true })}
          />
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ mt: 8, mb: 4 }} />
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
