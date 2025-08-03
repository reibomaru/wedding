import { AddressService } from "../services/addressService";

/**
 * メールアドレスのバリデーション
 */
export const validateEmail = (email: string): string | true => {
  if (!email.trim()) {
    return "メールアドレスを入力してください";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "正しいメールアドレスの形式で入力してください";
  }

  return true;
};

/**
 * 郵便番号のバリデーション
 */
export const validatePostcode = (postcode: string): string | true => {
  if (!postcode.trim()) {
    return "郵便番号を入力してください";
  }

  if (!AddressService.isValidPostcode(postcode)) {
    return "正しい郵便番号を入力してください（7桁）";
  }

  return true;
};

/**
 * 必須項目のバリデーション
 */
export const validateRequired = (fieldName: string) => (value: string): string | true => {
  if (!value?.trim()) {
    return `${fieldName}を入力してください`;
  }
  return true;
};

/**
 * ひらがな・カタカナのバリデーション
 */
export const validateKana = (kana: string): string | true => {
  if (!kana.trim()) {
    return "ふりがなを入力してください";
  }

  // ひらがな、カタカナ、長音符、スペースを許可
  const kanaRegex = /^[あ-んア-ヶー\s]+$/;
  if (!kanaRegex.test(kana.trim())) {
    return "ふりがなはひらがな・カタカナで入力してください";
  }

  return true;
};

/**
 * 出欠選択のバリデーション
 */
export const validateAttendance = (attendance: string): string | true => {
  if (!attendance || (attendance !== "attend" && attendance !== "decline")) {
    return "出欠をお選びください";
  }
  return true;
};