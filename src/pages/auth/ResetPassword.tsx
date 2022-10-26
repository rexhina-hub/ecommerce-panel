import { Button, Alert, Row, Col } from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VerticalForm, FormInput } from 'components';
import AccountLayout from './AccountLayout';
import {useResetPasswordConfirm} from './hooks';


export type UserData = {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
};


const ResetPassword = () => {
    const { t } = useTranslation();
    const { loading, error, schemaResolver, passwordReset, resetPasswordSuccess,onSubmit } = useResetPasswordConfirm();

    return (
        <AccountLayout>


            {resetPasswordSuccess && <Alert variant="success">
                <a href="/account/login">{resetPasswordSuccess.message}</a></Alert>}

            {error && !resetPasswordSuccess && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}
            {!passwordReset && (
                <>
                    <div className="text-center m-auto">
                        <h4 className="text-dark-50 text-center mt-0 font-weight-bold">{t('Reset Password')}</h4>
                        <p className="text-muted mb-4">
                            {t("Please fill your informations to change your password")}
                        </p>
                    </div>
                    <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                        <FormInput
                            label={t('Email')}
                            type="email"
                            name="email"
                            placeholder={t('Enter your Email')}
                            containerClass={'mb-3'}/>
                        <FormInput
                            label={t('6 digit code')}
                            type="text"
                            name="token"
                            placeholder={t('Enter your Token')}
                            containerClass={'mb-3'}/>
                        <FormInput
                            label={t('Password')}
                            type="password"
                            name="password"
                            placeholder={t('Enter your password')}
                            containerClass={'mb-3'}/>
                        <FormInput
                            label={t('Confirm Password')}
                            type="password"
                            name="password_confirmation"
                            placeholder={t('Enter your Confirm password')}
                            containerClass={'mb-3'}/>

                        <div className="mb-3 mb-0 text-center">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {t('Reset')}
                            </Button>
                        </div>
                    </VerticalForm></>
            )}
        </AccountLayout>
    );
};

export default ResetPassword;
