import {APICore} from './apiCore';

const user = sessionStorage.getItem('nepazar_admin');
const parseUser = user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
const id = parseUser?.user?.id

const api = new APICore();

function login(params: { email: string; password: string }) {
    const baseUrl = '/login';
    return api.create(`${baseUrl}`, params);
}

function logout() {
    const baseUrl = '/logout';
    return api.create(`${baseUrl}`, {});
}

function updateUser(params:{
    first_name: string; last_name: string; password: string;
    old_password: string; password_confirmation:string}) {
    const baseUrl =  '/update-user/' +`${id}`;
    return api.update(`${baseUrl}`, params);
}

function signup(params: {
    email: string; first_name: string; last_name: string; phone: number; password:string;password_confirmation: string;
}) {
    const baseUrl = '/register';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { email: string }) {
    const baseUrl = '/forgot-password';
    return api.create(`${baseUrl}`, params);
}

function resetPasswordConfirm(params: { email: string; token: string; password: string;
    password_confirmation: string;}) {
    const baseUrl = '/reset-password';
    return api.create(`${baseUrl}`, params);
}

export {login, logout, signup, updateUser, forgotPassword, resetPasswordConfirm};
