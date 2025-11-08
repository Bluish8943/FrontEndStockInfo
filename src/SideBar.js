import "./SideBar.css";
import { useNavigate } from "react-router-dom";
const SideBar = () => {

  const navigate = useNavigate();

  const handleAbout = () => {
    navigate('/about')
  }
  
  const handlePrice = () => {
    navigate('/')
  }

  return (
  <ul className="sidebar" style={{ listStyle: "none"}}>
    <li onClick={handlePrice} style={{fontSize: "24px", paddingBottom: "5px",cursor: "pointer", paddingRight: "20px"}}>Stock Data</li>
    <li onClick={handleAbout} style={{fontSize: "24px", paddingBottom: "5px",cursor: "pointer", paddingRight: "20px"}}>About</li>
  </ul>

  )
}
export default SideBar