import {Button, Alert, Row, Col} from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {VerticalForm, FormInput} from 'components';
import AccountLayout from './AccountLayout';
import {useForgetPassword} from './hooks';

export type UserData = {
    email: string;
};

const BottomLink = () => {
    const {t} = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Back to')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const ForgetPassword = () => {
    const {t} = useTranslation();
    const {loading, error, schemaResolver, userForgotPassword, onSubmit} = useForgetPassword();

    return (
        <AccountLayout bottomLinks={<BottomLink/>}>
            {userForgotPassword && <Navigate to={'/account/reset-password'} replace />}
            <div className="text-center m-auto">
                <h4 className="text-dark-50 text-center mt-0 font-weight-bold">{t('Forgot Password')}</h4>
                <p className="text-muted mb-4">
                    {t("Enter your email address and you will get 6 digit code")}
                </p>
            </div>

            {error && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}

            <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                <FormInput
                    label={t('Email')}
                    type="email"
                    name="email"
                    placeholder={t('Enter your Email')}
                    containerClass={'mb-3'}
                />

                <div className="mb-3 mb-0 text-center">
                    <Button variant="primary" type="submit" disabled={loading}>
                        {t('Submit')}
                    </Button>
                </div>
            </VerticalForm>
        </AccountLayout>
    );
};

export default ForgetPassword;
