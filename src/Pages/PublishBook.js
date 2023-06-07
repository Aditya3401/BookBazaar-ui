import Navbar from "../Components/Navbar";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";
import { useSnackbar } from "notistack";

const PublishBook = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  let userId = useSelector((state) => state.user.user.userID);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      authorName: "",
      price: "",
      quantityInStore: "",
      isbn: "",
      categoryID: "",
      rating: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", image);
    if (image) {
      setLoading(true);
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/Vendor/UploadFile?userId=${userId}`,
          formData
        )
        .then((response) => {
          data["price"] = Number(data.price);
          data["quantityInStore"] = Number(data.quantityInStore);
          data["rating"] = Number(data.rating);
          console.log(data);
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/Vendor/PublishBook/${userId}`,
              data,
              {
                headers: {
                  Authorization: basicAuthHeader,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              setLoading(false);
              reset();
              enqueueSnackbar("Book Published Successfully", {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
              enqueueSnackbar("Error while Publishing Book", {
                variant: "error",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          enqueueSnackbar("Error while uploading Image", {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        });
    }
  };

  // const onSubmit = (data) => {
  //   setLoading2(true);
  //   data["price"] = Number(data.price);
  //   data["quantityInStore"] = Number(data.quantityInStore);
  //   data["rating"] = Number(data.rating);
  //   console.log(data);
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_URL}/Vendor/${userId}/PublishBook`,
  //       data
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       reset();
  //       setMessage("Book Published successfully");
  //       setLoading2(false);
  //       setSeverity("success");
  //       setOpen(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setMessage("Error while Publishing book");
  //       setLoading2(false);
  //       setSeverity("error");
  //       setOpen(true);
  //     });
  // };

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography
              variant="h6"
              textTransform="capitalize"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: { lg: "40px", md: "40px", xs: "30px" },
                lineHeight: "17px",
                color: "#3e3c3c",
                mb: 4,
              }}
            >
              Publish Book
            </Typography>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Book Title"
                  name="title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={errors.title ? true : false}
                  helperText={
                    errors.title?.type === "required" &&
                    "Book Title is required"
                  }
                  {...register("title", { required: true })}
                />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Author Name"
                  variant="outlined"
                  name="authorName"
                  fullWidth
                  margin="normal"
                  error={errors.authorName ? true : false}
                  helperText={
                    errors.authorName?.type === "required" &&
                    "Author Name is required"
                  }
                  {...register("authorName", { required: true })}
                />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel
                    htmlFor="outlined-adornment-amount"
                    error={errors.price ? true : false}
                  >
                    Price
                  </InputLabel>
                  <OutlinedInput
                    type="number"
                    name="price"
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    label="Price"
                    error={errors.price ? true : false}
                    {...register("price", { required: true })}
                  />
                  <FormHelperText error={errors.price ? true : false}>
                    {errors.price?.type === "required" && "Price is required"}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  name="quantityInStore"
                  error={errors.quantityInStore ? true : false}
                  helperText={
                    errors.quantityInStore?.type === "required" &&
                    "Quantity is required"
                  }
                  {...register("quantityInStore", { required: true })}
                />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Rating"
                  variant="outlined"
                  name="rating"
                  fullWidth
                  margin="normal"
                  type="number"
                  error={errors.rating ? true : false}
                  helperText={
                    (errors.rating?.type === "required" &&
                      "Rating is required") ||
                    (errors.rating?.type === "pattern" &&
                      "Ratings should range from 1 to 5 with up to one decimal point")
                  }
                  {...register("rating", {
                    required: true,
                    pattern: /^[1-5](\.[0-9])?$/,
                  })}
                />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="ISBN Number"
                  name="isbn"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={errors.isbn ? true : false}
                  helperText={
                    errors.isbn?.type === "required" &&
                    "ISBN Number is required"
                  }
                  {...register("isbn", { required: true })}
                />
              </Grid>
            </Grid>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              name="description"
              multiline
              rows={4}
              margin="normal"
              fullWidth
              error={errors.description ? true : false}
              helperText={
                errors.description?.type === "required" &&
                "Description is required"
              }
              {...register("description", { required: true })}
            />

            <FormControl
              fullWidth
              sx={{ my: 2 }}
              error={errors.categoryID ? true : false}
            >
              <InputLabel id="demo-simple-select-label">
                Category Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category Name"
                name="categoryID"
                {...register("categoryID", { required: true })}
              >
                <MenuItem value="976EF95F-5A5D-4BAF-80F1-267C4D3ABB8F">
                  Classics
                </MenuItem>
                <MenuItem value="7F7FC9A7-72E0-47B1-A098-29320300D94E">
                  Comic Book
                </MenuItem>
                <MenuItem value="CD669767-BAAA-4E07-95C2-DA945A349C40">
                  Detective and Mystery
                </MenuItem>
                <MenuItem value="5B13081B-344A-406A-8497-0DB329DCD5DA">
                  Fantasy
                </MenuItem>
                <MenuItem value="955569FF-DD95-4878-A950-F0755E5FD1C0">
                  Historical Fiction
                </MenuItem>
                <MenuItem value="3F025C52-0103-4449-8049-9A5F0A0FC57E">
                  Horror
                </MenuItem>
              </Select>
              <FormHelperText>
                {errors.categoryID?.type === "required" &&
                  "Category Name is required"}
              </FormHelperText>
            </FormControl>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                textTransform="capitalize"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                  fontSize: "18px",
                  lineHeight: "17px",
                  color: "#3e3c3c",
                  mr: 2,
                }}
              >
                Select Book Cover :
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{ mt: { lg: 0, md: 0, xs: 2 } }}
              >
                Select file
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleChange}
                />
              </Button>
              <Box sx={{ mx: 2, mt: { lg: 0, md: 0, xs: 2 } }}>
                {image ? image.name : "No File Selected"}
              </Box>
              {/* <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  variant="contained"
                  sx={buttonSx}
                  disabled={loading || image ? false : true}
                  onClick={handleButtonClick}
                >
                  {!success ? "Upload file" : "file uploaded"}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box> */}
            </Box>
            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Publish Book
            </LoadingButton>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PublishBook;
