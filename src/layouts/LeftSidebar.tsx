import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import { getMenuItems } from 'helpers';
import AppMenu from './Menu/';
import logoSm from 'assets/images/logo-sm.png';
import logoDark from 'assets/images/logo-dark.png';
import logoDarkSm from 'assets/images/logo_sm_dark.png';
import logo from 'assets/images/logo.png';
import profileImg from 'assets/images/avatar.jpg';

type SideBarContentProps = {
    hideUserProfile: boolean;
};

const SideBarContent = ({ hideUserProfile }: SideBarContentProps) => {
    return (
        <>
            {!hideUserProfile && (
                <div className="leftbar-user">
                    <Link to="/">
                        <img src={profileImg} alt="" height="42" className="rounded-circle shadow-sm" />
                        <span className="leftbar-user-name">Rexhina Prifti</span>
                    </Link>
                </div>
            )}
            <AppMenu menuItems={getMenuItems()} />

            <div
                className={classNames('help-box', 'text-center', {
                    'text-white': hideUserProfile,
                })}
            >
                <Link to="/" className="float-end close-btn text-white">
                    <i className="mdi mdi-close" />
                </Link>
            </div>
            <div className="clearfix" />
        </>
    );
};

type LeftSidebarProps = {
    hideLogo?: boolean;
    hideUserProfile: boolean;
    isLight: boolean;
    isCondensed: boolean;
};

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile }: LeftSidebarProps) => {
    const menuNodeRef = useRef<HTMLDivElement>(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: MouseEvent) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target as Node)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    return (
        <div className="leftside-menu" ref={menuNodeRef}>
            {!hideLogo && (
                <>
                    <Link to="/" className="logo text-center logo-light">
                        <span className="logo-lg">
                            <img src={isLight ? logoDark : logo} alt="logo" height="35" />
                        </span>
                        <span className="logo-sm">
                            <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="25" />
                        </span>
                    </Link>
                </>
            )}

            {!isCondensed && (
                <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                    <SideBarContent hideUserProfile={hideUserProfile} />
                </SimpleBar>
            )}
            {isCondensed && <SideBarContent hideUserProfile={hideUserProfile} />}
        </div>
    );
};

export default LeftSidebar;
