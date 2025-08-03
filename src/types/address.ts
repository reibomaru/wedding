export type AddressData = {
  postcode: string;
  prefecture: string;
  city: string;
  town: string;
  fullAddress: string;
};

export type PostalCodeApiResponse = {
  message: string | null;
  results: Array<{
    address1: string; // 都道府県
    address2: string; // 市区町村
    address3: string; // 町域
    kana1: string;    // 都道府県カナ
    kana2: string;    // 市区町村カナ
    kana3: string;    // 町域カナ
    prefcode: string; // 都道府県コード
    zipcode: string;  // 郵便番号
  }>;
};