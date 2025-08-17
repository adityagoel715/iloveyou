import postcard from "../components/postcard.jpg"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate=useNavigate();
  
  const handleClick = () => {
    navigate("/buldak"); 
  };
  
  return (
   <div className="page-container">
    <div className="image-wrapper">
      <img src={postcard} alt="Postcard" className="main-image"/>
      <button className="image-button1" onClick={handleClick}>Next</button>
      
    </div>
   </div>
   
  );
}
