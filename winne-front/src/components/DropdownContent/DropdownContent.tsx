import { motion } from "framer-motion";

interface DropdownContentProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  customStyles?: string;
}

const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  width = "300px",
  height = "auto",
  customStyles = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      className={`absolute bg-white ${width} ${height} ${customStyles}`}
    >
      {children}
    </motion.div>
  );
};

export default DropdownContent;
