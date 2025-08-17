import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Note from "./pages/Note";
import BuldakOrderGame from "./pages/BuldakOrder";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/note" element={<Note/>}/>
      <Route path="/buldak" element={<BuldakOrderGame/>}/>
      
    </Routes>
  );
}
