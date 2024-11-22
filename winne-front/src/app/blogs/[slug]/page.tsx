"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  createdAt: string;
  tags: string[];
}

const BlogDetailPage = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`
        );
        const data = await response.json();
        if (data.blog) {
          setBlog(data.blog);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative w-full h-64">
        <Image
          src={blog.image || "/placeholder.png"}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mt-6">{blog.title}</h1>
      <p className="text-gray-600 mt-2">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="mt-6">
        <p className="text-gray-700 leading-relaxed">{blog.content}</p>
      </div>
      {blog.tags?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Tags:</h2>
          <div className="flex flex-wrap mt-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;
