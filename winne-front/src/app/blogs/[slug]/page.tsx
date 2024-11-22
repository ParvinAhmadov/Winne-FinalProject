"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MdChevronRight, MdComment } from "react-icons/md";
import Link from "next/link";
import { CiClock2 } from "react-icons/ci";
import { FaPinterestP, FaTwitter, FaUser, FaFacebookF } from "react-icons/fa";
import RelatedPost from "@/components/Blogs/Related post/RelatedPost";
import ClipLoader from "react-spinners/ClipLoader";

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
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <ClipLoader color="#A53E4C" size={60} />
      </div>
    );
  }

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found</p>;
  }

  return (
    <div className="max-w-[1450px] w-full mx-auto  pb-8 px-4 md:px-8 lg:px-0">
      <nav className="text-[#898989] mb-4 md:mb-6 flex items-center gap-1 text-xs md:text-sm lg:text-base">
        <Link href="/" className="hover:text-[#A53E4C]">
          Home
        </Link>
        <MdChevronRight />
        <span className="text-[#A53E4C] font-semibold text-sm">
          {blog.title}
        </span>
      </nav>

      <div className="relative w-full h-[300px] sm:h-[500px] lg:h-[940px] overflow-hidden">
        <Image
          src={blog.image || "/placeholder.png"}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="block"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#212529] via-black/10 to-transparent flex flex-col justify-end px-6 py-8 text-white">
          <div className="flex flex-col justify-center items-start md:items-center text-left md:text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {blog.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 text-xs sm:text-sm lg:text-base space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="flex items-center gap-2">
                <FaUser className="text-[10px]" />
                Winne-store-demo Admin
              </p>
              <p className="flex items-center gap-1">
                <CiClock2 />
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center space-x-1">
                <MdComment />
                <span>0 Comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full ">
        <p className="text-sm sm:text-base lg:text-lg text-[#A8A8A8]">
          {blog.content}
        </p>
      </div>

      {blog.tags?.length > 0 && (
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-10">
          <div className="flex items-center gap-6">
            <h2 className="text-[12px] sm:text-[14px] lg:text-[16px] font-semibold tracking-widest">
              TAGS :
            </h2>
            <div className="flex flex-wrap items-center text-center border border-black gorup hover:border-white hover:text-white hover:bg-[#A53E4C] transition-all ease-in-out duration-300 cursor-pointer  ml-4 px-4 py-1">
              {blog.tags.map((tag, index) => (
                <a
                  href="/blogs"
                  key={index}
                  className="px-3 py-1 text-xs sm:text-sm lg:text-base font-medium "
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <ul className="flex items-center gap-2">
              <li className="border p-2 bg-gray-200 hover:bg-[#A53E4C] hover:text-white cursor-pointer transition-all">
                <FaTwitter />
              </li>
              <li className="border p-2 bg-gray-200 hover:bg-[#A53E4C] hover:text-white cursor-pointer transition-all">
                <FaFacebookF />
              </li>
              <li className="border p-2 bg-gray-200 hover:bg-[#A53E4C] hover:text-white cursor-pointer transition-all">
                <FaPinterestP />
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="mt-12">
        <RelatedPost />
      </div>
    </div>
  );
};

export default BlogDetailPage;
