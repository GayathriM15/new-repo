import React, { useRef, useState, useEffect } from "react";
import beforeYes from "./assets/valentine.png";
import afterYes from "./assets/mine.jpeg";
import loveVideo from "./assets/love video.mp4";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const noBtnRef = useRef(null);
  const movingRef = useRef(false);
  const petalsInterval = useRef(null);

  const moveNoButton = () => {
    if (!noBtnRef.current || movingRef.current) return;
    movingRef.current = true;

    const x = Math.random() * 260 - 130;
    const y = Math.random() * 70 - 60;

    const btn = noBtnRef.current;
    btn.style.pointerEvents = "none";
    btn.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(() => {
      btn.style.pointerEvents = "auto";
      movingRef.current = false;
    }, 120);
  };

  // 🌹 Rose Petals After YES
  const createPetals = () => {
    for (let i = 0; i < 25; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = Math.random() * 3 + 3 + "s";
      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 6000);
    }
  };

  const handleYes = () => {
    setAccepted(true);
  };

  useEffect(() => {
    if (accepted) {
      createPetals();
      petalsInterval.current = window.setInterval(createPetals, 1200);
    }
    return () => {
      if (petalsInterval.current)
        clearInterval(petalsInterval.current);
    };
  }, [accepted]);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          overflow-y: auto;
          font-family: 'Poppins', sans-serif;
        }

        .container {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(135deg,#ff4d6d,#ff9a9e,#fad0c4);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          z-index: 2;
        }

        img {
          width: 300px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
          z-index: 2;
        }

        .after-yes {
          width: 380px;
        }

        video {
          width: 700px;
          max-width: 50%;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .after-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 35px;
          margin-top: 30px;
        }

        /* 💖 Romantic Decorations */
        .decor {
          position: absolute;
          font-size: 42px;
          animation: float 5s ease-in-out infinite;
          opacity: 0.85;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.6));
        }

        .d1 { top: 8%; left: 8%; }
        .d2 { top: 15%; right: 10%; }
        .d3 { bottom: 25%; left: 12%; }
        .d4 { bottom: 10%; right: 8%; }
        .d5 { top: 40%; left: 3%; }
        .d6 { top: 55%; right: 3%; }
        .d7 { bottom: 40%; right: 20%; }
        .d8 { top: 5%; left: 40%; }
        .d9 { bottom: 5%; left: 45%; }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        /* 🌹 Falling Petals */
        .petal {
          position: fixed;
          top: -20px;
          width: 18px;
          height: 18px;
          background: radial-gradient(circle at 30% 30%, #ff4d6d, #b3003c);
          border-radius: 50% 50% 50% 0;
          opacity: 0.8;
          animation: fall linear forwards;
        }

        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        .buttons {
          position: relative;
          width: 380px;
          height: 140px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          z-index: 2;
        }

        button {
          padding: 14px 38px;
          border-radius: 40px;
          font-size: 18px;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .yes {
          background: #ff1e56;
          color: white;
        }

        .yes:hover {
          transform: scale(1.1);
        }

        .no {
          background: white;
          color: #ff1e56;
          position: absolute;
          right: 0;
        }

        .message {
          font-size: 2.5rem;
          margin-top: 20px;
        }
      `}</style>

      <div className="container">
        {!accepted && (
          <>
            <div className="decor d1">🌹</div>
            <div className="decor d2">🧸</div>
            <div className="decor d3">🍫</div>
            <div className="decor d4">🎁</div>
            <div className="decor d5">💖</div>
            <div className="decor d6">💍</div>
            <div className="decor d7">💕</div>
            <div className="decor d8">💌</div>
            <div className="decor d9">🌸</div>
          </>
        )}

        <h1>Will you be my Valentine? 💘</h1>

        {!accepted ? (
          <>
            <img src={beforeYes} alt="valentine" />

            <div className="buttons">
              <button className="yes" onClick={handleYes}>
                YES 💖
              </button>

              <button
                className="no"
                ref={noBtnRef}
                onMouseMove={moveNoButton}
              >
                NO 😜
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="message">
              💕 You made my day! Happy Valentine’s Day My Love 💕
            </div>

            <div className="after-content">
              <video
                src={loveVideo}
                autoPlay
                loop
                muted
                controls
              />
              <img
                src={afterYes}
                alt="love"
                className="after-yes"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
