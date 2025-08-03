import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import type { FirestoreRSVPData } from "../types/rsvp";

export class AdminService {
  /**
   * 全てのRSVPデータを取得
   */
  static async getAllRSVPData(): Promise<FirestoreRSVPData[]> {
    try {
      const q = query(
        collection(db, "rsvp"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as FirestoreRSVPData));
    } catch (error) {
      console.error("Error fetching RSVP data:", error);
      throw error;
    }
  }

  /**
   * メインの出席者のみを取得（お連れ様を除く）
   */
  static async getMainAttendees(): Promise<FirestoreRSVPData[]> {
    try {
      const allData = await this.getAllRSVPData();
      return allData.filter(data => !data.isCompanion);
    } catch (error) {
      console.error("Error fetching main attendees:", error);
      throw error;
    }
  }

  /**
   * お連れ様データを取得
   */
  static async getCompanions(): Promise<FirestoreRSVPData[]> {
    try {
      const allData = await this.getAllRSVPData();
      return allData.filter(data => data.isCompanion);
    } catch (error) {
      console.error("Error fetching companions:", error);
      throw error;
    }
  }

  /**
   * 統計情報を取得
   */
  static async getStatistics(): Promise<{
    totalResponses: number;
    attendees: number;
    declines: number;
    companions: number;
    totalGuests: number;
  }> {
    try {
      const allData = await this.getAllRSVPData();
      const mainAttendees = allData.filter(data => !data.isCompanion);
      const companions = allData.filter(data => data.isCompanion);
      
      const attendees = mainAttendees.filter(data => data.attendance === "attend").length;
      const declines = mainAttendees.filter(data => data.attendance === "decline").length;
      
      return {
        totalResponses: mainAttendees.length,
        attendees,
        declines,
        companions: companions.length,
        totalGuests: attendees + companions.filter(c => 
          mainAttendees.find(m => m.id === c.parentId)?.attendance === "attend"
        ).length,
      };
    } catch (error) {
      console.error("Error calculating statistics:", error);
      throw error;
    }
  }
}