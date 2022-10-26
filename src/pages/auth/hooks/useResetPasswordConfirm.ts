import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {resetAuth, resetPasswordConfirm} from 'redux/actions';
import {useRedux} from 'hooks';
import {UserData} from '../ResetPassword';

export default function useForgetPassword() {
    const {dispatch, appSelector} = useRedux();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const {loading, error, passwordReset, resetPasswordSuccess} = appSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        passwordReset: state.Auth.passwordReset,
        resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    }));

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')),
            token: yup.string().required(t('Please enter 6 digit code')),
            password: yup.string().required(t('Please enter Password')),
            password_confirmation: yup.string().required(t('Please enter Confirm Password'))
        })
    );

    const onSubmit = (formData: UserData) => {
        dispatch(resetPasswordConfirm(formData['email'], formData['token'], formData['password'],
            formData['password_confirmation']));
    };

    return {
        loading,
        passwordReset,
        resetPasswordSuccess,
        error,
        schemaResolver,
        onSubmit,
    };
}
