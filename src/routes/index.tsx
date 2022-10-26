import React, {Suspense} from 'react';
import {useRoutes} from 'react-router-dom';
import {DefaultLayout, DetachedLayout, HorizontalLayout, FullLayout, VerticalLayout} from "../layouts";
import PrivateRoute from './PrivateRoute';
import Root from './Root';
import {LayoutTypes} from 'appConstants';
import {useRedux} from 'hooks';


// auth
const Login = React.lazy(() => import('pages/auth/Login'));
const Logout = React.lazy(() => import('pages/auth/Logout'));
const Register = React.lazy(() => import('pages/auth/Register'));
const ResetPassword = React.lazy(() => import('pages/auth/ResetPassword'));
const ForgetPassword = React.lazy(() => import('pages/auth/ForgetPassword'));
const LockScreen = React.lazy(() => import('pages/auth/LockScreen'));
const Profile = React.lazy(() => import('pages/auth/Profile'));

// dashboard
const EcommerceDashboard = React.lazy(() => import('pages/dashboard/Ecommerce'));

// - ecommece pages
const EcommerceProducts = React.lazy(() => import('pages/apps/Ecommerce/Products'));
const Categories = React.lazy(() => import('pages/apps/Ecommerce/Categories'));

const Brands = React.lazy(() => import('pages/apps/Ecommerce/Brands'));
const AddProducts = React.lazy(() => import('pages/apps/Ecommerce/AddProducts'));
const Orders = React.lazy(() => import('pages/apps/Ecommerce/Orders'));
const OrdersList = React.lazy(() => import('pages/apps/Ecommerce/OrderList'));
const OrderDetails = React.lazy(() => import('pages/apps/Ecommerce/OrderDetails'));
const Customers = React.lazy(() => import('pages/apps/Ecommerce/Customers'));
const Blog = React.lazy(() => import('pages/apps/Ecommerce/Blog'));
const Contacts = React.lazy(() => import('pages/apps/Ecommerce/Contacts'));

// pages
const ErrorPageNotFound = React.lazy(() => import('pages/error/PageNotFound'));
const ErrorPageNotFoundAlt = React.lazy(() => import('pages/error/PageNotFoundAlt'));
const ServerError = React.lazy(() => import('pages/error/ServerError'));

// uikit
const Accordions = React.lazy(() => import('pages/hooks/Accordions'));
const Modals = React.lazy(() => import('pages/hooks/Modals'));
const Tabs = React.lazy(() => import('pages/hooks/Tabs'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({component: Component}: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component/>
    </Suspense>
);

const AllRoutes = () => {
    const {appSelector} = useRedux();

    const {layout} = appSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls: React.ComponentType = VerticalLayout;

        switch (layout.layoutType) {
            case LayoutTypes.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case LayoutTypes.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            case LayoutTypes.LAYOUT_FULL:
                layoutCls = FullLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        {path: '/', element: <Root/>},
        {
            // public routes
            path: '/',
            element: <DefaultLayout/>,
            children: [
                {
                    path: 'account',
                    children: [
                        {path: 'login', element: <LoadComponent component={Login}/>},
                        {path: 'register', element: <LoadComponent component={Register}/>},
                        {path: 'reset-password', element: <LoadComponent component={ResetPassword}/>},
                        {path: 'forget-password', element: <LoadComponent component={ForgetPassword}/>},
                        {path: 'lock-screen', element: <LoadComponent component={LockScreen}/>},
                        {path: 'logout', element: <LoadComponent component={Logout}/>},
                        {path: 'profile', element: <LoadComponent component={Profile}/>}
                    ],
                },
                {
                    path: 'error-404',
                    element: <LoadComponent component={ErrorPageNotFound}/>,
                },
                {
                    path: 'error-500',
                    element: <LoadComponent component={ServerError}/>,
                }
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute component={Layout}/>,
            children: [
                {
                    path: 'dashboard',
                    children: [
                        {
                            path: 'ecommerce',
                            element: <LoadComponent component={EcommerceDashboard}/>,
                        }
                    ],
                },
                {
                    path: 'apps',
                    children: [
                        {
                            path: 'ecommerce',
                            children: [
                                {
                                    path: 'products',
                                    element: <LoadComponent component={EcommerceProducts}/>,
                                },
                                {
                                    path: 'addProducts',
                                    element: <LoadComponent component={AddProducts}/>,
                                },
                                {
                                    path: 'categories',
                                    element: <LoadComponent component={Categories}/>,
                                },
                                {
                                    path: 'brands',
                                    element: <LoadComponent component={Brands}/>,
                                },
                                {
                                    path: 'ordersList',
                                    element: <LoadComponent component={OrdersList}/>,
                                },
                                {
                                    path: 'orders',
                                    element: <LoadComponent component={Orders}/>,
                                },
                                {
                                    path: 'order/details',
                                    element: <LoadComponent component={OrderDetails}/>,
                                },
                                {
                                    path: 'customers',
                                    element: <LoadComponent component={Customers}/>,
                                },
                                {
                                    path: 'blog',
                                    element: <LoadComponent component={Blog}/>,
                                },
                                {
                                    path: 'contacts',
                                    element: <LoadComponent component={Contacts}/>,
                                },
                            ],
                        }
                    ],
                },
                {
                    path: 'ui',
                    children: [
                        {
                            path: 'base-ui',
                            children: [
                                {
                                    path: 'accordions',
                                    element: <LoadComponent component={Accordions}/>,
                                },
                                {
                                    path: 'modals',
                                    element: <LoadComponent component={Modals}/>,
                                },
                                {
                                    path: 'tabs',
                                    element: <LoadComponent component={Tabs}/>,
                                }
                            ],
                        },
                    ],
                },
            ],
        },
    ]);
};

export {AllRoutes};
