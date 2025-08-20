import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FlirtyReel() {
  // Your flirty lines (add as many as you want!)
  const lines = useMemo(() => [
    "I heard your neck hurts, my biceps can be your new pillows💪🏻",
    "I'm lightning,will you be McQueen? ",
    "Cancelling my Spotify because you're my favourite music",
    "I'm no doctor but I think you just gave me butterflies🦋",
    "I look at you the same way white monster looks at me",
    "Are you a matchstick?Cuz you lit a fire in my heart!",
    "Forget calories, you’re my guilty pleasure 😘",
    "I want to give you 21(In hindi)",
    "Are you a flower, becauze ive pollen for you",
    "Are you Buldak? Because you leave me hot, craving, and a little breathless 🔥😏"
  ], []);
  // Reel config
  const ITEM_H = 64;           // height of one row (keep in sync with CSS)
  const REPEAT = 12;           // how many times we repeat the list to allow long scroll
  const TOTAL_ITEMS = lines.length * REPEAT;
  const navigate=useNavigate();
  
  const handleClick = () => {
    navigate("/flower"); 
  };

  // We keep a long track and start somewhere in the middle to scroll forward safely
  const START_OFFSET = lines.length * Math.floor(REPEAT / 2);

  // State
  const [displayIndex, setDisplayIndex] = useState(START_OFFSET); // which row is centered
  const [transitionMs, setTransitionMs] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const timerRef = useRef(null);

  const currentIdx = displayIndex % lines.length;
  

  // Build the repeated track
  const track = useMemo(() => {
    const arr = [];
    for (let r = 0; r < REPEAT; r++) {
      for (let i = 0; i < lines.length; i++) arr.push(lines[i]);
    }
    return arr;
  }, [lines]);

  // Spin logic: fast → slow → land on a new (different) line
  const spin = () => {
    if (spinning) return;

    // choose a new target index different from current
    let target = Math.floor(Math.random() * lines.length);
    if (target === currentIdx) target = (target + 1) % lines.length;

    const stepsToTarget =
      2 * lines.length + // at least two full loops for drama
      ((target - currentIdx + lines.length) % lines.length);

    setSpinning(true);

    let step = 0;
    const doStep = () => {
      // Decelerate: small delay at start, larger at the end
      const progress = step / stepsToTarget;
      const delay = 24 + Math.floor(progress * 170); // 24ms → ~194ms
      setTransitionMs(delay);
      setDisplayIndex((x) => (x + 1) % TOTAL_ITEMS);

      step += 1;
      if (step <= stepsToTarget) {
        timerRef.current = setTimeout(doStep, delay);
      } else {
        // Snap to a safe middle zone so future spins have space
        // Align the displayIndex so currentIdx === target but keep us around middle
        const aligned = START_OFFSET - (START_OFFSET % lines.length) + target;
        setTransitionMs(0);
        setDisplayIndex(aligned);
        setSpinning(false);
      }
    };

    // start
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(doStep, 0);
  };

  // Keyboard: Space / Enter to spin
  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat) return;
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        spin();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, currentIdx, lines.length]);

  // Cleanup any pending timers on unmount
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Inline style for transform/transition
  const transformY = -(displayIndex * ITEM_H);

  return (
    <div className="reel-page">
      <h1 className="reel-title">Craving something cheesy?🧀 </h1>

      <div className="reel-window" aria-live="polite" aria-atomic="true">
        <div
          className="reel-track"
          style={{
            transform: `translateY(${transformY}px)`,
            transition: `transform ${transitionMs}ms linear`,
          }}
        >
          {track.map((txt, i) => (
            <div key={i} className="reel-item">
              {txt}
            </div>
          ))}
        </div>
      </div>

      <div className="reel-controls">
        <button className="btn primary" onClick={spin} disabled={spinning}>
          {spinning ? "Spinning..." : "New Line"}
        </button>
        <button
          className="btn ghost"
          onClick={handleClick}
          disabled={spinning}
          
        >
          Next
        </button>
      </div>

      <p className="hint">Tip: press <kbd>Space</kbd> or <kbd>Enter</kbd> to spin.</p>
    </div>
  );
}
