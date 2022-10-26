import {all, fork, put, takeEvery, call} from 'redux-saga/effects';
import {SagaIterator} from '@redux-saga/core';
import {APICore, setAuthorization} from 'helpers/api/apiCore';
import {
    login as loginApi,
    logout as logoutApi,
    signup as signupApi,
    forgotPassword as forgotPasswordApi,
    updateUser as updateUserApi,
    resetPasswordConfirm as resetPasswordConfirmApi

} from 'helpers';
import {authApiResponseSuccess, authApiResponseError} from './actions';
import {AuthActionTypes} from './constants';

type UserData = {
    payload: {
        email: string;
        first_name: string;
        last_name: string;
        phone:number;
        old_password: string;
        password: string;
        password_confirmation: string;
        token: string;
    };
    type: string;
};

const api = new APICore();

function* login({payload: {email, password}, type}: UserData): SagaIterator {
    try {
        const response = yield call(loginApi, {email, password});
        const user = response.data;
        // NOTE - You can change this according to response format from your api
        api.setLoggedInUser(user);
        setAuthorization(user['token']);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

function* updateUser({
                         payload: {first_name, last_name, password, old_password, password_confirmation},
                         type
                     }: UserData): SagaIterator {
    try {

        const response = yield call(updateUserApi, {
            first_name,
            last_name,
            password,
            old_password,
            password_confirmation
        });
        const user = response.data;
        api.setUserInSession(user);
        setAuthorization(user['token']);
        yield put(authApiResponseSuccess(AuthActionTypes.UPDATE_USER, user));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.UPDATE_USER, error));
        // api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

function* logout(): SagaIterator {
    try {
        yield call(logoutApi);
        api.setLoggedInUser(null);
        setAuthorization(null);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* signup({payload: {email, first_name, last_name, phone, password, password_confirmation}}: UserData): SagaIterator {
    try {
        const response = yield call(signupApi, {email, first_name, last_name, phone, password, password_confirmation});
        const user = response.data;
        // api.setLoggedInUser(user);
        // setAuthorization(user['token']);
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

function* forgotPassword({payload: {email}}: UserData): SagaIterator {
    try {
        const response = yield call(forgotPasswordApi, {email});
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}

function* resetPasswordConfirm({payload: {email, token, password, password_confirmation},type}: UserData): SagaIterator {
    try {
        const response = yield call(resetPasswordConfirmApi, {email, token, password, password_confirmation});
        yield put(authApiResponseSuccess(AuthActionTypes.RESET_PASSWORD_CONFIRM, response.data));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.RESET_PASSWORD_CONFIRM, error));
    }
}


export function* watchResetPasswordConfirm() {
    yield takeEvery(AuthActionTypes.RESET_PASSWORD_CONFIRM, resetPasswordConfirm);
}

export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup() {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword() {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchUpdateUser() {
    yield takeEvery(AuthActionTypes.UPDATE_USER, updateUser);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogout),fork(watchSignup),
        fork(watchUpdateUser), fork(watchForgotPassword), fork(watchResetPasswordConfirm)]);
}

export default authSaga;
