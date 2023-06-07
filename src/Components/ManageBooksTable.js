import React, { useState } from "react";
import { Box, Button, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../CSS/UsersManageTable.css";
import axios from "axios";
import ConfirmationModalBooks from "./ConfirmationModalBooks";
import { useSnackbar } from "notistack";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";

export default function ManageBooksTable({ books, showBooks }) {
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const updateStatus = async (e) => {
    console.log(currentRow);

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/Vendor/StatusBook/${currentRow}`,
      headers: { Authorization: basicAuthHeader },
    })
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        showBooks();
        enqueueSnackbar("Book Status Updated successfully", {
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
        enqueueSnackbar("Unable to Update Status", {
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
      field: "title",
      headerName: "Title",
      width: 300,
      editable: false,
    },
    {
      field: "authorName",
      headerName: "Author Name",
      width: 180,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      editable: false,
    },
    {
      field: "quantityInStore",
      headerName: "QuantityInStore",
      sortable: false,
      width: 150,
    },
    {
      field: "isbn",
      headerName: "ISBN",
      sortable: false,
      width: 190,
    },
    {
      field: "isActive",
      headerName: "Change Status",
      renderCell: (params) => {
        const handleChange = () => {
          setCurrentRow(params.row.bookID);
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

  for (let i = 0; i < books.length; i++) {
    books[i]["id"] = i;
  }

  return (
    <Box sx={{ height: 480, width: { lg: "100%", md: "100%", xs: "100%" } }}>
      <ConfirmationModalBooks
        open={open}
        setOpen={setOpen}
        confirmStatus={updateStatus}
      />
      <DataGrid
        rows={books}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[7]}
        disableRowSelectionOnClick
        sx={{ borderRadius: "20px", boxShadow: 2 }}
      />
    </Box>
  );
}
