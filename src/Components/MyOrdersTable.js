import React, { useState } from "react";
import { Box, Button, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../CSS/UsersManageTable.css";
import axios from "axios";
import ConfirmationModalBooks from "./ConfirmationModalBooks";
import { useSnackbar } from "notistack";
import { basicAuthHeader } from "../Utilities/basicAuthHeader";
import { useNavigate } from "react-router-dom";

export default function MyOrdersTable({ orders, showOrders }) {
  const user = JSON.parse(localStorage.getItem("user")).userID;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      field: "orderID",
      headerName: "Order Id",
      width: 300,
      editable: false,
    },
    {
      field: "orderTotal",
      headerName: "Order Total",
      width: 180,
      editable: false,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 120,
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      sortable: false,
      width: 150,
    },
    {
      field: "transactionId",
      headerName: "Transaction Id",
      sortable: false,
      width: 190,
    },
    {
      field: "viewOrder",
      headerName: "View Order",
      renderCell: (params) => {
        const onSubmit = () => {
          navigate(`/orderhistory/${user}/${params.row.orderID}`);
        };

        return (
          <Button variant="outlined" size="small" onClick={onSubmit}>
            View Order
          </Button>
        );
      },

      sortable: false,
      width: 120,
    },
  ];

  for (let i = 0; i < orders.length; i++) {
    orders[i]["id"] = i;
  }

  return (
    <Box sx={{ height: 480, width: { lg: "100%", md: "100%", xs: "100%" } }}>
      <DataGrid
        rows={orders}
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
