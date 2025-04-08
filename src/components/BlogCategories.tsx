import React from "react";
import { Tag } from "lucide-react";

interface BlogCategoriesProps {
  theme: string;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  theme,
  onSelectCategory,
  selectedCategory,
}) => {
  const categories = [
    "All",
    "TypeScript",
    "React",
    "WebAssembly",
    "Performance",
    "Frontend",
  ];

  return (
    <div className="mb-8" data-oid="l6a8--n">
      <div className="flex items-center mb-4" data-oid="ulas:j3">
        <Tag className="h-5 w-5 mr-2 text-blue-500" data-oid="vj5:1r0" />
        <h3 className="text-lg font-bold font-mono" data-oid="1ucmmv9">
          Categories
        </h3>
      </div>
      <div className="flex flex-wrap gap-2" data-oid=":j31zw-">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            data-oid="921l5m:"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
