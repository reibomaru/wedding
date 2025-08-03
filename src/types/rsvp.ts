export type RSVPFormData = {
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
};

export type CompanionData = {
  id: string;
  name: string;
  kana: string;
  allergy: string;
};

export type FirestoreRSVPData = {
  id?: string;
  attendance: "attend" | "decline";
  name: string;
  kana: string;
  postcode: string;
  address: string;
  building: string;
  phone: string;
  email: string;
  allergy: string;
  message: string;
  parentId?: string; // お連れ様の場合のみ
  isCompanion: boolean;
  createdAt: Date;
  updatedAt: Date;
};