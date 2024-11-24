"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Collapse,
  IconButton,
  Box,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TbMessageMinus, TbMessageReply } from "react-icons/tb";
import { MdCancelScheduleSend } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

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
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
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
                      <Typography color="textSecondary">
                        No reply yet
                      </Typography>
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
                      <TbMessageReply className="text-black" />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(msg._id)}
                      color="error"
                      aria-label="delete"
                    >
                      <TbMessageMinus className="text-[#A53E4C]" />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                  >
                    <Collapse
                      in={openRows[msg._id]}
                      timeout="auto"
                      unmountOnExit
                    >
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
          }}
        >
          <Typography
            id="reply-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            <div className="text-center tracking-widest text-sm font-bold">
              REPLY TO MESSAGE
            </div>
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
          <Box mt={2} className="flex justify-end gap-4">
            {/* Cancel Button */}
            <button
              onClick={handleCloseModal}
              className="flex items-center bg-black  hover:bg-[#A53E4C] text-white font-semibold py-2 px-4 transition duration-300"
            >
              <span className="mr-2">Cancel</span>
              <MdCancelScheduleSend />
            </button>

            {/* Send Reply Button */}
            <button
              onClick={handleSendReply}
              disabled={!reply.trim()}
              className={`flex items-center bg-[#A53E4C]  hover:bg-black text-white font-semibold py-2 px-4 transition duration-300 ${
                !reply.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="mr-2">Send Reply</span>
              <IoMdSend className="text-white" />
            </button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminMessagesTable;
