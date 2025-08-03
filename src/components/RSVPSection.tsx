import React, { useState } from "react";
import { Plus, Trash2, Loader, Search } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { RSVPService } from "../services/rsvpService";
import { AddressService } from "../services/addressService";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import {
  validatePhoneNumber,
  formatPhoneNumber,
} from "../utils/phoneValidation";
import { validatePostcode } from "../utils/validation";
import type { RSVPFormWithCompanions } from "../types/rsvp";

export const RSVPSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<RSVPFormWithCompanions>({
    defaultValues: {
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
      companions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companions",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const watchedPostcode = watch("postcode");

  const handlePostcodeChange = async (value: string) => {
    // 郵便番号のフォーマット
    const formatted = AddressService.formatPostcode(value);
    setValue("postcode", formatted);
  };

  const handleManualAddressLookup = async () => {
    if (!watchedPostcode) {
      setSubmitError("郵便番号を入力してください。");
      return;
    }

    const normalized = AddressService.normalizePostcode(watchedPostcode);
    if (!AddressService.isValidPostcode(normalized)) {
      setSubmitError("正しい郵便番号を入力してください（7桁）。");
      return;
    }

    setSubmitError(null);
    setIsLookingUpAddress(true);

    try {
      const addressData = await AddressService.lookupAddress(normalized);
      if (addressData) {
        setValue("postcode", addressData.postcode);
        setValue("address", addressData.fullAddress);
      } else {
        setSubmitError("該当する住所が見つかりませんでした。");
      }
    } catch (error) {
      console.error("Manual address lookup failed:", error);
      setSubmitError(
        "住所検索に失敗しました。しばらく経ってから再度お試しください。"
      );
    } finally {
      setIsLookingUpAddress(false);
    }
  };

  const addCompanion = () => {
    if (fields.length < 5) {
      append({
        name: "",
        kana: "",
        allergy: "",
      });
    }
  };

  const onSubmit = async (data: RSVPFormWithCompanions) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await RSVPService.saveRSVP(data, data.companions);
      alert("出欠情報を登録いたしました。ありがとうございます。");

      // フォームをリセット
      setValue("attendance", "");
      setValue("name", "");
      setValue("kana", "");
      setValue("postcode", "");
      setValue("address", "");
      setValue("building", "");
      setValue("phone", "");
      setValue("email", "");
      setValue("allergy", "");
      setValue("message", "");
      setValue("companions", []);
      setAgreedToTerms(false);
    } catch (error) {
      console.error("RSVP submission error:", error);
      setSubmitError(
        "送信中にエラーが発生しました。しばらく経ってから再度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 rounded-lg shadow-sm"
      >
        {/* 出欠選択 */}
        <div>
          <div className="flex gap-8 justify-center mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="attend"
                {...register("attendance", {
                  required: "出欠をお選びください",
                })}
                className="w-5 h-5 text-rose-600"
              />
              <span className="text-xl font-medium text-green-600">
                出席 attend
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="decline"
                {...register("attendance", {
                  required: "出欠をお選びください",
                })}
                className="w-5 h-5 text-rose-600"
              />
              <span className="text-xl font-medium text-gray-600">
                欠席 decline
              </span>
            </label>
          </div>
          {errors.attendance && (
            <p className="text-center text-sm text-red-600">
              {errors.attendance.message}
            </p>
          )}
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
              {...register("name", {
                required: "名前を入力してください",
              })}
              className={`input-field ${
                errors.name ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder="お名前"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              かな <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("kana", {
                required: "かなを入力してください",
              })}
              className={`input-field ${
                errors.kana ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder="おなまえ（かな）"
            />
            {errors.kana && (
              <p className="mt-1 text-sm text-red-600">{errors.kana.message}</p>
            )}
          </div>
        </div>

        {/* 住所情報 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            〒 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                {...register("postcode", {
                  required: "郵便番号を入力してください",
                  validate: validatePostcode,
                })}
                onChange={(e) => handlePostcodeChange(e.target.value)}
                className={`input-field ${
                  errors.postcode ? "border-red-500 focus:border-red-500" : ""
                }`}
                placeholder="例：123-4567"
                maxLength={8}
              />
              {isLookingUpAddress && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleManualAddressLookup}
              disabled={isLookingUpAddress || !watchedPostcode}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              {isLookingUpAddress ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              住所検索
            </button>
          </div>
          {errors.postcode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.postcode.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            郵便番号を入力すると自動補完されます。または住所検索ボタンをクリックしてください。
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            住所 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("address", {
              required: "住所を入力してください",
            })}
            className={`input-field ${
              errors.address ? "border-red-500 focus:border-red-500" : ""
            }`}
            placeholder="ご住所"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            建物名
          </label>
          <input
            type="text"
            {...register("building")}
            className="input-field"
            placeholder="建物名・部屋番号"
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
              {...register("phone", {
                required: "電話番号を入力してください",
                validate: validatePhoneNumber,
              })}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                setValue("phone", formatted);
              }}
              className={`input-field ${
                errors.phone ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder="例: 090-1234-5678"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "メールアドレスを入力してください",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "有効なメールアドレスを入力してください",
                },
              })}
              className={`input-field ${
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder="メールアドレス"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* アレルギー・メッセージ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            アレルギー
          </label>
          <textarea
            {...register("allergy")}
            className="input-field"
            placeholder="アレルギー"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メッセージ
          </label>
          <textarea
            {...register("message")}
            className="input-field"
            placeholder="メッセージ"
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
              disabled={fields.length >= 5}
              className="flex items-center gap-2 text-rose-600 hover:text-rose-700 disabled:text-gray-400"
            >
              <Plus size={16} />
              お連れ様を追加する
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-700 text-lg">
                  お連れ様 {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  {...register(`companions.${index}.name` as const)}
                  className="input-field"
                  placeholder="お名前"
                />
                <input
                  type="text"
                  {...register(`companions.${index}.kana` as const)}
                  className="input-field"
                  placeholder="おなまえ（かな）"
                />
              </div>

              <textarea
                {...register(`companions.${index}.allergy` as const)}
                className="input-field"
                placeholder="アレルギー"
                rows={2}
              />
            </div>
          ))}

          {fields.length > 0 && (
            <p className="text-sm text-gray-500 mb-6">
              一度に登録できるお連れ様は5名までです。
              <br />
              5名以上の出欠登録が必要な場合は、複数回に分けてご登録ください。
            </p>
          )}
        </div>

        {/* エラーメッセージ */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600 font-medium">{submitError}</p>
          </div>
        )}

        {/* プライバシーポリシー */}
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
            <button
              type="button"
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-rose-600 hover:text-rose-700 underline"
            >
              プライバシーポリシー
            </button>
            をお読みの上、同意してご登録ください
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn-primary px-12 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!agreedToTerms || isSubmitting}
          >
            {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "送信中..." : "送信"}
          </button>
        </div>
      </form>

      {/* プライバシーポリシーモーダル */}
      <PrivacyPolicyModal
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
    </section>
  );
};
