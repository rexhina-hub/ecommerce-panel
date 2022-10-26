import {Button, Alert} from 'react-bootstrap';
import {Navigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {VerticalForm, FormInput} from 'components';
import AccountLayout from './AccountLayout';
import {useProfile} from "./hooks";

export type UserData = {
    first_name: string;
    last_name: string;
    password: string;
    old_password: string;
    password_confirmation: string;
    _method: string;
};

const Profile = () => {
    const {t} = useTranslation();

    const {loading, resetUserSuccess, resetUser, user, error, schemaResolver, onSubmit} = useProfile();
    return (
        <>
            <AccountLayout>
                {resetUserSuccess && <Navigate to={{pathname: '/'}}/>}
                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                {!resetUser && (
                    <VerticalForm<UserData>
                        onSubmit={onSubmit}
                        resolver={schemaResolver}
                    >
                        <FormInput
                            type="hidden"
                            name="_method"
                            defaultValue='PUT'
                        />
                        <FormInput
                            label={t('First Name')}
                            type="text"
                            name="first_name"
                            placeholder={t('Enter your First Name')}
                            containerClass={'mb-3'}
                            defaultValue={user.user.first_name}
                        />
                        <FormInput
                            label={t('Last Name')}
                            type="text"
                            name="last_name"
                            placeholder={t('Enter your Last Name')}
                            containerClass={'mb-3'}
                            defaultValue={user.user.last_name}
                        />
                        <FormInput
                            label={t('Old Password')}
                            type="password"
                            name="old_password"
                            placeholder={t('Enter your Old password')}
                            containerClass={'mb-3'}
                            defaultValue={user.old_password}
                        />
                        <FormInput
                            label={t('Password')}
                            type="password"
                            name="password"
                            placeholder={t('Enter your password')}
                            containerClass={'mb-3'}
                            defaultValue={user.password}
                        />
                        <FormInput
                            label={t('Confirm Password')}
                            type="password"
                            name="password_confirmation"
                            placeholder={t('Enter your Confirm password')}
                            containerClass={'mb-3'}
                            defaultValue={user.password_confirmation}
                        />

                        <div className="mb-3 mb-0 text-center">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {t('Update')}
                            </Button>
                        </div>
                    </VerticalForm>
                )}
            </AccountLayout>
        </>
    );
};

export default Profile;
