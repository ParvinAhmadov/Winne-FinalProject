"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  adminReply: string;
  createdAt: string;
}

const UserMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found.");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages/user`,
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
      console.error("Error fetching user messages:", error);
      setError(error.message || "Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserMessages();
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
    <Box p={4} bgcolor="#f5f5f5" minHeight="100vh">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Messages
      </Typography>

      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {messages.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          You have not submitted any messages yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {messages.map((msg) => (
            <Grid item xs={12} sm={6} md={4} key={msg._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    <strong>Message:</strong> {msg.message}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    color={msg.adminReply ? "primary" : "textSecondary"}
                  >
                    <strong>Admin Reply:</strong>{" "}
                    {msg.adminReply || "No reply yet."}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                    mt={1}
                  >
                    <strong>Submitted:</strong>{" "}
                    {new Date(msg.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserMessages;
