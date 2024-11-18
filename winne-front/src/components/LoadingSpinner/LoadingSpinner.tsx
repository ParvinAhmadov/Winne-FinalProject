import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div
        className="animate-spin-x"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <picture>
          <img
            src="https://bravofarms.com/cdn/shop/products/red-wine.jpg?v=1646253890"
            alt="Loading..."
            className="w-40 h-40"
          />
        </picture>
      </div>
    </div>
  );
};

export default LoadingSpinner;
