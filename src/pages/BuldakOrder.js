import { useEffect, useMemo, useState } from "react";
import buldak  from "../components/buldak.png"

const CORRECT = [
  { id: "1", text: "Boil water in a pot" },
  { id: "2", text: "Add the noodles to the pot" },
  { id: "3", text: "Drain water" },
  { id: "4", text: "Stir in spicy sauce!" },
  { id: "5", text: "Simmer to coat noodles glossy" },
  { id: "6", text: "Eat it with Adi" },
  { id: "7", text: "Do your happy dance" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TOTAL_TIME = 35; // seconds

export default function BuldakOrderGame() {
  const initial = useMemo(() => shuffle(CORRECT), []);
  const [items, setItems] = useState(initial);
  const [result, setResult] = useState(null); // "win" | "try" | "time" | null
  const [dragIndex, setDragIndex] = useState(null);

  // timer
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [running, setRunning] = useState(true);

  // tick every 1s while running
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [running, timeLeft]);

  // when time hits 0 -> show message and stop
  useEffect(() => {
    if (timeLeft <= 0 && running) {
      setRunning(false);
      setResult("time");
    }
  }, [timeLeft, running]);

  const onDragStart = (idx) => (e) => {
    if (!running) return;                 // lock when time over
    setDragIndex(idx);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (idx) => (e) => {
    if (!running) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const onDrop = (idx) => (e) => {
    if (!running) return;
    e.preventDefault();
    if (dragIndex === null || dragIndex === idx) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(idx, 0, moved);
    setItems(next);
    setDragIndex(null);
    setResult(null);
  };

  const check = () => {
    if (timeLeft <= 0) return; // ignore after time’s up
    const ok = items.every((it, i) => it.id === CORRECT[i].id);
    setResult(ok ? "win" : "try");
    if (ok) setRunning(false);
  };

  const reset = () => {
    setItems(shuffle(CORRECT));
    setResult(null);
    setTimeLeft(TOTAL_TIME);
    setRunning(true);
  };

  // keyboard fallback
  const move = (from, to) => {
    if (!running) return;
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setItems(next);
    setResult(null);
  };

  const pct = Math.max(0, Math.min(100, (timeLeft / TOTAL_TIME) * 100));

  return (
    <div className="buldak-page">
      <img src={buldak} alt="buldak" className="buldak-image"/>
      <h1 className="title">Arrange the steps to make your favourite spicy Buldak!</h1>
      <p className="subtitle">Drag the blocks into the correct order before the timer ends!</p>

      {/* TIMER BAR + READOUT */}
      <div className="timer">
        <div className="bar" style={{ width: `${pct}%` }} />
        <span className="readout">{timeLeft}s</span>
      </div>

      <ol className="board" aria-label="Reorder steps">
        {items.map((it, idx) => (
          <li
            key={it.id}
            className={`card ${!running ? "disabled" : ""}`}
            draggable={running}
            onDragStart={onDragStart(idx)}
            onDragOver={onDragOver(idx)}
            onDrop={onDrop(idx)}
          >
            <span className="badge">{idx + 1}</span>
            <span className="text">{it.text}</span>
            <div className="kbd">
              <button aria-label="Move up" onClick={() => move(idx, idx - 1)} disabled={!running}>↑</button>
              <button aria-label="Move down" onClick={() => move(idx, idx + 1)} disabled={!running}>↓</button>
            </div>
          </li>
        ))}
      </ol>

      <div className="actions">
        <button className="btn primary" onClick={check} disabled={!running || timeLeft <= 0}>Check</button>
        <button className="btn ghost" onClick={reset}>Try Again</button>
      </div>

      {result === "win" && <div className="result ok">Perfect! You beat the clock 🔥🍜</div>}
      {result === "try" && <div className="result nope">Not quite—adjust and hit Check again!</div>}
      {result === "time" && <div className="result nope">Time’s up! Press <b>Try Again</b> to replay.</div>}
    </div>
  );
}
