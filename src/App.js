import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Note from "./pages/Note";
import BuldakOrderGame from "./pages/BuldakOrder";
import Coupon from "./pages/Coupons";
import NotePage from "./pages/Note1";
import FlirtyLines from "./pages/Flirt";
import Flower from "./pages/Flower";
import Page from "./pages/LastPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/note" element={<Note/>}/>
      <Route path="/buldak" element={<BuldakOrderGame/>}/>
      <Route path="/reward" element={<Coupon/>}/>
      <Route path="/note1" element={<NotePage/>}/>
      <Route path="/fl" element={<FlirtyLines/>}/>
      <Route path="/flower" element={<Flower/>}/>
      <Route path="/LastPage" element={<Page/>}/>
      
      
    </Routes>
  );
}
