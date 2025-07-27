import React, { useState, useEffect } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({
  onComplete,
}) => {
  const text = "WEDDING INVITATION";
  const [visibleCount, setVisibleCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (visibleCount < text.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 10); // 一文字ずつ50msで表示

      return () => clearTimeout(timer);
    } else {
      // 全文字表示完了、2秒待機してからフェードアウト開始
      const timer = setTimeout(() => {
        setFadeOut(true);
        // フェードアウト時間（1秒）後にコンプリート
        setTimeout(() => {
          onComplete();
        }, 2000);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visibleCount, onComplete, text.length]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 tracking-wider">
          {text.split(" ").map((word, wordIndex) => {
            const wordsBeforeCurrent = text.split(" ").slice(0, wordIndex);
            const charsBefore = wordsBeforeCurrent.join("").length + wordIndex; // 前の単語の文字数 + スペース数

            return (
              <React.Fragment key={wordIndex}>
                {wordIndex > 0 && (
                  <>
                    <br className="lg:hidden" />
                    <span className="hidden lg:inline">{"\u00A0"}</span>
                  </>
                )}
                <span className="lg:whitespace-nowrap">
                  {word.split("").map((char, charIndex) => {
                    const actualIndex = charsBefore + charIndex;

                    return (
                      <span
                        key={charIndex}
                        className={`intro-char ${
                          actualIndex < visibleCount
                            ? "intro-char-visible"
                            : "intro-char-hidden"
                        }`}
                        style={{
                          animationDelay: `${actualIndex * 0.1}s`,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              </React.Fragment>
            );
          })}
        </h1>
      </div>
    </div>
  );
};
