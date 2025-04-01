import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
}

interface BlogPostPageProps {
  posts: BlogPost[];
  theme: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ posts, theme }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);

    // If post not found, redirect to blog list
    if (!post && posts.length > 0) {
      navigate("/blog");
    }
  }, [post, posts, navigate]);

  if (!post) {
    return (
      <div className="py-16 text-center" data-oid="e_zsmdi">
        <p className="text-xl font-mono" data-oid="d28jtjj">
          Post not found
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center mt-4 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm transition-colors"
          data-oid="l3ikurk"
        >
          <ArrowLeft className="mr-2 h-4 w-4" data-oid="geclyi:" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: `Check out this article: ${post.title}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((error) => console.log("Error copying to clipboard", error));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8" data-oid="82g9_su">
      <div className="mb-8" data-oid="cefh9jc">
        <Link
          to="/blog"
          className="inline-flex items-center px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm transition-colors"
          data-oid="u8k48df"
        >
          <ArrowLeft className="mr-2 h-4 w-4" data-oid="6v0g2p5" />
          Back to Blog
        </Link>
      </div>

      <article
        className={`rounded-lg overflow-hidden shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
        data-oid="54g.ywm"
      >
        <div className="relative h-64 md:h-96" data-oid="87uepyo">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            data-oid="od89k.g"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            data-oid="fu2bup5"
          ></div>
          <div
            className="absolute bottom-0 left-0 p-6 md:p-8"
            data-oid="f-csodt"
          >
            <h1
              className="text-2xl md:text-4xl font-bold text-white font-mono mb-2"
              data-oid="uiqgu-e"
            >
              {post.title}
            </h1>
            <div
              className="flex items-center text-white/80 text-sm"
              data-oid="1a:-wu."
            >
              <div className="flex items-center mr-4" data-oid="9yc83.1">
                <Calendar className="h-4 w-4 mr-1" data-oid="525eym2" />
                <span data-oid="x1gppjg">{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center" data-oid="h_p8qka">
                <Clock className="h-4 w-4 mr-1" data-oid="8ebi-t4" />
                <span data-oid="imifj-7">{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8" data-oid="--x:thd">
          <div className="flex justify-end mb-6" data-oid="do1ld8x">
            <button
              onClick={sharePost}
              className="inline-flex items-center px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-mono text-sm transition-colors"
              data-oid="qlj1nbp"
            >
              <Share2 className="mr-2 h-4 w-4" data-oid="c1gyvjp" />
              Share
            </button>
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none font-mono"
            data-oid="ob7d:k3"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} data-oid="ggmx:iw">
              {post.content}
            </ReactMarkdown>
          </div>

          <div
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            data-oid="2pca7k5"
          >
            <h3 className="text-xl font-bold mb-4 font-mono" data-oid="b4wb.2l">
              Related Posts
            </h3>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="hl2zhek"
            >
              {posts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className={`block p-4 rounded-lg ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
                    data-oid="wxa.tja"
                  >
                    <div className="flex items-start" data-oid="kyu.8_2">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-16 h-16 object-cover rounded mr-4"
                        data-oid="tecgoi3"
                      />

                      <div data-oid="5-z-81m">
                        <h4
                          className="font-bold font-mono text-sm mb-1"
                          data-oid="4hw2m7e"
                        >
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-500" data-oid="w-kttsr">
                          {relatedPost.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
