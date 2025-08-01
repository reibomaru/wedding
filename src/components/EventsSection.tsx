import React from "react";
import { MapPin, ExternalLink, Calendar } from "lucide-react";

export const EventsSection: React.FC = () => {
  return (
    <section id="events" className="section-container">
      <h2 className="heading-main text-center">Information</h2>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* 挙式 */}
        <div className="text-center">
          <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6">
            挙式
            <span className="text-lg font-normal block text-gray-600 mt-1">
              WEDDING CEREMONY
            </span>
          </h3>

          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-medium text-lg">2025.10.04 Sat</p>
              <p className="text-3xl font-bold text-rose-600 my-2">10:30</p>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="https://calendar.google.com/calendar/event?action=TEMPLATE&text=%E6%8C%99%E5%BC%8F&dates=20251004T013000Z/20251004T023000Z&details=%E7%B6%B1%E7%94%BA%E4%B8%89%E4%BA%95%E5%80%B6%E6%A5%BD%E9%83%A8%E3%81%A7%E3%81%AE%E6%8C%99%E5%BC%8F&location=%E7%B6%B1%E7%94%BA%E4%B8%89%E4%BA%95%E5%80%B6%E6%A5%BD%E9%83%A8%20%E3%80%92108-0073%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E4%B8%89%E7%94%B02-3-7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors duration-300 font-medium"
            >
              <Calendar size={20} />
              カレンダーに追加
            </a>
          </div>
        </div>

        {/* 披露宴 */}
        <div className="text-center">
          <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6">
            披露宴
            <span className="text-lg font-normal block text-gray-600 mt-1">
              WEDDING RECEPTION
            </span>
          </h3>

          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-medium text-lg">2025.10.04 Sat</p>
              <p className="text-3xl font-bold text-rose-600 my-2">11:30</p>
              <p className="text-sm">受付時間 11:00</p>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="https://calendar.google.com/calendar/event?action=TEMPLATE&text=%E6%8A%AB%E9%9C%B2%E5%AE%B4&dates=20251004T023000Z/20251004T063000Z&details=%E7%B6%B1%E7%94%BA%E4%B8%89%E4%BA%95%E5%80%B6%E6%A5%BD%E9%83%A8%E3%81%A7%E3%81%AE%E6%8A%AB%E9%9C%B2%E5%AE%B4%EF%BC%88%E5%8F%97%E4%BB%98%2011:00%EF%BC%89&location=%E7%B6%B1%E7%94%BA%E4%B8%89%E4%BA%95%E5%80%B6%E6%A5%BD%E9%83%A8%20%E3%80%92108-0073%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E4%B8%89%E7%94%B02-3-7"
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

      {/* 会場情報 */}
      <div className="text-center">
        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-8">
          会場
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-3xl text-rose-600 mb-4">
              綱町三井倶楽部
            </h4>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="text-gray-500 flex-shrink-0" size={20} />
            <p className="text-gray-700 text-lg">
              〒108-0073 東京都港区三田2-3-7
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <ExternalLink className="text-gray-500 flex-shrink-0" size={20} />
            <a
              href="https://www.tsunamachimitsuiclub.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-700 underline text-lg"
            >
              https://www.tsunamachimitsuiclub.co.jp/
            </a>
          </div>

          <div>
            <button className="btn-primary">GoogleMapで見る</button>
          </div>
        </div>
      </div>
    </section>
  );
};
