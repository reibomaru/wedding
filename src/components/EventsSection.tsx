import React, { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Calendar,
  ChevronDown,
  ChevronRight,
  Train,
  Bus,
  Car,
} from "lucide-react";
import { GoogleMap } from "./GoogleMap";
import { FacilitySlideshow } from "./FacilitySlideshow";

export const EventsSection: React.FC = () => {
  // 綱町三井倶楽部の座標
  const venueLocation = {
    lat: 35.6515723,
    lng: 139.7407165,
    name: "綱町三井倶楽部",
    address: "〒108-0073 東京都港区三田2-3-7",
  };

  // アコーディオンの開閉状態を管理
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleAccordionToggle = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleGoogleMapClick = () => {
    // Google Maps アプリまたはブラウザで開く
    const url = `https://www.google.com/maps/search/?api=1&query=${venueLocation.lat},${venueLocation.lng}`;
    window.open(url, "_blank");
  };

  return (
    <section id="events" className="section-container">
      <h2 className="heading-main text-center">Information</h2>

      <p className="text-center text-gray-700 mb-16">
        皆様には、挙式よりご臨席賜りたく、何卒よろしくお願い申し上げます。
      </p>

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

          {/* 会場スライドショー */}
          <div className="mb-6">
            <FacilitySlideshow className="h-64 md:h-96 w-full" />
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

          {/* 会場スライドショー */}
          <div className="mb-6">
            <FacilitySlideshow className="h-64 md:h-96 w-full" />
          </div>

          {/* アクセス情報 - アコーディオン形式 */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h5 className="font-semibold text-gray-800 mb-4 text-base">
              アクセス
            </h5>

            <div className="space-y-3">
              {/* 電車をご利用の方 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleAccordionToggle("train")}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Train className="text-blue-600" size={20} />
                    <span className="font-medium text-gray-800">
                      電車をご利用の方
                    </span>
                  </div>
                  {openAccordion === "train" ? (
                    <ChevronDown className="text-gray-500" size={20} />
                  ) : (
                    <ChevronRight className="text-gray-500" size={20} />
                  )}
                </button>
                {openAccordion === "train" && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="space-y-2 text-sm text-gray-700 text-left">
                      <p>
                        地下鉄（東京メトロ南北線・都営大江戸線）…麻布十番（2番出口）徒歩8分
                      </p>
                      <p>
                        地下鉄（都営大江戸線）…赤羽橋（中之橋口、赤羽橋口）徒歩8分
                      </p>
                      <p>地下鉄（都営三田線）…芝公園（A2番出口）徒歩13分</p>
                      <p>地下鉄（都営浅草線）…三田（A3番出口）徒歩15分</p>
                      <p>JR（山手線・京浜東北線）…田町 徒歩15分</p>
                    </div>
                  </div>
                )}
              </div>

              {/* バスをご利用の方 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleAccordionToggle("bus")}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Bus className="text-green-600" size={20} />
                    <span className="font-medium text-gray-800">
                      バスをご利用の方
                    </span>
                  </div>
                  {openAccordion === "bus" ? (
                    <ChevronDown className="text-gray-500" size={20} />
                  ) : (
                    <ChevronRight className="text-gray-500" size={20} />
                  )}
                </button>
                {openAccordion === "bus" && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="space-y-2 text-sm text-gray-700 text-left">
                      <p>都06（渋谷駅前-新橋駅前）…二の橋 徒歩5分</p>
                      <p>反96（五反田駅行・品川車庫行 他）…二の橋 徒歩5分</p>
                      <p>田87（渋谷駅-田町駅）…慶応義塾大学前 徒歩7分</p>
                      <p>東98（等々力駅前-東京駅南口）…赤羽橋 徒歩7分</p>
                    </div>
                  </div>
                )}
              </div>

              {/* お車をご利用の方 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleAccordionToggle("car")}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Car className="text-orange-600" size={20} />
                    <span className="font-medium text-gray-800">
                      お車をご利用の方
                    </span>
                  </div>
                  {openAccordion === "car" ? (
                    <ChevronDown className="text-gray-500" size={20} />
                  ) : (
                    <ChevronRight className="text-gray-500" size={20} />
                  )}
                </button>
                {openAccordion === "car" && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="space-y-2 text-sm text-gray-700 text-left">
                      <p>首都高速道路 芝公園ICより 約5分</p>
                      <p>※駐車場は50台分をご用意しております。</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Google Map埋め込み */}
          <div className="mb-8">
            <GoogleMap
              lat={venueLocation.lat}
              lng={venueLocation.lng}
              venueName={venueLocation.name}
              address={venueLocation.address}
              className="h-64 md:h-96 w-full"
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
