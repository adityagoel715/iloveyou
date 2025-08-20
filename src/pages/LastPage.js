import video from "../components/happy_birthday.mp4"
import { useNavigate } from "react-router-dom";

export default function Page() {
  const navigate=useNavigate();
  
  const handleClick = () => {
    navigate("/"); // goes to scrapbook page
  };
  
  return (
   <div className="page-container">
    <div className="video-wrapper">
      <video src={video}controls alt="video" className="main-image"/>
      <button className="image-button2" onClick={handleClick}>First Page</button>
    </div>
   </div>
   
  );
}
