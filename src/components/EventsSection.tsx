import React from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";

export const EventsSection: React.FC = () => {
  return (
    <section id="events" className="section-container">
      <h2 className="heading-main text-center">Events</h2>

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
              <p className="text-sm">受付時間 10:00</p>
            </div>
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
        </div>
      </div>

      {/* 会場情報 */}
      <div className="text-center">
        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-8">
          会場情報
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
              〒108-0073　東京都港区三田2-3-7
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <ExternalLink className="text-gray-500 flex-shrink-0" size={20} />
            <a
              href="https://www.mitsui-club.co.jp/tsunamachi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-700 underline text-lg"
            >
              https://www.mitsui-club.co.jp/tsunamachi/
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
