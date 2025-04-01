import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TerminalProps {
  setActiveSection?: (section: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ setActiveSection }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const commands: Record<string, () => string> = {
    help: () =>
      "Available commands:\n  help - Show this help message\n  ls - List available pages\n  cd [page] - Navigate to a page\n  whoami - Display user information\n  cat profile.txt - Show detailed profile\n  clear - Clear the terminal\n  date - Show current date and time\n  exit - Exit terminal",

    ls: () =>
      "Available pages:\n  home\n  about\n  projects\n  blog\n  contact",

    cd: () => {
      const args = currentCommand.split(" ").slice(1);
      if (args.length === 0) return "Usage: cd [page]";

      const page = args[0].toLowerCase();
      const validPages = ["home", "about", "projects", "blog", "contact"];

      if (!validPages.includes(page)) {
        return `cd: no such page: ${page}`;
      }

      if (setActiveSection) {
        setActiveSection(page);
        if (page === "home") {
          navigate("/");
        } else {
          navigate(`/${page}`);
        }
        return `Navigating to ${page}...`;
      }

      return "Navigation not available";
    },

    whoami: () => "I'm Taisei Kawakami - Programmer, Student, ",

    cat: () => {
      const args = currentCommand.split(" ").slice(1);
      if (args.length === 0) return "Usage: cat [filename]";

      if (args[0].toLowerCase() === "profile.txt") {
        return `
NAME: Taisei Kawakami
OCCUPATION: Senior Software Engineer
EXPERIENCE: High School Student Now
SPECIALIZATION: python, dart, javascript, math, physics
EDUCATION: High School
LANGUAGES: JavaScript, TypeScript, Python,  Dart
FRAMEWORKS: React, Astro, Flutter, TailwindCSS
INTERESTS: Deep Learning, Web Development, Mobile Development
HOBBIES: Reading Manga, Watching Anime, Sleeping
CONTACT: mathlike.science@gmail.com
`;
      }

      return `cat: ${args[0]}: No such file or directory`;
    },

    clear: () => {
      setHistory([]);
      return "";
    },

    date: () => {
      const now = new Date();
      return now.toLocaleString();
    },

    exit: () => {
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        setHistory((prev) => [
          ...prev,
          "Goodbye...",
          "",
          'Terminal restarted. Type "help" for available commands.',
        ]);
      }, 2000);
      return "Exiting...";
    },
  };

  const handleCommand = () => {
    if (!currentCommand.trim()) return;

    const newHistory = [...history, `> ${currentCommand}`];

    const commandName = currentCommand.split(" ")[0].trim().toLowerCase();
    if (commands[commandName]) {
      const output = commands[commandName]();
      if (output) newHistory.push(output);
    } else {
      newHistory.push(
        `Command not found: ${commandName}. Type 'help' for available commands.`,
      );
    }

    setHistory(newHistory);
    setCurrentCommand("");
    setCursorPosition(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand();
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      className={`bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700 transition-all duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}
      onClick={() => inputRef.current?.focus()}
      data-oid="_k3trzw"
    >
      <div
        className="flex items-center bg-gray-800 px-4 py-2"
        data-oid="7oukm31"
      >
        <div className="flex space-x-2" data-oid="ywg1lty">
          <div
            className="w-3 h-3 rounded-full bg-red-500"
            data-oid="j9r6i6n"
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-yellow-500"
            data-oid="iqpxzxs"
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-green-500"
            data-oid="6tgbc9."
          ></div>
        </div>
        <div
          className="ml-4 text-gray-400 text-sm font-mono"
          data-oid="a:b542n"
        >
          terminal@taisei.dev
        </div>
      </div>

      <div
        ref={terminalRef}
        className="p-4 h-64 overflow-y-auto font-mono text-gray-300 text-sm"
        data-oid="_hgqall"
      >
        <div className="mb-4" data-oid="_y82oct">
          <p className="text-green-400" data-oid="-ujxvju">
            Welcome to my interactive terminal!
          </p>
          <p data-oid="ufk:77l">Type 'help' to see available commands.</p>
        </div>

        {history.map((line, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap ${line.startsWith(">") ? "text-blue-400" : "text-gray-300"}`}
            data-oid="k.w-sn-"
          >
            {line}
          </div>
        ))}

        <div className="flex items-center mt-2" data-oid="1jwfuwk">
          <ChevronRight
            className="h-4 w-4 text-green-400 mr-1"
            data-oid="wvskdku"
          />

          <span className="relative flex items-center" data-oid="i4wbq1z">
            {currentCommand}
            <span
              className={`h-5 w-2 bg-blue-500 ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
              style={{
                position: "absolute",
                left: `${cursorPosition * 8}px`,
                transform:
                  cursorPosition > 0 ? "translateX(8px)" : "translateX(0)",
              }}
              data-oid="hk3nfjq"
            ></span>
          </span>
          <input
            ref={inputRef}
            type="text"
            className="opacity-0 absolute w-px h-px"
            value={currentCommand}
            onChange={(e) => {
              setCurrentCommand(e.target.value);
              setCursorPosition(e.target.selectionStart || 0);
            }}
            onKeyDown={handleKeyDown}
            onSelect={(e) => {
              const target = e.target as HTMLInputElement;
              setCursorPosition(target.selectionStart || 0);
            }}
            data-oid="6sj3jxj"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
