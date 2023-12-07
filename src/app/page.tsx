"use client";
import Image from "next/image";
import Header from "../components/header";
import { useState } from "react";
import img1 from "../../public/images/1.jpg";
import img2 from "../../public/images/2.jpg";
import img3 from "../../public/images/3.jpg";
import img4 from "../../public/images/4.jpg";
import img5 from "../../public/images/5.jpg";
import img6 from "../../public/images/6.jpg";
import img7 from "../../public/images/7.jpg";
import img8 from "../../public/images/8.jpg";
import ImageCard from "@/components/imageCard";
import ImageModal from "@/components/imageModal";
import GenerateImageModal from "@/components/generateImageModal";

const itemData = [
  {
    img: img1,
    title: "Image 1",
    prompt: "Describe the image prompt",
    createdBy: "User 1",
  },
  {
    img: img2,
    title: "Image 2",
    prompt: "Describe the image",
    createdBy: "User 2",
  },
  {
    img: img3,
    title: "Image 3",
    prompt: "Describe the image",
    createdBy: "User 1",
  },
  {
    img: img4,
    title: "Image 4",
    prompt: "Describe the image",
    createdBy: "User 1",
  },
  {
    img: img5,
    title: "Image 5",
    prompt: "Describe the image",
    createdBy: "User 1",
  },
  {
    img: img6,
    title: "Image 6",
    prompt: "Describe the image",
    createdBy: "User 1",
  },
  {
    img: img7,
    title: "Image 7",
    prompt: "Describe the image",
    createdBy: "User 1",
  },
  {
    img: img8,
    title: "Image 8",
    prompt: "Describe the image",
    createdBy: "User 1",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratedModalOpen, setIsGeneratedModalOpen] = useState(false);

  const filteredData = itemData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handleOpenGeneratedModal = (index) => {
    setSelectedImageIndex(index);
    setIsGeneratedModalOpen(true);
  };

  const handleCloseGenerateModal = () => {
    setIsGeneratedModalOpen(false);
    setSelectedImageIndex(null);
  };

  return (
    <>
      {/* Header */}
      <Header setSearchQuery={setSearchQuery} onOpenGenerateModal={handleOpenGeneratedModal} />

      {/* Image container */}
      <div className="px-2 md:px-56 mt-36 columns-2 md:columns-3 lg:columns-4 mb-4 xl:columns-4 space-y-6 mx-auto">
        {filteredData.map((item, index) => (
          <ImageCard
            key={index}
            imageUrl={item.img}
            title={item.title}
            prompt={item.prompt}
            createdBy={item.createdBy}
            index={index}
            onImageClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {/* Open the image modal */}
      {isModalOpen && selectedImageIndex !== null && (
        <ImageModal
          imageUrl={filteredData[selectedImageIndex].img}
          title={filteredData[selectedImageIndex].title}
          prompt={filteredData[selectedImageIndex].prompt}
          createdBy={filteredData[selectedImageIndex].createdBy}
          onClose={handleCloseModal}
        />
      )}

      {/* Generate Image Modal */}
      {isGeneratedModalOpen && selectedImageIndex !== null && (
        <GenerateImageModal onClose={handleCloseGenerateModal} />
      )}
    </>
  );
}
