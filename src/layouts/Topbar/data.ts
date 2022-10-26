import {ProfileOption, SearchOption } from '../types';


const profileMenus: ProfileOption[] = [
    {
        label: 'Profile',
        icon: 'mdi mdi-account-circle',
        redirectTo: '/account/profile',
    },
    {
        label: 'Lock Screen',
        icon: 'mdi mdi-lock-outline',
        redirectTo: '/account/lock-screen',
    },
    {
        label: 'Logout',
        icon: 'mdi mdi-logout',
        redirectTo: '/account/logout',
    },
];

const searchOptions: SearchOption[] = [
    { value: '1', label: 'Analytics Report', icon: 'uil-notes', type: 'report' },
    { value: '2', label: 'How can I help you?', icon: 'uil-life-ring', type: 'help' }
];

export { profileMenus, searchOptions };
