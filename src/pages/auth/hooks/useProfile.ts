import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {resetAuth, updateUser} from 'redux/actions';
import {useRedux} from 'hooks';
import {UserData} from "../Profile";


export default function useProfile() {
    const {t} = useTranslation();
    const {dispatch, appSelector} = useRedux();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const {loading, user, error, resetUser, resetUserSuccess} = appSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        resetUser: state.Auth.resetUser,
        resetUserSuccess: state.Auth.resetUserSuccess,
    }));


    const schemaResolver = yupResolver(
        yup.object().shape({
            first_name: yup.string().required(t('Please enter First Name')),
            last_name: yup.string().required(t('Please enter Last Name')),
            password: yup.string().required(t('Please enter Password')),
            old_password: yup.string().required(t('Please enter Old Password')),
            password_confirmation: yup.string().required(t('Please enter Confirm Password')),
            _method: yup.string().required(t('.......'))
        })
    );


    const onSubmit = (formData: UserData) => {
        dispatch(updateUser(formData['first_name'], formData['last_name'], formData['password'],
            formData['old_password'], formData['password_confirmation'], formData['_method']));
    };

    return {
        loading,
        user,
        error,
        schemaResolver,
        resetUser,
        resetUserSuccess,
        onSubmit
    };
}

