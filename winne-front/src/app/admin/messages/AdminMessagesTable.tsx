"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Collapse, IconButton, Box, Typography, Modal, TextField, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FaReply } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  adminReply: string;
  createdAt: string;
}

interface AdminMessagesTableProps {
  messages: Message[];
  onReply: (id: string, reply: string) => void;
  onDelete: (id: string) => void;
}

const AdminMessagesTable: React.FC<AdminMessagesTableProps> = ({
  messages,
  onReply,
  onDelete,
}) => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [reply, setReply] = useState<string>("");

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenModal = (id: string) => {
    setSelectedMessageId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMessageId(null);
    setReply("");
  };

  const handleSendReply = () => {
    if (selectedMessageId) {
      onReply(selectedMessageId, reply);
    }
    handleCloseModal();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Admin Reply</TableCell>
              <TableCell>Received</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((msg) => (
              <React.Fragment key={msg._id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => toggleRow(msg._id)}
                      aria-label="expand row"
                    >
                      {openRows[msg._id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell>{msg.message}</TableCell>
                  <TableCell>
                    {msg.adminReply || (
                      <Typography color="textSecondary">No reply yet</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(msg.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleOpenModal(msg._id)}
                      color="primary"
                      aria-label="reply"
                    >
                      <FaReply />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(msg._id)}
                      color="error"
                      aria-label="delete"
                    >
                      <FiDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={openRows[msg._id]} timeout="auto" unmountOnExit>
                      <Box margin={2}>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Full Message:</strong> {msg.message}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Admin Reply:</strong>{" "}
                          {msg.adminReply || "No reply yet"}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="reply-modal-title"
        aria-describedby="reply-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="reply-modal-title" variant="h6" component="h2" gutterBottom>
            Reply to Message
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your reply here..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            variant="outlined"
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendReply}
              disabled={!reply.trim()}
            >
              Send Reply
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminMessagesTable;
