import React, { useState, useEffect } from "react";
import { LogOut, Users, UserCheck, UserX, Download, RefreshCw } from "lucide-react";
import { AuthService } from "../../services/authService";
import { AdminService } from "../../services/adminService";
import type { FirestoreRSVPData } from "../../types/rsvp";

type Statistics = {
  totalResponses: number;
  attendees: number;
  declines: number;
  companions: number;
  totalGuests: number;
};

export const AdminDashboard: React.FC = () => {
  const [rsvpData, setRsvpData] = useState<FirestoreRSVPData[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "attend" | "decline">("all");

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [allData, stats] = await Promise.all([
        AdminService.getAllRSVPData(),
        AdminService.getStatistics(),
      ]);
      
      setRsvpData(allData);
      setStatistics(stats);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("データの読み込みに失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredData = rsvpData.filter(data => {
    if (filter === "all") return !data.isCompanion;
    return !data.isCompanion && data.attendance === filter;
  });

  const exportToCSV = () => {
    const headers = [
      "出欠", "名前", "ふりがな", "郵便番号", "住所", "建物名", 
      "電話番号", "メールアドレス", "アレルギー", "メッセージ", 
      "お連れ様", "登録日時", "更新日時"
    ];
    
    const csvData = filteredData.map(data => {
      const companions = rsvpData
        .filter(d => d.isCompanion && d.parentId === data.id)
        .map(c => `${c.name}(${c.kana})${c.allergy ? `[${c.allergy}]` : ''}`)
        .join('; ');
      
      return [
        data.attendance === "attend" ? "出席" : "欠席",
        data.name,
        data.kana,
        data.postcode,
        data.address,
        data.building,
        data.phone,
        data.email,
        data.allergy,
        data.message,
        companions,
        data.createdAt.toLocaleString('ja-JP'),
        data.updatedAt.toLocaleString('ja-JP'),
      ];
    });
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field || ''}"`).join(','))
      .join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rsvp_data_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <RefreshCw className="w-5 h-5 animate-spin" />
          データを読み込んでいます...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                招待状管理システム
              </h1>
              <p className="text-sm text-gray-600">Rei & Yoko Wedding</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <RefreshCw className="w-4 h-4" />
                更新
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* 統計情報 */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{statistics.totalResponses}</p>
              <p className="text-sm text-gray-600">総回答数</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <UserCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{statistics.attendees}</p>
              <p className="text-sm text-gray-600">出席</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <UserX className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{statistics.declines}</p>
              <p className="text-sm text-gray-600">欠席</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{statistics.companions}</p>
              <p className="text-sm text-gray-600">お連れ様</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <Users className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{statistics.totalGuests}</p>
              <p className="text-sm text-gray-600">総参加者数</p>
            </div>
          </div>
        )}

        {/* フィルターとエクスポート */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900">RSVP一覧</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 text-sm rounded ${
                      filter === "all" 
                        ? "bg-white text-gray-900 shadow-sm" 
                        : "text-gray-600"
                    }`}
                  >
                    全て
                  </button>
                  <button
                    onClick={() => setFilter("attend")}
                    className={`px-3 py-1 text-sm rounded ${
                      filter === "attend" 
                        ? "bg-white text-gray-900 shadow-sm" 
                        : "text-gray-600"
                    }`}
                  >
                    出席
                  </button>
                  <button
                    onClick={() => setFilter("decline")}
                    className={`px-3 py-1 text-sm rounded ${
                      filter === "decline" 
                        ? "bg-white text-gray-900 shadow-sm" 
                        : "text-gray-600"
                    }`}
                  >
                    欠席
                  </button>
                </div>
              </div>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg"
              >
                <Download className="w-4 h-4" />
                CSV出力
              </button>
            </div>
          </div>

          {/* テーブル */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    出欠
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名前
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    連絡先
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    住所
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    お連れ様
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    登録日時
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((data) => {
                  const companions = rsvpData.filter(d => d.isCompanion && d.parentId === data.id);
                  
                  return (
                    <tr key={data.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          data.attendance === "attend" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {data.attendance === "attend" ? "出席" : "欠席"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{data.name}</div>
                          <div className="text-sm text-gray-500">{data.kana}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{data.phone}</div>
                          <div className="text-sm text-gray-500">{data.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {data.postcode} {data.address}
                          {data.building && <div>{data.building}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {companions.length > 0 ? (
                          <div className="text-sm">
                            {companions.map((companion, index) => (
                              <div key={companion.id} className="text-gray-900">
                                {index + 1}. {companion.name} ({companion.kana})
                                {companion.allergy && (
                                  <div className="text-xs text-red-600">
                                    アレルギー: {companion.allergy}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">なし</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.createdAt.toLocaleDateString('ja-JP')}
                        <div className="text-xs">
                          {data.createdAt.toLocaleTimeString('ja-JP')}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">データがありません</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};