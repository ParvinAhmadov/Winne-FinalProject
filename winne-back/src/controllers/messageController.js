const Message = require("../models/Message");

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const messages = await Message.find({ email: userEmail });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user messages." });
  }
};

const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminReply } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { adminReply },
      { new: true }
    );

    if (!updatedMessage)
      return res.status(404).json({ error: "Message not found" });

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found." });
    }

    res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the message." });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getUserMessages,
  replyToMessage,
  deleteMessage,
};
