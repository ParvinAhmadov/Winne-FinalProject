"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  createdAt: string;
}

const OurBlogSection: React.FC = () => {
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
          setBlogs(data.blogs.slice(0, 3));
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
    <section className="py-10 bg-white">
      <div className="max-w-[1450px] w-full px-4 md:px-0 mx-auto space-y-10">
        {blogs.map((blog, index) => (
          <div
            key={blog._id}
            className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full md:w-1/2 group">
              <Link href={`/blogs/${blog.slug}`}>
                <picture>
                  <img
                    src={blog.image || "/placeholder.png"}
                    alt={blog.title}
                    className="w-full h-auto object-cover transition-transform ease-in-out duration-300  group-hover:grayscale"
                  />
                </picture>
              </Link>
            </div>

            <div className="w-full md:w-1/2 text-start">
              <h2 className="text-2xl md:text-2xl font-semibold text-[#212529] mb-4">
                {blog.title}
              </h2>
              <p className="text-[#A8A8A8] text-[14px] md:text-[16px] mb-4">
                {blog.content.slice(0, 220)}...
              </p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-block px-8 py-2 border border-black text-black font-medium hover:bg-[#A53E4C] hover:border-white hover:text-white transition-colors duration-300"
              >
                READ MORE
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurBlogSection;
