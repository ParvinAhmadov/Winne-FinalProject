import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  price: string;
  oldPrice?: string;
  img: string;
}

const ProductSwiper: React.FC = () => {
  const products: Product[] = [
    {
      name: "Champagne",
      price: "$70.00",
      img: "https://winne-store-demo.myshopify.com/cdn/shop/products/6.1.png?v=1652686425",
    },
    {
      name: "Red Wine",
      price: "$60.00",
      img: "https://winne-store-demo.myshopify.com/cdn/shop/products/5.1.png?v=1652686215",
    },
    {
      name: "Heavy Alcohol",
      oldPrice: "$67.00",
      price: "$60.00",
      img: "https://winne-store-demo.myshopify.com/cdn/shop/products/3.1.png?v=1652685966",
    },
    {
      name: "Light Liquor",
      oldPrice: "$65.00",
      price: "$55.00",
      img: "https://winne-store-demo.myshopify.com/cdn/shop/products/4.1.png?v=1652686062",
    },
  ];

  return (
    <Swiper
      direction="vertical"
      spaceBetween={20}
      slidesPerView={3}
      loop={false}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="h-[417px]"
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="w-[255px] h-[111px] overflow-hidden flex gap-2">
            <Link href="#">
              <Image
                src={product.img}
                alt={product.name}
                width={80}
                height={99}
                className="object-cover cursor-pointer"
              />
            </Link>
            <div className="mt-2 text-center flex flex-col gap-4 text-gray-700">
              <h3 className="text-[12px] text-start hover:text-[#982B2B] cursor-pointer">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                {product.oldPrice && (
                  <p className="line-through text-xs text-gray-800">
                    {product.oldPrice}
                  </p>
                )}
                <p className="text-gray-800 text-sm font-semibold">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSwiper;
