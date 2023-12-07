import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import img7 from "../../public/images/7.jpg";
import img6 from "../../public/images/6.jpg";

const dummyComments = [
  {
    name: "John",
    comment: "This is an amazing image!",
    avatar: img7,
  },
  { name: "Jane", comment: "Great composition!", avatar: img6 },
  // Add more dummy comments as needed
];

const ImageModal = ({ imageUrl, onClose, title, prompt, createdBy }) => {
  const modalRef = useRef();
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    console.log("Added comment", comment);
    setComment("");
  };

  const handleLikeToggle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div
        ref={modalRef}
        className="flex max-w-screen-lg max-h-screen overflow-hidden"
      >
        <div>
          <Image
            src={imageUrl}
            alt="Modal-Image"
            className="w-[400px] h-[600px] object-cover rounded-r-none rounded-l-md"
          />
        </div>
        {/* right modal container */}
        <div className="flex-shrink-0 w-80 bg-black p-4 flex flex-col rounded-r-md relative">
          {/* Like button in the top right corner */}
          <button
            onClick={(e) => handleLikeToggle(e)}
            className={`absolute top-2 right-2 text-white focus:outline-none ${
              isLiked ? "text-red-500" : ""
            }`}
          >
            {isLiked ? "❤️ Liked" : "🤍 Like"}
          </button>
          {/* Title, prompt and createdBy details */}
          <div className="text-white mt-8">
            <p className="text-lg font-bold">{title}</p>
            <p className="text-sm">{prompt}</p>
            <p className="text-sm">{createdBy}</p>
          </div>
          <div>
            <p className="mt-12 mb-4">Comments</p>
            {/* Display dummy comments */}
            {dummyComments.map((dummyComment, index) => (
              <div key={index} className="flex items-start mb-4">
                <div className="rounded-full overflow-hidden mr-2">
                  <Image
                    src={dummyComment.avatar}
                    alt={`${dummyComment.name}-avatar`}
                    className="w-8 h-8 object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm">{dummyComment.name}</div>
                  <div className="text-sm text-white">
                    {dummyComment.comment}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment input and button at the bottom */}
          <div className="mt-auto">
            <div className="mb-4 flex">
              <input
                type="text"
                value={comment}
                onChange={handleInputChange}
                placeholder="Add a comment..."
                className="w-full p-2 bg-gray-800 text-white border-none outline-none"
              />
            </div>
            <button
              onClick={handleAddComment}
              className="w-full bg-[#2ecc71] text-white p-2"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
