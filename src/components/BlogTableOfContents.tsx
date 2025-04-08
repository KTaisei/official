import React, { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  content: string;
  theme: string;
}

const BlogTableOfContents: React.FC<BlogTableOfContentsProps> = ({
  content,
  theme,
}) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse markdown content to extract headings
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;
    let index = 0;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = `heading-${index}`;

      items.push({
        id,
        text,
        level,
      });

      index++;
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      // This is a simplified version - in a real app, you'd need to
      // match scroll position with actual heading elements
      const scrollPosition = window.scrollY;

      // Set the first item as active by default
      if (tocItems.length > 0 && scrollPosition < 300) {
        setActiveId(tocItems[0].id);
      }

      // For demo purposes, change active item based on scroll position
      if (scrollPosition > 300 && tocItems.length > 1) {
        setActiveId(tocItems[1].id);
      }

      if (scrollPosition > 600 && tocItems.length > 2) {
        setActiveId(tocItems[2].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`p-4 rounded-lg mb-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}
      data-oid="f:ws5se"
    >
      <div className="flex items-center mb-3" data-oid="p:5z-bi">
        <List className="h-5 w-5 mr-2 text-blue-500" data-oid="76hdq9j" />
        <h3 className="text-lg font-bold font-mono" data-oid="hkevbht">
          Table of Contents
        </h3>
      </div>
      <nav data-oid="4omm6j9">
        <ul className="space-y-2" data-oid="otx6xu1">
          {tocItems.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
              data-oid="a0o1j_6"
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 px-2 rounded font-mono text-sm transition-colors ${
                  activeId === item.id
                    ? "bg-blue-500 text-white"
                    : theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveId(item.id);
                  // In a real app, you'd scroll to the heading
                }}
                data-oid="3p1q9wt"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BlogTableOfContents;
