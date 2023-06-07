import React, { useState } from "react";
import { Box, Button, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../CSS/UsersManageTable.css";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import { useSnackbar } from "notistack";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";
import ConfirmationModalBooks from "./ConfirmationModalBooks";

export default function UsersManageTable({ users, showUsers }) {
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const updateUser = async (e) => {
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/Admin/UpdateUser/${currentRow}`,
      headers: { Authorization: basicAuthHeader },
    })
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        showUsers();
        enqueueSnackbar("User Status Updated successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
        enqueueSnackbar("Unable to update status of user", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: false,
    },
    {
      field: "isVendor",
      headerName: "Is Vendor",
      sortable: false,
      width: 120,
    },
    {
      field: "isActive",
      headerName: "User Status",
      renderCell: (params) => {
        const handleChange = () => {
          setCurrentRow(params.row.userID);
          setOpen(true);
        };

        return (
          <Switch
            checked={params.row.isActive ? true : false}
            onChange={handleChange}
          />
        );
      },

      sortable: false,
      width: 120,
    },
  ];

  for (let i = 0; i < users.length; i++) {
    users[i]["id"] = i;
  }

  return (
    <Box sx={{ height: 400, width: { lg: "70%", md: "80%", xs: "100%" } }}>
      <ConfirmationModalBooks
        open={open}
        setOpen={setOpen}
        confirmStatus={updateUser}
      />
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{ borderRadius: "20px", boxShadow: 2 }}
      />
    </Box>
  );
}
