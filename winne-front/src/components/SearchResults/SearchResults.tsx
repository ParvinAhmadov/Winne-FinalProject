import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?query=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data); // Gelen sonuçları state'e atıyoruz
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold">Start typing and hit Enter</h1>
      <div className="flex justify-center items-center mt-4">
        <div className="relative w-[90%] md:w-[900px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Arama metnini state'e yazıyoruz
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(); // Enter'a basınca arama yapılır
            }}
            placeholder="Search Anything"
            className="py-[8px] px-[10px] outline-none h-[44px] border-b-2 border-gray-200 w-full pr-10"
          />
          <FiSearch
            className="absolute right-3 top-2 text-black text-[20px] hover:text-[#982B2B] transition-all ease-in-out duration-200 cursor-pointer"
            onClick={handleSearch} // Arama butonuna tıklayınca arama yapılır
          />
        </div>
      </div>

      {/* Arama sonuçlarını göstermek */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {searchResults.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.name} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
