import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { addAddress } from "../../Redux/Actions/checkout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AddressForm = ({ activeStep, handleNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addAddress(data));
    handleNext();
  };
  let Address = useSelector((state) => state.checkout);
  useEffect(() => {
    if (Object.keys(Address).length) {
      setValue("firstName", Address.firstName);
      setValue("lastName", Address.lastName);
      setValue("address", Address.address);
      setValue("city", Address.city);
      setValue("state", Address.state);
      setValue("zip", Address.zip);
      setValue("country", Address.country);
    }
  }, []);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
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
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              error={errors.lastName ? true : false}
              helperText={
                (errors.firstName?.type === "required" &&
                  "Last Name is required") ||
                (errors.firstName?.type === "maxLength" &&
                  "Max 30 characters allowed")
              }
              {...register("lastName", { required: true, maxLength: 30 })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="shipping address"
              variant="standard"
              error={errors.address ? true : false}
              helperText={
                errors.address?.type === "required" && "Address is required"
              }
              {...register("address", { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address"
              variant="standard"
              error={errors.city ? true : false}
              helperText={
                errors.city?.type === "required" && "City is required"
              }
              {...register("city", { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region *"
              fullWidth
              variant="standard"
              error={errors.state ? true : false}
              helperText={
                errors.state?.type === "required" && "State is required"
              }
              {...register("state", { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / PIN code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              error={errors.zip ? true : false}
              helperText={
                errors.zip?.type === "required" && "PIN Code is required"
              }
              {...register("zip", { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              error={errors.country ? true : false}
              helperText={
                errors.country?.type === "required" &&
                "Country Code is required"
              }
              {...register("country", { required: true })}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddressForm;
