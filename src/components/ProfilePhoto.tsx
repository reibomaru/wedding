import React, { useState } from "react";
import yokoOnPhoto from "../assets/profile/yoko_on.jpg";
import yokoOffPhoto from "../assets/profile/yoko_off.jpg";
import reiOnPhoto from "../assets/profile/rei_on.png";
import reiOffPhoto from "../assets/profile/rei_off.jpg";

type ProfilePhotoProps = {
  person: "groom" | "bride";
  alt: string;
  className?: string;
};

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  person,
  alt,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 画像の選択
  const getPhotos = () => {
    if (person === "bride") {
      return {
        mainPhoto: yokoOnPhoto,
        hoverPhoto: yokoOffPhoto,
      };
    } else {
      // 新郎の画像
      return {
        mainPhoto: reiOnPhoto,
        hoverPhoto: reiOffPhoto,
      };
    }
  };

  const { mainPhoto, hoverPhoto } = getPhotos();

  return (
    <div className={`flex justify-center mb-6 ${className}`}>
      <div
        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* メイン写真 */}
        <img
          src={mainPhoto}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectPosition: "center center" }}
          onError={() => {
            console.error("画像のロードエラー:", mainPhoto);
            setImageError(true);
          }}
        />

        {/* ホバー時のオフショット */}
        <img
          src={hoverPhoto}
          alt={`${alt} - オフショット`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: "center center" }}
          onError={() => {
            console.error("画像のロードエラー:", hoverPhoto);
            setImageError(true);
          }}
        />

        {/* エラー時のフォールバック */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
            <span className="text-sm">画像を読み込めません</span>
          </div>
        )}

        {/* ホバーエフェクト */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-full" />

        {/* 写真の周りのボーダー */}
        <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl" />
      </div>
    </div>
  );
};
