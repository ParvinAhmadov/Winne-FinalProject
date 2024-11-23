import React from "react";

const AboutFeatureSection: React.FC = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mx-auto"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Design",
      description:
        "Praesent metus tellus, elementum eu, semper Vestibulum volutpat pretium libero",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mx-auto"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
          <line x1="9.69" y1="8" x2="21.17" y2="8" />
          <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
          <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
          <line x1="14.31" y1="16" x2="2.83" y2="16" />
          <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
        </svg>
      ),
      title: "Innovation",
      description:
        "Praesent metus tellus, elementum eu, semper Vestibulum volutpat pretium libero",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mx-auto"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7V3h18v4M5 11v6M5 17v4M12 11v10M19 11v6M19 17v4" />
        </svg>
      ),
      title: "Journey",
      description:
        "Praesent metus tellus, elementum eu, semper Vestibulum volutpat pretium libero",
    },
  ];

  return (
    <div
      className="relative bg-cover bg-center bg-fixed min-h-[527px] flex items-center mt-6 justify-center"
      style={{
        backgroundImage: `url('https://winne-store-demo.myshopify.com/cdn/shop/files/about1.3.png?v=1654050555')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      <div className="relative z-10 container mx-auto text-center text-white px-4">
        <div className="flex items-center justify-center gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="space-y-4 flex flex-col items-center w-[360px]"
            >
              <div className="text-white mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <div className="border w-[12%]"></div>
              <p className="text-sm text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutFeatureSection;
