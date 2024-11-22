"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  createdAt: string;
}

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
        );
        const data = await response.json();
        if (data.blogs) {
          setBlogs(data.blogs);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <div className="relative w-full h-[200px] md:h-[404px] bg-cover bg-center">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348"
          alt="Header Background"
          layout="fill"
          objectFit="cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center ">
          <h1 className="text-white text-[24px] md:text-[46px] font-semibold mb-2">
            News
          </h1>
          <p className="text-white text-[12px] md:text-[15px] flex items-center gap-2">
            <Link href="/" className="hover:text-[#A53E4C]">
              Home
            </Link>
            <span>
              <FaChevronRight className="text-[8px] md:text-[10px]" />
            </span>
            News
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="flex justify-center">
            <div className="w-full max-w-[1040px] flex flex-col gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex flex-col md:flex-row items-start gap-6 bg-white border-b pb-6 md:pb-12 mb-6"
                >
                  <div className="relative w-full md:w-[531px] h-[200px] md:h-[354px] overflow-hidden group flex-shrink-0">
                    <Link href={`/blogs/${blog.slug}`}>
                      <Image
                        src={blog.image || "/placeholder.png"}
                        alt={blog.title}
                        layout="fill"
                        objectFit="cover"
                        className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  <div className="w-full md:w-[505px] flex flex-col text-[#A53E4C]">
                    <h2 className="text-[10px] md:text-[12px] font-semibold mb-1">
                      NEWS
                    </h2>
                    <h2 className="text-[20px] md:text-[25px] font-semibold text-[#212529] mb-2 transition-all ease-in-out duration-300 hover:text-[#A53E4C]">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h2>

                    <p className="text-[#A8A8A8] text-[14px] md:text-[16px] mb-4">
                      {blog.content.slice(0, 100)}...
                    </p>
                    <p className="text-[#A8A8A8] flex items-center gap-2 text-[13px] md:text-[15px] mb-2">
                      <span>NOVEMBER</span>
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
