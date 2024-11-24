import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  createdAt: string;
}

const RelatedPost = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
        );
        if (!response.ok) throw new Error("Failed to fetch blogs.");
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-10">
        <p className="text-center text-gray-500">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:py-10">
      <h2 className="text-2xl font-semibold text-[#212529] text-center mb-8 relative">
        RELATED POST
        <div className="w-16 border-b-2 border-orange-400 mx-auto mt-2"></div>
      </h2>
      <div style={{ maxWidth: "1450px", margin: "0 auto" }}>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div
                className="flex flex-col items-start gap-6 bg-white  pb-6 md:pb-12"
                style={{ margin: "0 15px" }}
              >
                <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden group flex-shrink-0 ">
                  <Link href={`/blogs/${blog.slug}`}>
                    <Image
                      src={blog.image || "/placeholder.png"}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                      className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white text-black text-xs px-2 py-1 rounded-full">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </Link>
                </div>

                <div className="w-full flex flex-col text-[#A53E4C]">
                  <h2 className="text-[10px] md:text-[12px] font-semibold mb-1">
                    NEWS
                  </h2>
                  <h2 className="text-[18px] md:text-[22px] font-semibold text-[#212529] mb-2 transition-all ease-in-out duration-300 hover:text-[#A53E4C]">
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <p className="text-[#A8A8A8] text-[14px] md:text-[16px] mb-4">
                    {blog.content.slice(0, 100)}...
                  </p>
                  <p className="text-[#A8A8A8] flex items-center gap-2 text-[13px] md:text-[15px] mb-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-[#212529] text-sm font-medium underline hover:text-[#A53E4C] transition ease-in-out duration-300 inline-block"
                    style={{ textUnderlineOffset: "8px" }}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedPost;
