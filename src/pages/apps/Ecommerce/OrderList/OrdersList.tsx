import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FormInput, PageTitle } from 'components';
import Orders from './Orders';
import { orderData } from './data';

const OrdersList = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Ecommerce', path: '/apps/ecommerce/orderList/ordersList' },
                    { label: 'Orders List', path: '/apps/ecommerce/orderList/ordersList', active: true },
                ]}
                title={'Orders List'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col xl={8}>
                                    <Row className="gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                        <Col xs="auto">
                                            <FormInput type="text" name="search" placeholder="Search..." />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Group as={Row}>
                                                <Form.Label htmlFor="exampleEmail3" column sm={3}>
                                                    Status
                                                </Form.Label>
                                                <Col sm={9}>
                                                    <FormInput
                                                        name="select"
                                                        type="select"
                                                        className="form-select"
                                                        key="select"
                                                    >
                                                        <option>Choose...</option>
                                                        <option>Paid</option>
                                                        <option>Awaiting Authorization</option>
                                                        <option>Payment failed</option>
                                                        <option>Cash On Delivery</option>
                                                        <option>Fulfilled</option>
                                                        <option>Unfulfilled</option>
                                                    </FormInput>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={4}>
                                    <div className="text-xl-end mt-xl-0 mt-2">
                                        <Button variant="danger" className="mb-2 me-2">
                                            <i className="mdi mdi-basket me-1"></i> Add New Order
                                        </Button>
                                        <Button variant="light" className="mb-2">
                                            Export
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                            <Orders orderData={orderData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export { OrdersList };
