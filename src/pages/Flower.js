import flower from "../components/flower.jpeg"
import { useNavigate } from "react-router-dom";

export default function Flower() {
  const navigate=useNavigate();
  
  const handleClick = () => {
    navigate("/LastPage"); // goes to scrapbook page
  };
  
  return (
   <div className="page-container">
    <div className="image-wrapper">
      <img src={flower} alt="Flower" className="main-image"/>
      <button className="image-button2" onClick={handleClick}>Next</button>
    </div>
   </div>
   
  );
}
