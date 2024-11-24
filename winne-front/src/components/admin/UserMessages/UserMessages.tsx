"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FaChevronRight } from "react-icons/fa";

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
      setError(error.message || "Failed to fetch messages.");
      window.location.href = "/account/login";
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
    <>
      <div className="relative w-full h-[404px]">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348"
          alt="Wishlist Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-[46px]  mb-2">Your Messages</h1>
          <p className="text-white text-[15px] flex items-center gap-2">
            <a href="/" className="hover:text-[#A53E4C]">
              Home
            </a>
            <span>
              <FaChevronRight className="text-[10px]" />
            </span>
            Your Messages
          </p>
        </div>
      </div>
      <Box p={4} maxWidth="1140px" mx="auto" minHeight="100vh">
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        {messages.length === 0 ? (
          (window.location.href = "/contact")
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Message</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Winne Reply</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Submitted</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg._id}>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell>{msg.message}</TableCell>
                    <TableCell>
                      <Typography
                        color={msg.adminReply ? "black" : "textSecondary"}
                      >
                        {msg.adminReply || "No reply yet."}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(msg.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default UserMessages;
