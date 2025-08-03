import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import facility1 from "../assets/facilities/facility1.jpg";
import facility2 from "../assets/facilities/facility2.jpg";

const facilitySlides = [
  {
    image: facility1,
    alt: "綱町三井倶楽部 会場写真1",
    device: ["pc", "sp"],
  },
  {
    image: facility2,
    alt: "綱町三井倶楽部 会場写真2",
    device: ["pc", "sp"],
  },
];

interface FacilitySlideshowProps {
  className?: string;
}

export const FacilitySlideshow: React.FC<FacilitySlideshowProps> = ({
  className = "h-64 md:h-96",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // デバイス判定とリサイズ監視
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 初期判定
    checkDevice();

    // リサイズイベントリスナー
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  // デバイスに応じて表示する画像をフィルタリング
  const filteredSlides = facilitySlides.filter((slide) => {
    const deviceType = isMobile ? "sp" : "pc";
    return slide.device.includes(deviceType);
  });

  // フィルタリング後のスライド数が変わった場合、現在のスライドをリセット
  useEffect(() => {
    if (currentSlide >= filteredSlides.length) {
      setCurrentSlide(0);
    }
  }, [filteredSlides.length, currentSlide]);

  // 自動スライド機能
  useEffect(() => {
    if (filteredSlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
    }, 4000); // 4秒ごとに切り替え

    return () => clearInterval(interval);
  }, [filteredSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
  };

  // フィルタリングされた画像がない場合の処理
  if (filteredSlides.length === 0) {
    return (
      <div
        className={`relative w-full ${className} overflow-hidden bg-gray-200 flex items-center justify-center rounded-lg`}
      >
        <p className="text-gray-600">
          このデバイスで表示可能な画像がありません
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${className} overflow-hidden rounded-lg shadow-lg`}
    >
      {/* スライド画像 */}
      <div className="relative w-full h-full">
        {filteredSlides.map((slide, index) => (
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
              onLoad={() => console.log("会場画像読み込み成功:", slide.image)}
              onError={() => console.log("会場画像読み込み失敗:", slide.image)}
            />
          </div>
        ))}
      </div>

      {/* ナビゲーションボタン */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 transition-all duration-200"
        aria-label="前の会場写真"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 transition-all duration-200"
        aria-label="次の会場写真"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
      </button>

      {/* インジケーター */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5">
        {filteredSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white shadow-lg"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`会場写真 ${index + 1}に移動`}
          />
        ))}
      </div>
    </div>
  );
};
