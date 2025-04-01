import React, { useState } from "react";
import { Send } from "lucide-react";

interface ContactFormProps {
  theme: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} data-oid="skvme3l">
      {submitStatus === "success" && (
        <div
          className="mb-4 p-3 bg-green-100 text-green-800 rounded-md"
          data-oid="p_ofa1a"
        >
          Your message has been sent successfully!
        </div>
      )}

      {submitStatus === "error" && (
        <div
          className="mb-4 p-3 bg-red-100 text-red-800 rounded-md"
          data-oid="igadqe."
        >
          There was an error sending your message. Please try again.
        </div>
      )}

      <div className="mb-4" data-oid="fvwyvn5">
        <label
          htmlFor="name"
          className="block mb-2 font-mono"
          data-oid="85:n:sq"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 rounded-md font-mono ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
              : "bg-gray-100 border-gray-300 focus:border-blue-500"
          } border focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
          data-oid="irn21pa"
        />
      </div>

      <div className="mb-4" data-oid="2hw0:xr">
        <label
          htmlFor="email"
          className="block mb-2 font-mono"
          data-oid="4eh0f.w"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 rounded-md font-mono ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
              : "bg-gray-100 border-gray-300 focus:border-blue-500"
          } border focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
          data-oid="4y.h9cd"
        />
      </div>

      <div className="mb-4" data-oid="q8:jf6c">
        <label
          htmlFor="message"
          className="block mb-2 font-mono"
          data-oid="y4rq-:4"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`w-full px-4 py-2 rounded-md font-mono ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 focus:border-blue-500"
              : "bg-gray-100 border-gray-300 focus:border-blue-500"
          } border focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
          data-oid="3c0r0_m"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-4 py-2 rounded-md font-mono flex items-center justify-center ${
          isSubmitting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white transition-colors`}
        data-oid="b9rf6r8"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              data-oid="b1i6t22"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                data-oid="6uuq6oj"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                data-oid="nu.3b9k"
              ></path>
            </svg>
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" data-oid="f6gli2l" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
