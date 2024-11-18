import React from "react";
interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {icon}
    </div>
  );
};

export default IconButton;
