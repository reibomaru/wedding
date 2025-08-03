import type { AddressData, PostalCodeApiResponse } from "../types/address";

export class AddressService {
  /**
   * 郵便番号を正規化（ハイフンを削除、7桁に）
   */
  static normalizePostcode(postcode: string): string {
    return postcode.replace(/[－-]/g, "").replace(/\D/g, "");
  }

  /**
   * 郵便番号のフォーマット（3桁-4桁）
   */
  static formatPostcode(postcode: string): string {
    const normalized = this.normalizePostcode(postcode);
    if (normalized.length === 7) {
      return `${normalized.slice(0, 3)}-${normalized.slice(3)}`;
    }
    return postcode;
  }

  /**
   * 郵便番号のバリデーション
   */
  static isValidPostcode(postcode: string): boolean {
    const normalized = this.normalizePostcode(postcode);
    return /^\d{7}$/.test(normalized);
  }

  /**
   * 郵便番号から住所を検索
   * zipcloud APIを使用（無料、APIキー不要）
   */
  static async lookupAddress(postcode: string): Promise<AddressData | null> {
    const normalized = this.normalizePostcode(postcode);
    
    if (!this.isValidPostcode(normalized)) {
      throw new Error("無効な郵便番号です");
    }

    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${normalized}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: PostalCodeApiResponse = await response.json();

      if (data.message) {
        throw new Error(data.message);
      }

      if (!data.results || data.results.length === 0) {
        return null;
      }

      const result = data.results[0];
      const fullAddress = `${result.address1}${result.address2}${result.address3}`;

      return {
        postcode: this.formatPostcode(normalized),
        prefecture: result.address1,
        city: result.address2,
        town: result.address3,
        fullAddress,
      };
    } catch (error) {
      console.error("Address lookup error:", error);
      throw error;
    }
  }

  /**
   * 郵便番号の入力中リアルタイム検索
   * 7桁入力完了時のみ検索実行
   */
  static async lookupAddressIfComplete(
    postcode: string
  ): Promise<AddressData | null> {
    const normalized = this.normalizePostcode(postcode);
    
    if (normalized.length === 7) {
      return await this.lookupAddress(normalized);
    }
    
    return null;
  }
}