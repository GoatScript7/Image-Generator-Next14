import { error } from "console";
import React, { useEffect, useRef, useState } from "react";

const GenerateImageModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerateClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/goofyai/cyborg_style_xl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const blob = await response.blob();
      setOutput(URL.createObjectURL(blob));
    } catch (e) {
      console.error("Error generatin image", e.message);
    } finally {
      setLoading(false);
    }
  };

  const modalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        event.target.tagName.toLowerCase() !== "img"
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
      <div className="flex max-w-screen-lg max-h-screen overflow-hidden">
        <div className="flex-shrink-0 relative overflow-hidden">
          {/* Result section */}
          {!loading && output && (
            <div className="result-image flex items-start">
              <img
                src={output}
                alt="art"
                className="w-[400px] h-[600px] object-cover rounded-r-none roundedn-l-md"
              />
              <div className="flex flex-col"></div>
            </div>
          )}
        </div>
        <div
          ref={modalRef}
          className="flex-shrink-0 w-80 bg-black p-4 flex flex-col rounded-r-md relative"
        >
          {/* Modal Content */}
          <h1 className="text-white text-2xl font-bold mb-2">Generate Image</h1>
          <form className="w-64">
            {/* Title input */}
            <div className="mb-4">
              <label htmlFor="title" className="text-sm text-gray-200">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter title"
                className="w-full border border-gray-200 rounded px-2 py-1"
              />
            </div>
            {/* Prompt input */}
            <div className="mb-4">
              <label htmlFor="prompt" className="text-sm text-gray-200">
                Prompt:
              </label>
              <input
                type="text"
                id="prompt"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter prompt"
                className="w-full border border-gray-200 rounded px-2 py-1"
              />
            </div>

            {loading && <div className="loading mb-4">Loading...</div>}
            <div className="flex justify-between pt-2">
              {/* Generate button */}
              <button
                type="button"
                onClick={handleGenerateClick}
                className="bg-[#2ECC71] text-white px-4 py-2 rounded w-28"
              >
                Generate
              </button>
              {/* Upload button (conditionally rendered) */}
              {output && (
                <button
                  type="button"
                  className="bg-[#2ECC71] text-white px-4 py-2 rounded w-28"
                >
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateImageModal;
