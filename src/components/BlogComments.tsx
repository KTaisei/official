import React, { useState } from "react";
import { MessageSquare, Send, User } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface BlogCommentsProps {
  postId: number;
  theme: string;
}

const BlogComments: React.FC<BlogCommentsProps> = ({ postId, theme }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "John Doe",
      content: "Great article! I learned a lot from this.",
      date: "2025-03-20",
    },
    {
      id: 2,
      author: "Jane Smith",
      content:
        "I've been looking for this information for a while. Thanks for sharing!",
      date: "2025-03-21",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: comments.length + 1,
      author: "Guest User",
      content: newComment,
      date: new Date().toISOString().split("T")[0],
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div
      className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
      data-oid="5j81yf0"
    >
      <div className="flex items-center mb-6" data-oid="p74f0mq">
        <MessageSquare
          className="h-5 w-5 mr-2 text-blue-500"
          data-oid="mb.xzt7"
        />
        <h3 className="text-xl font-bold font-mono" data-oid="byyjv6c">
          Comments ({comments.length})
        </h3>
      </div>

      <div className="space-y-6 mb-8" data-oid="itqhi:8">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
            data-oid="a01diwh"
          >
            <div className="flex items-center mb-2" data-oid="br6hus9">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                } mr-2`}
                data-oid=".3tt-:1"
              >
                <User className="h-4 w-4" data-oid="wej3-2u" />
              </div>
              <div data-oid=":.tl7ea">
                <p className="font-bold font-mono text-sm" data-oid="tdwqng6">
                  {comment.author}
                </p>
                <p className="text-xs text-gray-500" data-oid="vraek6.">
                  {formatDate(comment.date)}
                </p>
              </div>
            </div>
            <p className="font-mono text-sm" data-oid="r8mflmb">
              {comment.content}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitComment} data-oid="r83cv17">
        <div className="flex flex-col space-y-2" data-oid="3mx7omj">
          <label
            htmlFor="comment"
            className="font-mono text-sm font-bold"
            data-oid="gsl.sy8"
          >
            Leave a comment
          </label>
          <div className="flex" data-oid="0z-jaxq">
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={`flex-grow p-3 rounded-l-lg font-mono text-sm resize-none ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Share your thoughts..."
              rows={3}
              data-oid="8rgzl4m"
            ></textarea>
            <button
              type="submit"
              className="px-4 rounded-r-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center"
              data-oid="5:87llv"
            >
              <Send className="h-4 w-4" data-oid="i3mmenv" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogComments;
