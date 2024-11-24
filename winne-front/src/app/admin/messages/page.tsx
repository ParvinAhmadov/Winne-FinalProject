"use client";
import React, { useState, useEffect } from "react";
import { Message } from "@/types";
import AdminMessagesTable from "./AdminMessagesTable";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";

const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found.");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages.");
      }

      const data: Message[] = await response.json();
      setMessages(data);
    } catch (error: any) {
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (id: string, reply: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found.");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages/${id}/reply`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ adminReply: reply }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reply.");
      }

      fetchMessages();
    } catch (error: any) {
      console.error("Error sending reply:", error.message || error);
      setError(error.message || "Failed to send reply.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found.");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete message.");
      }

      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== id)
      );
    } catch (error: any) {
      console.error("Error deleting message:", error.message || error);
      setError(error.message || "Failed to delete message.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f5f5f5"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {messages.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No messages found.
        </Typography>
      ) : (
        <AdminMessagesTable
          messages={messages}
          onReply={handleReply}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
};

export default AdminMessagesPage;
