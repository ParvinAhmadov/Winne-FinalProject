interface TooltipProps {
  text: string;
  color: string;
  positionStyles?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, color, positionStyles }) => {
  return (
    <span
      className={`absolute text-white text-[9px] px-1 bottom-4  ${color} ${positionStyles}`}
    >
      {text}
      <span
        className={`absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-[1px] border-r-[10px] border-t-[4px] border-transparent`}
        style={{ borderTopColor: getColorCode(color) }}
      />
    </span>
  );
};

const getColorCode = (color: string) => {
  const colorMapping: { [key: string]: string } = {
    "bg-green-400": "#22c55e",
    "bg-red-600": "#dc2626",
    "bg-blue-700": "#1d4ed8",
  };

  return colorMapping[color];
};

export default Tooltip;
