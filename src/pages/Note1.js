import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Us from "../components/us.jpg";

export default function NotePage() {
  const [typed, setTyped] = useState("");
  const navigate = useNavigate();

  const fullText =
    "You're the one who  introduced me to Buldak and now its one of my favourites. But Buldak tastes the best with you. I can't wait to try out different chatpata khana with you 💖Ps:You add spice to my life just like Buldak🤭";

  // typewriter on mount
  useEffect(() => {
  setTyped("");
  const chars = Array.from(fullText); // handles emoji safely
  let i = 0;
  let timer;

  const tick = () => {
    setTyped(chars.slice(0, i + 1).join("")); // ✅ rebuild full substring
    i += 1;
    if (i < chars.length) {
      timer = setTimeout(tick, 25);
    }
  };

  tick();
  return () => clearTimeout(timer);
}, [fullText]);


  return (
    <div className="notepage">
      {/* floating butterflies only */}
      <div className="floaters show" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="floater butter">🦋</span>
        ))}
      </div>

      <div className="content">
        {/* Polaroid: static */}
        <div className="polaroid opened">
          <div className="photo-wrap">
            <img src={Us} alt="us" className="photo" />
          </div>
          <div className="caption">I LOVE YOUR SMILE 💖</div>
        </div>

        {/* Note panel */}
        <div className="note reveal">
          <h2>💌 a little note just for you</h2>
          <p className="typed">{typed}</p>

          <div className="actions">
            <button className="btn primary" onClick={() => navigate("/fl")}>
             Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
