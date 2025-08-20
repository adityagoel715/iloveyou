import postcard from "../components/coupons.jpg"
import { useNavigate } from "react-router-dom";

export default function Coupon() {
  const navigate=useNavigate();
  
  const handleClick = () => {
    navigate("/note1"); 
  };
  
  return (
   <div className="page-container">
    <div className="image-wrapper">
      <img src={postcard} alt="Postcard" className="main-image"/>
      <button className="image-button2" onClick={handleClick}>Click here for a note</button>
      
      
    </div>
   </div>
   
  );
}
