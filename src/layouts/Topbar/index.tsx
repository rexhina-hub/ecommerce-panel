import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {showRightSidebar, changeSidebarType} from 'redux/actions';
import * as layoutConstants from 'appConstants';
import {useRedux, useToggle, useViewport} from 'hooks';
import {profileMenus, searchOptions} from './data';
import LanguageDropdown from './LanguageDropdown';
import ProfileDropdown from './ProfileDropdown';
import SearchDropdown from './SearchDropdown';
import TopbarSearch from './TopbarSearch';
import userImage from 'assets/images/avatar.jpg';
import logoSmDark from 'assets/images/logo_sm_dark.png';
import logoSmLight from 'assets/images/logo-sm.png';
import logo from 'assets/images/logo-light.png';

type TopbarProps = {
    hideLogo?: boolean;
    navCssClasses?: string;
    openLeftMenuCallBack?: () => void;
    topbarDark?: boolean;
};

const Topbar = ({hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark}: TopbarProps) => {
    const {dispatch, appSelector} = useRedux();
    const {width} = useViewport();
    const [isMenuOpened, toggleMenu] = useToggle();
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';

    const {layoutType, leftSideBarType} = appSelector((state) => ({
        layoutType: state.Layout.layoutType,
        leftSideBarType: state.Layout.leftSideBarType,
    }));

    const user = sessionStorage.getItem('nepazar_admin');
    const parseUser = user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
    let fullname;
    if (parseUser?.user) { //login
        fullname = parseUser?.user?.first_name +' '+ parseUser?.user?.last_name
    } else { //update
        fullname = parseUser?.first_name+' '+ parseUser?.last_name
    }
    const name = fullname;
    const handleLeftMenuCallBack = () => {
        toggleMenu();
        if (openLeftMenuCallBack) openLeftMenuCallBack();

        switch (layoutType) {
            case layoutConstants.LayoutTypes.LAYOUT_VERTICAL:
                if (width >= 768) {
                    if (leftSideBarType === 'fixed' || leftSideBarType === 'scrollable')
                        dispatch(changeSidebarType(layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_CONDENSED));
                    if (leftSideBarType === 'condensed')
                        dispatch(changeSidebarType(layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_FIXED));
                }
                break;

            case layoutConstants.LayoutTypes.LAYOUT_FULL:
                if (document.body) {
                    document.body.classList.toggle('hide-menu');
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className={classNames('navbar-custom', navCssClasses)}>
            <div className={containerCssClasses}>
                {!hideLogo && (
                    <Link to="/" className="topnav-logo">
                        <span className="topnav-logo-lg">
                            <img src={logo} alt="logo" height="16"/>
                        </span>
                        <span className="topnav-logo-sm">
                            <img src={topbarDark ? logoSmLight : logoSmDark} alt="logo" height="16"/>
                        </span>
                    </Link>
                )}

                <ul className="list-unstyled topbar-menu float-end mb-0">
                    <li className="notification-list topbar-dropdown d-xl-none">
                        <SearchDropdown/>
                    </li>
                    <li className="dropdown notification-list topbar-dropdown">
                        <LanguageDropdown/>
                    </li>
                    <li className="dropdown notification-list">
                        <ProfileDropdown
                            userImage={userImage}
                            menuItems={profileMenus}
                            name={name}
                            userTitle={'Admin'}
                        />
                    </li>
                </ul>

                {/* toggle for vertical layout */}
                {(layoutType === layoutConstants.LayoutTypes.LAYOUT_VERTICAL ||
                    layoutType === layoutConstants.LayoutTypes.LAYOUT_FULL) && (
                    <button className="button-menu-mobile open-left" onClick={handleLeftMenuCallBack}>
                        <i className="mdi mdi-menu"/>
                    </button>
                )}
                {layoutType === layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL && (
                    <Link
                        to="#"
                        className={classNames('navbar-toggle', {open: isMenuOpened})}
                        onClick={handleLeftMenuCallBack}
                    >
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                )}

                {layoutType === layoutConstants.LayoutTypes.LAYOUT_DETACHED && (
                    <Link to="#" className="button-menu-mobile disable-btn" onClick={handleLeftMenuCallBack}>
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                )}
                <TopbarSearch options={searchOptions}/>
            </div>
        </div>
    );
};

export default Topbar;
