import React from "react";
import Tooltip from "@/components/Tooltip/Tooltip";

interface TooltipType {
  text: string;
  color: string;
}

interface Item {
  text: string;
  href: string;
  tooltip?: TooltipType;
}

interface Category {
  title: string;
  items: Item[];
}

interface DropdownProps {
  categories: Category[];
}

const Dropdown: React.FC<DropdownProps> = ({ categories }) => {
  return (
    <div className="flex w-[1100px] h-[523px] justify-between">
      {categories.map((category, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <a className="hover:text-[#982B2B] transition-all relative" href="#">
            {category.title}
            <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
          </a>
          <ul className="flex flex-col gap-2 font-normal text-gray-500">
            {category.items.map(({ text, href, tooltip }, idx) => (
              <li key={idx} className="relative">
                <a className="hover:text-[#982B2B] transition-all" href={href}>
                  {text}
                </a>
                {tooltip && (
                  <Tooltip text={tooltip.text} color={tooltip.color} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
