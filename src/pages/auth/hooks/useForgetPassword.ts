import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetAuth, forgotPassword } from 'redux/actions';
import { useRedux } from 'hooks';
import { UserData } from '../ForgetPassword';

export default function useForgetPassword() {
    const { dispatch, appSelector } = useRedux();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading,error, userForgotPassword } = appSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userForgotPassword: state.Auth.userForgotPassword
    }));

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')),
        })
    );

    const onSubmit = (formData: UserData) => {
        dispatch(forgotPassword(formData['email']));
    };

    return {
        loading,
        error,
        schemaResolver,
        userForgotPassword,
        onSubmit,
    };
}
