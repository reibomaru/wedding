import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import type {
  RSVPFormData,
  CompanionData,
  FirestoreRSVPData,
} from "../types/rsvp";

const COLLECTION_NAME = "rsvp";

export class RSVPService {
  /**
   * メールアドレスでRSVPデータを検索
   */
  static async findByEmail(email: string): Promise<FirestoreRSVPData | null> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as FirestoreRSVPData;
    } catch (error) {
      console.error("Error finding RSVP by email:", error);
      throw error;
    }
  }

  /**
   * parent-idでお連れ様データを取得
   */
  static async getCompanionsByParentId(
    parentId: string
  ): Promise<FirestoreRSVPData[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("parentId", "==", parentId),
        where("isCompanion", "==", true)
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
          } as FirestoreRSVPData)
      );
    } catch (error) {
      console.error("Error getting companions:", error);
      throw error;
    }
  }

  /**
   * parent-idに紐づくお連れ様データをすべて削除
   */
  static async deleteCompanionsByParentId(parentId: string): Promise<void> {
    try {
      const companions = await this.getCompanionsByParentId(parentId);

      await Promise.all(
        companions.map((companion) =>
          deleteDoc(doc(db, COLLECTION_NAME, companion.id!))
        )
      );
    } catch (error) {
      console.error("Error deleting companions:", error);
      throw error;
    }
  }

  /**
   * RSVPデータを保存または更新
   */
  static async saveRSVP(
    formData: RSVPFormData,
    companions: CompanionData[]
  ): Promise<string> {
    try {
      // メールアドレスで既存データを検索
      const existingRSVP = await this.findByEmail(formData.email);

      const now = Timestamp.now();
      const rsvpId =
        existingRSVP?.id || doc(collection(db, COLLECTION_NAME)).id;

      // メインのRSVPデータ
      const rsvpData: Omit<FirestoreRSVPData, "id"> = {
        attendance: formData.attendance as "attend" | "decline",
        name: formData.name,
        kana: formData.kana,
        postcode: formData.postcode,
        address: formData.address,
        building: formData.building,
        phone: formData.phone,
        email: formData.email,
        allergy: formData.allergy,
        message: formData.message,
        isCompanion: false,
        createdAt: existingRSVP?.createdAt || now.toDate(),
        updatedAt: now.toDate(),
      };

      // メインデータを保存
      await setDoc(doc(db, COLLECTION_NAME, rsvpId), {
        ...rsvpData,
        createdAt: existingRSVP?.createdAt
          ? Timestamp.fromDate(existingRSVP.createdAt)
          : now,
        updatedAt: now,
      });

      // 既存のお連れ様データを削除
      if (existingRSVP) {
        await this.deleteCompanionsByParentId(rsvpId);
      }

      // 新しいお連れ様データを保存
      await Promise.all(
        companions.map(async (companion) => {
          const companionId = doc(collection(db, COLLECTION_NAME)).id;
          const companionData: Omit<FirestoreRSVPData, "id"> = {
            attendance: formData.attendance as "attend" | "decline",
            name: companion.name,
            kana: companion.kana,
            postcode: formData.postcode, // 親の情報を継承
            address: formData.address, // 親の情報を継承
            building: formData.building, // 親の情報を継承
            phone: formData.phone, // 親の情報を継承
            email: formData.email, // 親の情報を継承
            allergy: companion.allergy,
            message: "", // お連れ様はメッセージなし
            parentId: rsvpId,
            isCompanion: true,
            createdAt: now.toDate(),
            updatedAt: now.toDate(),
          };

          await setDoc(doc(db, COLLECTION_NAME, companionId), {
            ...companionData,
            createdAt: now,
            updatedAt: now,
          });
        })
      );

      return rsvpId;
    } catch (error) {
      console.error("Error saving RSVP:", error);
      throw error;
    }
  }
}
