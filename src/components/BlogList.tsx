import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

interface BlogListProps {
  posts: BlogPost[];
  theme: string;
}

const BlogList: React.FC<BlogListProps> = ({ posts, theme }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8" data-oid="t2m-wtz">
      {posts.map((post) => (
        <article
          key={post.id}
          className={`rounded-lg overflow-hidden shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
          data-oid="xlct3bd"
        >
          <div className="md:flex" data-oid="b-k_e6a">
            <div className="md:w-1/3" data-oid=".d1f.:b">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover md:h-full"
                style={{ maxHeight: "200px" }}
                data-oid="wvbaq3p"
              />
            </div>
            <div className="p-6 md:w-2/3" data-oid="-sl6ul8">
              <h3
                className="text-xl font-bold mb-2 font-mono"
                data-oid="jjua5ry"
              >
                {post.title}
              </h3>

              <div
                className="flex items-center mb-3 text-sm text-gray-500"
                data-oid="g:t3zmm"
              >
                <div className="flex items-center mr-4" data-oid="i9_jbvp">
                  <Calendar className="h-4 w-4 mr-1" data-oid="gvsn.t." />
                  <span data-oid="6el0bm.">{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center" data-oid="beoj8:_">
                  <Clock className="h-4 w-4 mr-1" data-oid="2pa-kvk" />
                  <span data-oid="jg1dvoz">{post.readTime}</span>
                </div>
              </div>

              <p className="mb-4 font-mono text-sm" data-oid="rqx.x4v">
                {post.excerpt}
              </p>

              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm transition-colors"
                data-oid="uln-4bw"
              >
                Read Article
                <ArrowRight className="ml-2 h-4 w-4" data-oid="61aehgx" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
