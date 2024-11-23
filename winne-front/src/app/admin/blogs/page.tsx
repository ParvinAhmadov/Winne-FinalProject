"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

interface Blog {
  _id?: string;
  title: string;
  content: string;
  slug: string;
  author: string;
  tags: string[];
  image: string | File | null;
}

const tagOptions = [
  { label: "Trending", value: "Trending" },
  { label: "Informative", value: "Informative" },
  { label: "Popular", value: "Popular" },
];

const animatedComponents = makeAnimated();

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState<Blog>({
    title: "",
    content: "",
    slug: "",
    author: "",
    tags: [],
    image: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
        );
        if (!response.ok) throw new Error("Failed to fetch blogs.");
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Fetch Blogs Error:", error);
        toast.error("Error fetching blogs.");
      }
    };
    fetchBlogs();
  }, []);

  const resetModal = () => {
    setNewBlog({
      title: "",
      content: "",
      slug: "",
      author: "",
      tags: [],
      image: null,
    });
    setEditIndex(null);
  };

  const handleSaveBlog = async () => {
    try {
      const formData = new FormData();
      Object.entries(newBlog).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else if (key === "tags") {
          formData.append(key, (value as string[]).join(", "));
        } else {
          formData.append(key, value as string);
        }
      });

      const url =
        editIndex !== null
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogs[editIndex].slug}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`;

      const method = editIndex !== null ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error("Failed to save blog.");

      toast.success(
        `Blog ${editIndex !== null ? "updated" : "added"} successfully!`
      );
      setIsModalOpen(false);
      resetModal();
      window.location.reload();
    } catch (error) {
      console.error("Save Blog Error:", error);
      toast.error("Error saving blog.");
    }
  };

  const handleDeleteBlog = async (index: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogs[index]._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete blog.");

      toast.success("Blog deleted successfully!");
      setBlogs((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  const getImageSrc = (image: string | null): string => {
    if (!image) return "/placeholder.png";
    if (image.startsWith("http://") || image.startsWith("https://"))
      return image;
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    return `${baseURL}${image}`;
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
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
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <IconButton size="small">
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={getImageSrc(blog.image as string)}
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
                      onClick={() => {
                        setEditIndex(index);
                        setNewBlog(blogs[index]);
                        setIsModalOpen(true);
                      }}
                      aria-label="edit"
                      className="text-black text-[22px]"
                    >
                      <FaRegEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteBlog(index)}
                      aria-label="delete"
                      className="text-[#A53E4C] text-[22px]"
                    >
                      <FiDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button
        onClick={() => {
          setIsModalOpen(true);
          resetModal();
        }}
        className="bg-green-700 text-white px-4 py-2 mt-4 hover:bg-green-500 transition ease-in-out duration-200"
      >
        Add Blog
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 border shadow-xl w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">
              {editIndex !== null ? "Edit Blog" : "Add Blog"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, title: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Slug</label>
                <input
                  type="text"
                  value={newBlog.slug}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, slug: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Author</label>
                <input
                  type="text"
                  value={newBlog.author}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, author: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Content</label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, content: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="col-span-2">
                <label>Tags</label>
                <Select
                  isMulti
                  options={tagOptions}
                  components={animatedComponents}
                  onChange={(selectedOptions) =>
                    setNewBlog({
                      ...newBlog,
                      tags: selectedOptions.map((option) => option.value),
                    })
                  }
                  value={tagOptions.filter((option) =>
                    newBlog.tags.includes(option.value)
                  )}
                />
              </div>
              <div className="col-span-2">
                <label>Image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setNewBlog({
                      ...newBlog,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleSaveBlog}
                className="bg-green-700 text-white px-4 py-2 hover:bg-green-500 transition ease-in-out duration-200"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetModal();
                }}
                className="bg-black text-white px-4 py-2 hover:bg-[#A53E4C] transition ease-in-out duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
