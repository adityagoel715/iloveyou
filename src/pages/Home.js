import envelope from "../components/envelope.jpeg"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate=useNavigate();
  
  const handleClick = () => {
    navigate("/note"); // goes to scrapbook page
  };
  
  return (
   <div className="page-container">
    <div className="image-wrapper">
      <img src={envelope} alt="Envelope" className="main-image"/>
      <button className="image-button" onClick={handleClick}>Open</button>
    </div>
   </div>
   
  );
}
