import React from "react";

export const MessageSection: React.FC = () => {
  return (
    <section id="message" className="section-container">
      <h2 className="heading-main text-center">Message</h2>

      <div className="text-elegant text-center space-y-6 mb-16">
        <p className="text-lg">皆様いかがお過ごしでしょうか</p>
        <p className="text-lg">
          このたび 結婚式を
          <br />
          執り行うこととなりました
        </p>
        <p className="text-lg">
          日頃お世話になっております
          <br />
          みなさまに 私どもの門出を
          <br />
          お見守りいただきたく
        </p>
        <p className="text-lg">
          ささやかながら小宴を
          <br />
          催したく存じます
        </p>
        <p className="text-lg">
          ご多用中 誠に恐縮ではございますが
          <br />
          ぜひご出席いただきたく
          <br />
          ご案内申し上げます
        </p>
      </div>
    </section>
  );
};
