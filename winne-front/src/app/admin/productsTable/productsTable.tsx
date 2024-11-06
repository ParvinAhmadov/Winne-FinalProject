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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image"; // Import Next.js Image component

interface Product {
  name: string;
  price: number;
  stock: number;
  remainingStock: number;
  slug: string;
  images: string[];
  bestSeller: boolean;
}

interface productsTableProps {
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

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell align="right">${product.price}</TableCell>
        <TableCell align="right">{product.stock}</TableCell>
        <TableCell align="right">{product.remainingStock}</TableCell>
        <TableCell align="center">{product.bestSeller ? "Yes" : "No"}</TableCell>
        <TableCell>
          {product.images.map((image, i) => (
            <Image
              key={i}
              src={`${baseURL}${image}`}
              alt={product.name}
              width={40} // Set appropriate width
              height={40} // Set appropriate height
              className="object-cover"
            />
          ))}
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => onEdit(index)} aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(index)} aria-label="delete" color="secondary">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
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

const productsTable: React.FC<productsTableProps> = ({ products, onDelete, onEdit }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Stock</TableCell>
          <TableCell align="right">Remaining Stock</TableCell>
          <TableCell align="center">Best Seller</TableCell>
          <TableCell>Images</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, index) => (
          <Row key={index} product={product} index={index} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default productsTable;
