import React, { useState } from "react";

type ProfilePhotoProps = {
  mainPhoto: string;
  hoverPhoto: string;
  alt: string;
  name: string;
  className?: string;
};

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  mainPhoto,
  hoverPhoto,
  alt,
  name,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative mx-auto mb-6 ${className}`}>
      <div
        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* メイン写真 */}
        <img
          src={mainPhoto}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* ホバー時のオフショット */}
        <img
          src={hoverPhoto}
          alt={`${alt} - オフショット`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ホバーエフェクト */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-full" />

        {/* 写真の周りのボーダー */}
        <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl" />
      </div>

      {/* 写真の下に名前表示（オプション） */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500 font-medium">{name}</p>
        <p className="text-xs text-gray-400 mt-1">
          {isHovered ? "Hover for off-shot!" : "Hover me!"}
        </p>
      </div>
    </div>
  );
};
