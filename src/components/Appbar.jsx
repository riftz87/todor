import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Appbar() {
    let icon = faHome;
    let title = 'Todor';

    return (
        <div className="flex items-center p-5 shadow">
            <Icon icon={icon} className="text-3xl px-3" />
            <h1 className="text-3xl font-bold px-3">{ title }</h1>
        </div>
    )
}

export default Appbar;