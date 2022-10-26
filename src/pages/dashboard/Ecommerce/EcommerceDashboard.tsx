import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SalesChart from './SalesChart';
import Activity from './Activity';
import Products from './Products';

const EcommerceDashboard = () => {

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">

                                <Link to="/apps/ecommerce/customers" className="btn btn-primary ms-1">
                                    <i className="uil uil-users-alt"></i>
                                </Link>
                                <Link to="/apps/ecommerce/products" className="btn btn-primary ms-2">
                                    <i className="uil uil-shopping-trolley"></i>
                                </Link>
                                <Link to="/apps/ecommerce/orders" className="btn btn-primary ms-2">
                                    <i className="uil uil-clipboard-alt"></i>
                                </Link>
                            </form>
                        </div>
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xl={{ span: 6, order: 1 }} lg={{ span: 12, order: 2 }}>
                    <Products />
                </Col>
                <Col xl={3} lg={{ span: 6, order: 1 }}>
                    <SalesChart />
                </Col>
                <Col xl={3} lg={{ span: 6, order: 1 }}>
                    <Activity />
                </Col>
            </Row>
        </>
    );
};

export { EcommerceDashboard };
