import { Link } from 'react-router-dom'


function LinkBtn({content = 'LinkBtn', to = '/', className = ''}) {
    return (
        <Link to={to} className={className}>{content}</Link>
    );
}

export default LinkBtn;
