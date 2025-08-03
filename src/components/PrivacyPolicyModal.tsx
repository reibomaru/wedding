import React from "react";
import { X } from "lucide-react";

type PrivacyPolicyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-opacity-30" onClick={onClose} />

      {/* モーダルコンテンツ */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-serif font-semibold text-gray-900">
              プライバシーポリシー
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* コンテンツ */}
          <div className="p-6 space-y-6 text-sm leading-relaxed">
            <div>
              <p className="text-gray-700 mb-4">
                杉浦 伶・田中
                陽子（以下「新郎新婦」といいます。）は、結婚式招待状フォームを通じて収集する個人情報について、以下のとおりプライバシーポリシーを定めます。
              </p>
            </div>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                1. 収集する個人情報
              </h3>
              <p className="text-gray-700 mb-2">
                当フォームでは、以下の個人情報を収集いたします：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>氏名・ふりがな</li>
                <li>連絡先（電話番号、メールアドレス）</li>
                <li>住所（郵便番号、住所、建物名）</li>
                <li>出席・欠席の回答</li>
                <li>食事の好み・アレルギー情報</li>
                <li>同伴者の情報（氏名、ふりがな、アレルギー情報）</li>
                <li>その他任意でいただくメッセージ</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                2. 個人情報の利用目的
              </h3>
              <p className="text-gray-700 mb-2">
                収集した個人情報は、以下の目的でのみ利用いたします：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>結婚式の準備・運営</li>
                <li>招待状の送付</li>
                <li>席次・料理の手配</li>
                <li>当日の連絡事項の通知</li>
                <li>結婚式に関する各種ご案内</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                3. 個人情報の利用範囲
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>新郎新婦および結婚式運営関係者のみが利用します</li>
                <li>結婚式に関する目的以外では使用いたしません</li>
                <li>
                  第三者への提供は行いません（ただし、会場・ケータリング業者など結婚式運営に必要最小限の範囲を除きます）
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                4. 個人情報の保管・管理
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>
                  適切なセキュリティ対策を実施し、個人情報を安全に管理します
                </li>
                <li>
                  Google Firebase Firestoreを利用してデータを保管しています
                </li>
                <li>
                  SSL暗号化により、データ送信時のセキュリティを確保しています
                </li>
                <li>
                  保管期間：結婚式終了後1年間を目処に、個人情報を削除いたします
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                5. ご本人の権利
              </h3>
              <p className="text-gray-700 mb-2">
                ご本人には以下の権利があります：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>個人情報の開示請求</li>
                <li>個人情報の訂正・削除請求</li>
                <li>個人情報の利用停止請求</li>
              </ul>
              <p className="text-gray-700 mt-2">
                これらの権利を行使される場合は、下記の連絡先までお問い合わせください。
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                6. 技術的な情報
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>
                  データベース：Google Firebase Firestore（Google LLC提供）
                </li>
                <li>通信暗号化：SSL/TLS暗号化を使用</li>
                <li>
                  Cookie：本サイトでは、必要最小限のCookieを使用しています
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                7. 免責事項
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>
                  本フォームは、ご本人の責任においてアクセス・利用していただくものです
                </li>
                <li>
                  システム障害、通信障害等により生じた損害について、新郎新婦は責任を負いかねます
                </li>
                <li>
                  不正アクセスや第三者による改ざん等について、新郎新婦は責任を負いかねます
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                8. お問い合わせ先
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-700">
                    <strong>新郎：</strong>杉浦 伶
                  </p>
                  <p className="text-gray-700">
                    <strong>新婦：</strong>田中 陽子
                  </p>
                  <p className="text-gray-700">
                    <strong>連絡先：</strong>お招待状に記載の連絡先まで
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                9. プライバシーポリシーの変更
              </h3>
              <p className="text-gray-700">
                本プライバシーポリシーは、必要に応じて変更される場合があります。変更後のプライバシーポリシーは、本サイトに掲載された時点から効力を生じます。
              </p>
            </section>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-center">
                制定日：2025年8月3日
                <br />
                杉浦 伶・田中 陽子
              </p>
            </div>
          </div>

          {/* フッター */}
          <div className="flex justify-end p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
