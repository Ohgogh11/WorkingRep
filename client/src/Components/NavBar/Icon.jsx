import { Link } from "react-router-dom";
import AlphaMenLogo from "../../assets/AlphaMenLogo.png";

function Icon({ className = "" }) {
  return (
    <Link to="/" className={className}>
      <img className="w-fit aspect-auto h-8" src={AlphaMenLogo} alt="Logo" />
    </Link>
  );
}

export default Icon;
