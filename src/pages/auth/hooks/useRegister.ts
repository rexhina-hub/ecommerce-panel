import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetAuth, signupUser } from 'redux/actions';
import { useRedux } from 'hooks';
import { UserData } from '../Register';

export default function useRegister() {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();

    const { loading, userSignUp, error } = appSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            first_name: yup.string().required(t('Please enter First Name')),
            last_name: yup.string().required(t('Please enter Last Name')),
            phone: yup.number().required(t('Please enter Phone')),
            password: yup.string().required(t('Please enter Password')),
            password_confirmation: yup.string().required(t('Please enter Password Confirmation')),
        })
    );

    const onSubmit = (formData: UserData) => {
        dispatch(signupUser(formData['email'], formData['first_name'],formData['last_name'],
            formData['phone'],formData['password'],formData['password_confirmation']));
    };

    return {
        loading,
        userSignUp,
        error,
        schemaResolver,
        onSubmit,
    };
}
