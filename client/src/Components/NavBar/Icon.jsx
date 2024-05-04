import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import AlphaMenLogo from "../../../public/assets/AlphaMenLogo.png";
function Icon({ className = "" }) {
  return (
    <Link to="/" className={className}>
      <img
        className="w-fit aspect-auto h-8"
        src={AlphaMenLogo}
        alt="Logo"
        srcset=""
      />
    </Link>
  );
}

export default Icon;
