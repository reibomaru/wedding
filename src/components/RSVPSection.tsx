import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface FormData {
  attendance: "attend" | "decline" | "";
  name: string;
  kana: string;
  postcode: string;
  address: string;
  building: string;
  phone: string;
  email: string;
  allergy: string;
  message: string;
}

interface Companion {
  id: string;
  name: string;
  kana: string;
  allergy: string;
}

export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    attendance: "",
    name: "",
    kana: "",
    postcode: "",
    address: "",
    building: "",
    phone: "",
    email: "",
    allergy: "",
    message: "",
  });

  const [companions, setCompanions] = useState<Companion[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addCompanion = () => {
    if (companions.length < 5) {
      setCompanions((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: "",
          kana: "",
          allergy: "",
        },
      ]);
    }
  };

  const removeCompanion = (id: string) => {
    setCompanions((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCompanion = (
    id: string,
    field: keyof Omit<Companion, "id">,
    value: string
  ) => {
    setCompanions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでFirebaseへの送信処理を実装予定
    console.log("Form submitted:", { formData, companions });
    alert("出欠情報を受け付けました。");
  };

  return (
    <section id="rsvp" className="section-container">
      <div className="text-center mb-8">
        <h2 className="heading-main mb-2">R.S.V.P.</h2>
        <p className="text-lg text-gray-600">ご出欠</p>
      </div>

      <div className="text-elegant text-center mb-12 space-y-4">
        <p className="text-lg">
          郵送でのご案内状に代わり 当招待状をお送りしております
        </p>
        <p className="text-lg">
          お手数ではございますが 出席情報のご登録をお願い申し上げます
        </p>
        <p className="text-lg">
          また当日のお食事のご用意にあたり
          <br />
          アレルギー等がある方は
          アレルギー欄にご記入くださいますようお願い申し上げます
        </p>
        <p className="text-rose-600 font-semibold text-lg">
          2025.09.02までにご返信をお願いいたします
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 出欠選択 */}
        <div>
          <div className="flex gap-8 justify-center mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="attend"
                checked={formData.attendance === "attend"}
                onChange={(e) =>
                  handleInputChange("attendance", e.target.value)
                }
                className="w-5 h-5 text-rose-600"
              />
              <span className="text-xl font-medium text-green-600">
                出席 attend
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="decline"
                checked={formData.attendance === "decline"}
                onChange={(e) =>
                  handleInputChange("attendance", e.target.value)
                }
                className="w-5 h-5 text-rose-600"
              />
              <span className="text-xl font-medium text-gray-600">
                欠席 decline
              </span>
            </label>
          </div>
        </div>

        <p className="text-sm text-gray-600">*は必須項目です</p>

        {/* 基本情報 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="input-field"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              かな <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.kana}
              onChange={(e) => handleInputChange("kana", e.target.value)}
              className="input-field"
              placeholder="Kana"
              required
            />
          </div>
        </div>

        {/* 住所情報 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            〒 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.postcode}
            onChange={(e) => handleInputChange("postcode", e.target.value)}
            className="input-field"
            placeholder="Postcode"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            住所 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="input-field"
            placeholder="Address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            建物名
          </label>
          <input
            type="text"
            value={formData.building}
            onChange={(e) => handleInputChange("building", e.target.value)}
            className="input-field"
            placeholder="Building"
          />
        </div>

        {/* 連絡先 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="input-field"
              placeholder="Phone number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="input-field"
              placeholder="Email Address"
              required
            />
          </div>
        </div>

        {/* アレルギー・メッセージ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            アレルギー
          </label>
          <textarea
            value={formData.allergy}
            onChange={(e) => handleInputChange("allergy", e.target.value)}
            className="input-field"
            placeholder="Allergy"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メッセージ
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="input-field"
            placeholder="Message"
            rows={4}
          />
        </div>

        {/* お連れ様 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif font-semibold text-gray-800">
              お連れ様
            </h3>
            <button
              type="button"
              onClick={addCompanion}
              disabled={companions.length >= 5}
              className="flex items-center gap-2 text-rose-600 hover:text-rose-700 disabled:text-gray-400"
            >
              <Plus size={16} />
              お連れ様を追加する
            </button>
          </div>

          {companions.map((companion, index) => (
            <div key={companion.id} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-700 text-lg">
                  お連れ様 {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeCompanion(companion.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={companion.name}
                  onChange={(e) =>
                    updateCompanion(companion.id, "name", e.target.value)
                  }
                  className="input-field"
                  placeholder="お名前"
                />
                <input
                  type="text"
                  value={companion.kana}
                  onChange={(e) =>
                    updateCompanion(companion.id, "kana", e.target.value)
                  }
                  className="input-field"
                  placeholder="おなまえ（かな）"
                />
              </div>

              <textarea
                value={companion.allergy}
                onChange={(e) =>
                  updateCompanion(companion.id, "allergy", e.target.value)
                }
                className="input-field"
                placeholder="アレルギー"
                rows={2}
              />
            </div>
          ))}

          {companions.length > 0 && (
            <p className="text-sm text-gray-500 mb-6">
              一度に登録できるお連れ様は5名までです。
              <br />
              5名以上の出欠登録が必要な場合は、複数回に分けてご登録ください。
            </p>
          )}
        </div>

        {/* 利用規約 */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-rose-600"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            <a href="#" className="text-rose-600 hover:text-rose-700 underline">
              利用規約
            </a>
            をお読みの上、ご登録ください
          </label>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn-primary px-12"
            disabled={!agreedToTerms}
          >
            送信
          </button>
        </div>
      </form>
    </section>
  );
};
