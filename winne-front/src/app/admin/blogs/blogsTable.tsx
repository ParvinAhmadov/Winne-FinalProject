import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";

interface Blog {
  title: string;
  author: string;
  tags: string[];
  slug: string;
  content: string;
  image: string | null;
}

interface RowProps {
  blog: Blog;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

interface BlogsTableProps {
  blogs: Blog[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

const getImageSrc = (image: string | null): string => {
  if (!image) return "/placeholder.png";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  return `${baseURL}${image}`;
};

const BlogRow: React.FC<RowProps> = ({ blog, index, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Image
            src={getImageSrc(blog.image)}
            alt={blog.title}
            width={40}
            height={40}
            className="object-cover"
          />
        </TableCell>
        <TableCell>{blog.title}</TableCell>
        <TableCell>{blog.author}</TableCell>
        <TableCell>{blog.tags.join(", ")}</TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() => onEdit(index)}
            aria-label="edit"
            className="text-black text-[22px]"
          >
            <FaRegEdit />
          </IconButton>
          <IconButton
            onClick={() => onDelete(index)}
            aria-label="delete"
            className="text-[#A53E4C] text-[22px]"
          >
            <FiDelete />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <p className="text-gray-500">Slug: {blog.slug}</p>
              <p className="text-gray-500">Content: {blog.content}</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const BlogsTable: React.FC<BlogsTableProps> = ({ blogs, onDelete, onEdit }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Image</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Tags</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {blogs.map((blog, index) => (
          <BlogRow
            key={index}
            blog={blog}
            index={index}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default BlogsTable;
