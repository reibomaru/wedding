import React from "react";

export const ProfileSection: React.FC = () => {
  return (
    <section id="profile" className="section-container">
      <h2 className="heading-main text-center">Profile</h2>

      <div className="grid md:grid-cols-2 gap-16">
        {/* 新郎 */}
        <div className="text-center">
          <h3 className="text-3xl font-serif font-semibold text-gray-800 mb-2">
            新郎
          </h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="text-2xl font-bold text-rose-600 mb-1">杉浦 伶</h4>
              <p className="text-lg text-gray-500">Sugiura Rei</p>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">生年月日:</span> 1998年5月29日
              </p>
              <p>
                <span className="font-medium">出身:</span> 神奈川県横浜市
              </p>
              <p>
                <span className="font-medium">職業:</span>{" "}
                ソフトウェアエンジニア
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-sm leading-relaxed">
              <p className="mb-2">
                アウトドア全般が好きでサイクリングや釣りをしています
              </p>
              <p>素敵な空間と美味しい料理を準備してお待ちしております！</p>
            </div>
          </div>
        </div>

        {/* 新婦 */}
        <div className="text-center">
          <h3 className="text-3xl font-serif font-semibold text-gray-800 mb-2">
            新婦
          </h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="text-2xl font-bold text-rose-600 mb-1">
                田中 陽子
              </h4>
              <p className="text-lg text-gray-500">Tanaka Yoko</p>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">生年月日:</span> 1997年9月18日
              </p>
              <p>
                <span className="font-medium">出身:</span> 東京都品川区
              </p>
              <p>
                <span className="font-medium">職業:</span> システムエンジニア
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-sm leading-relaxed">
              <p className="mb-2">料理と登山が息抜きです</p>
              <p>
                お食事の時間、お喋りの時間を大切にしたいとの思いで作り上げました。当日はよろしくお願いします！
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
