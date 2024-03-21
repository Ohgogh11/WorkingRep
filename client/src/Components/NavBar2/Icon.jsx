import { Link } from "react-router-dom";
import { AiFillGithub } from 'react-icons/ai';

function Icon({className=''}) {
    return (
        <Link to='/' className={className}>
            <AiFillGithub size={40} />
        </Link>
    )
}

export default Icon
