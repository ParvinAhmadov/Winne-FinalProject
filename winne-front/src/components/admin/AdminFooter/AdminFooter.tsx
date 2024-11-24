import React from "react";

const AdminFooter: React.FC = () => {
  return (
    <footer
      className="relative bg-Fotterbg px-6 py-4"
      style={{
        backgroundImage:
          "url('https://winne-store-demo.myshopify.com/cdn/shop/files/img-newsletter.png?v=1653967928')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative">
        <p className="text-white text-sm z-10">2024 © Winne-Wine & Winery</p>
      </div>
    </footer>
  );
};

export default AdminFooter;
