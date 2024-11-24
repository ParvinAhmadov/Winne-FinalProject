import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

interface Product {
  name: string;
  price: number;
  stock: number;
  remainingStock: number;
  slug: string;
  images: string[];
  bestSeller: boolean;
  tags: string[];
  sizes: string[];
  colors: (string | { name: string })[];
}

interface ProductsTableProps {
  products: Product[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

interface RowProps {
  product: Product;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

const Row: React.FC<RowProps> = ({ product, index, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const formatColors = (colors: (string | { name: string })[]) => {
    return colors
      .map((color) => (typeof color === "string" ? color : color.name))
      .join(", ");
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {product.images.length > 0 ? (
            <Image
              src={`${baseURL}${product.images[0]}`}
              alt={product.name}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <p className="text-gray-500">No Image</p>
          )}
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell align="center">${product.price}</TableCell>
        <TableCell align="center">{product.stock}</TableCell>
        <TableCell align="center">{product.remainingStock}</TableCell>
        <TableCell align="center">{product.sizes.join(", ")}</TableCell>
        <TableCell align="center">{formatColors(product.colors)}</TableCell>
        <TableCell align="center">{product.tags.join(", ")}</TableCell>
        <TableCell align="center">
          {product.bestSeller ? "Yes" : "No"}
        </TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <p className="text-gray-500">Slug: {product.slug}</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onDelete,
  onEdit,
}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Images</TableCell>
          <TableCell>Name</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">Stock</TableCell>
          <TableCell align="center">Remaining Stock</TableCell>
          <TableCell align="center">Sizes</TableCell>
          <TableCell align="center">Colors</TableCell>
          <TableCell align="center">Tags</TableCell>
          <TableCell align="center">Best Seller</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, index) => (
          <Row
            key={index}
            product={product}
            index={index}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ProductsTable;
