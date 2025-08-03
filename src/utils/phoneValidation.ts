/**
 * 日本の電話番号バリデーション関数
 */

// 日本の電話番号の正規表現パターン
const PHONE_PATTERNS = {
  // 固定電話: 0X-XXXX-XXXX, 0XX-XXX-XXXX, 0XXX-XX-XXXX
  landline: /^0\d{1,4}-\d{2,4}-\d{2,4}$/,
  // 携帯電話: 090-XXXX-XXXX, 080-XXXX-XXXX, 070-XXXX-XXXX
  mobile: /^(090|080|070)-\d{4}-\d{4}$/,
  // IP電話: 050-XXXX-XXXX
  ip: /^050-\d{4}-\d{4}$/,
  // フリーダイヤル等
  freephone: /^(0120|0800)-\d{3,4}-\d{3,4}$/,
};

// ハイフンなしの数字のみのパターン
const PHONE_PATTERNS_NO_HYPHEN = {
  landline: /^0\d{9,10}$/,
  mobile: /^(090|080|070)\d{8}$/,
  ip: /^050\d{8}$/,
  freephone: /^(0120|0800)\d{6,7}$/,
};

/**
 * 電話番号をフォーマット（ハイフンを追加）
 */
export const formatPhoneNumber = (phone: string): string => {
  // 数字のみを抽出
  const digitsOnly = phone.replace(/[^\d]/g, "");

  if (digitsOnly.length === 0) return "";

  // 携帯電話（11桁）
  if (digitsOnly.length === 11 && /^(090|080|070)/.test(digitsOnly)) {
    return digitsOnly.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");
  }

  // IP電話（11桁）
  if (digitsOnly.length === 11 && /^050/.test(digitsOnly)) {
    return digitsOnly.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");
  }

  // 固定電話（10桁）
  if (digitsOnly.length === 10 && /^0[1-9]/.test(digitsOnly)) {
    // 市外局番によってフォーマットを変える
    if (/^0[1-9]\d/.test(digitsOnly)) {
      return digitsOnly.replace(/^(\d{2,4})(\d{2,4})(\d{4})$/, "$1-$2-$3");
    }
  }

  // フリーダイヤル
  if (/^(0120|0800)/.test(digitsOnly)) {
    if (digitsOnly.length === 10) {
      return digitsOnly.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1-$2-$3");
    }
    if (digitsOnly.length === 11) {
      return digitsOnly.replace(/^(\d{4})(\d{4})(\d{3})$/, "$1-$2-$3");
    }
  }

  // それ以外はそのまま返す
  return phone;
};

/**
 * 電話番号のバリデーション
 */
export const validatePhoneNumber = (phone: string): string | true => {
  if (!phone.trim()) {
    return "電話番号を入力してください";
  }

  const trimmedPhone = phone.trim();

  // ハイフンありの場合
  if (trimmedPhone.includes("-")) {
    const isValid = Object.values(PHONE_PATTERNS).some((pattern) =>
      pattern.test(trimmedPhone)
    );

    if (!isValid) {
      return "正しい電話番号の形式で入力してください（例: 090-1234-5678）";
    }
    return true;
  }

  // ハイフンなしの場合
  const isValid = Object.values(PHONE_PATTERNS_NO_HYPHEN).some((pattern) =>
    pattern.test(trimmedPhone)
  );

  if (!isValid) {
    return "正しい電話番号の形式で入力してください（例: 09012345678）";
  }

  return true;
};

/**
 * 電話番号の種類を判定
 */
export const getPhoneType = (phone: string): string => {
  const trimmedPhone = phone.trim();

  if (
    PHONE_PATTERNS.mobile.test(trimmedPhone) ||
    PHONE_PATTERNS_NO_HYPHEN.mobile.test(trimmedPhone)
  ) {
    return "携帯電話";
  }

  if (
    PHONE_PATTERNS.landline.test(trimmedPhone) ||
    PHONE_PATTERNS_NO_HYPHEN.landline.test(trimmedPhone)
  ) {
    return "固定電話";
  }

  if (
    PHONE_PATTERNS.ip.test(trimmedPhone) ||
    PHONE_PATTERNS_NO_HYPHEN.ip.test(trimmedPhone)
  ) {
    return "IP電話";
  }

  if (
    PHONE_PATTERNS.freephone.test(trimmedPhone) ||
    PHONE_PATTERNS_NO_HYPHEN.freephone.test(trimmedPhone)
  ) {
    return "フリーダイヤル";
  }

  return "不明";
};
