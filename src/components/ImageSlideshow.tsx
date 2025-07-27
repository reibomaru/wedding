import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";

const slides = [
  {
    image: photo1,
    alt: "Wedding Photo 1",
  },
  {
    image: photo2,
    alt: "Wedding Photo 2",
  },
];

export const ImageSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 自動スライド機能
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* スライド画像 */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              onLoad={() => console.log("画像読み込み成功:", slide.image)}
              onError={() => console.log("画像読み込み失敗:", slide.image)}
            />
            {/* オーバーレイ（一時的にコメントアウト） */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}
          </div>
        ))}
      </div>

      {/* テキストオーバーレイ */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 drop-shadow-2xl">
            Wedding Invitation
          </h1>
          <div className="text-2xl md:text-4xl lg:text-5xl font-serif mb-6 drop-shadow-xl">
            杉浦 伶 & 田中 陽子
          </div>
          <div className="bg-white/60 bg-opacity-40 rounded-lg p-4 md:p-6 mx-auto max-w-md backdrop-blur-sm">
            <p className="text-lg md:text-xl font-serif text-gray-800 mb-2">
              2025年10月4日（土）
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              挙式 10:30 | 披露宴 11:30
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              綱町三井倶楽部（東京都港区三田）
            </p>
          </div>
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 transition-all duration-200"
        aria-label="前の画像"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 transition-all duration-200"
        aria-label="次の画像"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* インジケーター */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white shadow-lg"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`スライド ${index + 1}に移動`}
          />
        ))}
      </div>
    </div>
  );
};
