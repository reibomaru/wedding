import React, { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

type GoogleMapProps = {
  address: string;
  venueName: string;
  lat: number;
  lng: number;
  className?: string;
};

export const GoogleMap: React.FC<GoogleMapProps> = ({
  address,
  venueName,
  lat,
  lng,
  className = "",
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // APIキーの詳細チェック
    if (apiKey) {
      console.log(
        "Google Maps API Key loaded:",
        apiKey.substring(0, 10) + "..."
      );
    } else {
      console.error("Google Maps API Key not found in environment variables");
    }

    // グローバルエラーハンドラーを設定
    const handleGoogleMapsError = (event: ErrorEvent) => {
      if (event.message && event.message.includes("Google")) {
        console.error("Google Maps API Error:", event.error);
        setMapError(event.message || "Google Maps APIでエラーが発生しました");
      }
    };

    // グローバルエラー監視
    window.addEventListener("error", handleGoogleMapsError);

    return () => {
      window.removeEventListener("error", handleGoogleMapsError);
    };
  }, [apiKey]);

  if (!apiKey) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-600">Google Maps API Keyが設定されていません</p>
        <p className="text-sm text-gray-500 mt-2">
          .envファイルにVITE_GOOGLE_MAPS_API_KEYを追加してください
        </p>
        <div className="mt-4 text-xs text-gray-400">
          <p>現在の環境変数の状態:</p>
          <p>VITE_GOOGLE_MAPS_API_KEY: {apiKey ? "設定済み" : "未設定"}</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-8 text-center ${className}`}
      >
        <p className="text-red-600 font-medium">Google Maps読み込みエラー</p>
        <p className="text-sm text-red-500 mt-2">{mapError}</p>
        <div className="mt-4 text-xs text-red-400">
          <p>以下をご確認ください：</p>
          <ul className="list-disc list-inside mt-2 text-left">
            <li>Google Cloud Console で Maps JavaScript API が有効か</li>
            <li>APIキーの制限設定で localhost:5174 が許可されているか</li>
            <li>APIキーが正しく設定されているか</li>
            <li>API使用量制限に達していないか</li>
          </ul>
        </div>
      </div>
    );
  }

  const mapOptions = {
    mapId: "wedding-venue-map",
    defaultCenter: { lat, lng },
    zoom: 16,
    gestureHandling: "cooperative" as const,
    fullscreenControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    zoomControl: true,
    scaleControl: true,
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <APIProvider apiKey={apiKey}>
        <Map {...mapOptions} style={{ width: "100%", height: "100%" }}>
          <AdvancedMarker
            position={{ lat, lng }}
            title={`${venueName} - ${address}`}
          />
        </Map>
      </APIProvider>
    </div>
  );
};
