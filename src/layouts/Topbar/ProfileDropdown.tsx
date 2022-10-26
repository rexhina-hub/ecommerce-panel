import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { useToggle } from 'hooks';
import { ProfileOption } from '../types';

type ProfileDropdownProps = {
    menuItems: Array<ProfileOption>;
    userImage: string;
    name: string;
    userTitle?: string;
};

const ProfileDropdown = ({ userTitle, name, menuItems, userImage }: ProfileDropdownProps) => {
    const [isOpen, toggleDropdown] = useToggle();

    return (
        <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle nav-user arrow-none me-0"
            >
                <span className="account-user-avatar">
                    <img src={userImage} className="rounded-circle" alt="user" />
                </span>
                <span>
                    <span className="account-user-name">{name}</span>
                    <span className="account-position">{userTitle}</span>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu align={'end'} className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-header noti-title">
                        <h5 className="text-overflow m-0">Miresevini !</h5>
                    </div>
                    {menuItems.map((item, i) => {
                        return (
                            <Link to={item.redirectTo} className="dropdown-item notify-item" key={i + '-profile-menu'}>
                                <i className={classNames(item.icon, 'me-1')}></i>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
