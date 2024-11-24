"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/orders/admin/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching admin orders:", error.message);
        } else {
          console.error("Unknown error fetching admin orders:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3001/api/orders/admin/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        console.log(`Order ${orderId} status updated to ${newStatus}`);
      } else {
        console.error(`Failed to update status for order ${orderId}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating order status:", error.message);
      } else {
        console.error("Unknown error updating order status:", error);
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">Order Name</TableCell>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell align="center">{order._id}</TableCell>
                <TableCell align="center">
                  {order.items.map((item: any) => item.name).join(", ")}
                </TableCell>
                <TableCell align="center">{order.userId}</TableCell>
                <TableCell align="center">
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(order._id, e.target.value as string)
                    }
                    fullWidth
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center">
                  ${order.amount?.toFixed(2) || "N/A"}
                </TableCell>
                <TableCell align="center">
                  {order.items.map((item: any, index: number) => (
                    <div key={index}>
                      <strong>{item.name}</strong> x {item.quantity} ($
                      {item.price})
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminOrders;
