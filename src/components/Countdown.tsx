import React, { useState, useEffect } from "react";

type CountdownProps = {
  targetDate: Date;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section id="countdown" className="section-container text-center">
      <h2 className="heading-main">Countdown</h2>
      <p className="text-elegant mb-12 text-xl">to 2025.10.04</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-rose-600 mb-2">
            {timeLeft.days}
          </div>
          <div className="text-lg uppercase tracking-widest text-gray-600 font-medium">
            DAYS
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-rose-600 mb-2">
            {timeLeft.hours}
          </div>
          <div className="text-lg uppercase tracking-widest text-gray-600 font-medium">
            HOURS
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-rose-600 mb-2">
            {timeLeft.minutes}
          </div>
          <div className="text-lg uppercase tracking-widest text-gray-600 font-medium">
            MINUTES
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-rose-600 mb-2">
            {timeLeft.seconds}
          </div>
          <div className="text-lg uppercase tracking-widest text-gray-600 font-medium">
            SECONDS
          </div>
        </div>
      </div>
    </section>
  );
};
