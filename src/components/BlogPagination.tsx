import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPostId: number;
  posts: Array<{ id: number; title: string }>;
  theme: string;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPostId,
  posts,
  theme,
}) => {
  // Find current post index
  const currentIndex = posts.findIndex((post) => post.id === currentPostId);

  // Get previous and next posts
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  if (!prevPost && !nextPost) return null;

  return (
    <div
      className="flex justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
      data-oid="xmyf753"
    >
      {prevPost ? (
        <Link
          to={`/blog/${prevPost.id}`}
          className={`flex items-center p-4 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-white hover:bg-gray-100"
          } transition-colors shadow-md w-[48%]`}
          data-oid="fzps8wl"
        >
          <ChevronLeft
            className="h-5 w-5 mr-2 flex-shrink-0"
            data-oid="eon-24b"
          />

          <div className="overflow-hidden" data-oid="szpq8_z">
            <p className="text-sm text-gray-500 font-mono" data-oid=":tn413f">
              Previous
            </p>
            <p
              className="font-bold font-mono text-sm truncate"
              data-oid="lsy:ntf"
            >
              {prevPost.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="w-[48%]" data-oid="a24n1f8"></div>
      )}

      {nextPost ? (
        <Link
          to={`/blog/${nextPost.id}`}
          className={`flex items-center justify-end p-4 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-white hover:bg-gray-100"
          } transition-colors shadow-md w-[48%] text-right`}
          data-oid="n1owfzc"
        >
          <div className="overflow-hidden" data-oid="jn9puo_">
            <p className="text-sm text-gray-500 font-mono" data-oid=":8hv630">
              Next
            </p>
            <p
              className="font-bold font-mono text-sm truncate"
              data-oid="007k6k-"
            >
              {nextPost.title}
            </p>
          </div>
          <ChevronRight
            className="h-5 w-5 ml-2 flex-shrink-0"
            data-oid="wzl5pm5"
          />
        </Link>
      ) : (
        <div className="w-[48%]" data-oid="oc2iyx5"></div>
      )}
    </div>
  );
};

export default BlogPagination;
