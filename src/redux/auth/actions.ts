import {AuthActionTypes} from './constants';

export type AuthActionType = {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.FORGOT_PASSWORD
        | AuthActionTypes.FORGOT_PASSWORD_CHANGE
        | AuthActionTypes.RESET_PASSWORD_CONFIRM
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.UPDATE_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET
        | AuthActionTypes.SIGNUP_USER;
    payload: {} | string;
};

type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    old_password: string;
    password_confirmation: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
};

// common success
export const authApiResponseSuccess = (actionType: string, data: User | {}): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: {actionType, data},
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: {actionType, error},
});

export const loginUser = (email: string, password: string): AuthActionType => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: {email, password},
});
export const updateUser = (first_name: string, last_name: string, password: string, old_password: string, password_confirmation: string, _method: string): { payload: { password: string; old_password: string; password_confirmation: string; last_name: string; first_name: string; _method: string }; type: AuthActionTypes.UPDATE_USER } => ({
    type: AuthActionTypes.UPDATE_USER,
    payload: {first_name, last_name, password, old_password, password_confirmation, _method},
});

export const logoutUser = (): AuthActionType => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const signupUser = (email: string, first_name: string, last_name: string, phone: number, password: string, password_confirmation: string,): { payload: { password: string; password_confirmation: string; phone: number; last_name: string; first_name: string; email: string }; type: AuthActionTypes.SIGNUP_USER } => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: {email, first_name, last_name, phone, password, password_confirmation},
});

export const forgotPassword = (email: string): AuthActionType => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: {email},
});

export const resetAuth = (): AuthActionType => ({
    type: AuthActionTypes.RESET,
    payload: {},
});
export const resetPasswordConfirm = (email: string, token: string, password: string, password_confirmation: string): { payload: { password: string; password_confirmation: string; email: string; token: string }; type: AuthActionTypes.RESET_PASSWORD_CONFIRM } => ({
    type: AuthActionTypes.RESET_PASSWORD_CONFIRM,
    payload: {email, token, password, password_confirmation},
});
