import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface NavItemProps {
  label: string;
  href?: string;
  dropdownContent?: React.ReactNode;
  isHot?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  href = "#",
  dropdownContent,
  isHot,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
    >
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={
          isOpen
            ? { width: textRef.current?.offsetWidth, opacity: 1 }
            : { width: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 border-b border-[#982B2B]"
      />
      <span ref={textRef} className="relative z-10">
        <a href={href} className="hover:text-[#982B2B]">
          {label.toUpperCase()}
        </a>
      </span>
      {isHot && (
        <span className="absolute left-2/2 transform -translate-x-1/2 -top-5 bg-red-600 text-white text-[8px] px-1">
          HOT
          <span className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-[1px] border-r-[10px] border-t-[5px] border-transparent border-t-red-600 -mt-[2%]" />
        </span>
      )}
      {isOpen && dropdownContent}
    </li>
  );
};

export default NavItem;
