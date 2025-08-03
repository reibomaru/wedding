import React from "react";
import { MapPin, ExternalLink, Calendar } from "lucide-react";
import { GoogleMap } from "./GoogleMap";

export const EventsSection: React.FC = () => {
  // 綱町三井倶楽部の座標
  const venueLocation = {
    lat: 35.6515723,
    lng: 139.7407165,
    name: "綱町三井倶楽部",
    address: "〒108-0073 東京都港区三田2-3-7",
  };

  const handleGoogleMapClick = () => {
    // Google Maps アプリまたはブラウザで開く
    const url = `https://www.google.com/maps/search/?api=1&query=${venueLocation.lat},${venueLocation.lng}`;
    window.open(url, "_blank");
  };

  return (
    <section id="events" className="section-container">
      <h2 className="heading-main text-center">Events</h2>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* 挙式 */}
        <div className="text-center">
          <h3 className="text-xl font-serif font-semibold text-gray-800 mb-6">
            挙式
          </h3>

          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-medium text-base">2025.10.04 Sat</p>
              <p className="text-2xl font-bold text-rose-600 my-2">10:30</p>
            </div>
          </div>
        </div>

        {/* 披露宴 */}
        <div className="text-center">
          <h3 className="text-xl font-serif font-semibold text-gray-800 mb-6">
            披露宴
          </h3>

          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-medium text-base">2025.10.04 Sat</p>
              <p className="text-2xl font-bold text-rose-600 my-2">11:30</p>
              <p className="text-sm">受付時間 11:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* 会場情報 */}
      <div className="text-center">
        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-6">
          会場
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-2xl text-rose-600 mb-4">
              綱町三井倶楽部
            </h4>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="text-gray-500 flex-shrink-0" size={20} />
            <p className="text-gray-700 text-base">
              〒108-0073 東京都港区三田2-3-7
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <ExternalLink className="text-gray-500 flex-shrink-0" size={16} />
            <a
              href="https://www.tsunamachimitsuiclub.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-700 underline text-sm md:text-base break-all"
            >
              tsunamachimitsuiclub.co.jp
            </a>
          </div>

          {/* アクセス情報 */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h5 className="font-semibold text-gray-800 mb-3 text-base">アクセス</h5>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>最寄駅：</strong>都営三田線・都営浅草線「三田駅」A9出口より徒歩2分</p>
              <p><strong>JR線：</strong>JR山手線・京浜東北線「田町駅」三田口(西口)より徒歩8分</p>
              <p><strong>地下鉄：</strong>東京メトロ南北線・都営三田線「白金高輪駅」1番出口より徒歩10分</p>
            </div>
          </div>

          {/* Google Map埋め込み */}
          <div className="mb-8">
            <GoogleMap
              lat={venueLocation.lat}
              lng={venueLocation.lng}
              venueName={venueLocation.name}
              address={venueLocation.address}
              className="h-64 md:h-80 w-full"
            />
          </div>

          <div className="space-y-4">
            <button onClick={handleGoogleMapClick} className="btn-primary">
              GoogleMapで見る
            </button>

            <div>
              <a
                href="https://calendar.google.com/calendar/event?action=TEMPLATE&text=%E7%B5%90%E5%A9%9A%E5%BC%8F%E3%83%BB%E6%8A%AB%E9%9C%B2%E5%AE%B4&dates=20251004T010000Z/20251004T060000Z&details=%E6%8C%99%E5%BC%8F%2010:30%E3%80%9C%0A%E6%8A%AB%E9%9C%B2%E5%AE%B4%2011:30%E3%80%9C%EF%BC%88%E5%8F%97%E4%BB%98%2011:00%EF%BC%89%0A%0A%E7%B6%B1%E7%94%BA%E4%B8%89%E4%BA%95%E5%80%B6%E6%A5%BD%E9%83%A8%E3%81%AB%E3%81%A6&location=%E7%B6%B1%E7%94%BA%E4%B8%89%E4%BA%95%E5%80%B6%E6%A5%BD%E9%83%A8%20%E3%80%92108-0073%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E4%B8%89%E7%94%B02-3-7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors duration-300 font-medium"
              >
                <Calendar size={20} />
                カレンダーに追加
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
