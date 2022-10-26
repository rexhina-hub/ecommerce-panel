import {Link} from 'react-router-dom';
import {Row, Col, Card, Button} from 'react-bootstrap';
import classNames from 'classnames';
import {Column} from 'react-table';
import {Table, PageTitle, CellFormatter, PageSize} from 'components';
import {Order} from './types';
import {useOrders} from './hooks';
import {useDatePicker} from "../../../hooks";
import {HyperDatepicker} from "../../../components";


const OrderColumn = ({row}: CellFormatter<Order>) => {
    return (
        <Link to="#" className="text-body fw-bold">
            #BM{row.original.order_id}
        </Link>
    );
};

const OrderDateColumn = ({row}: CellFormatter<Order>) => {
    return (
        <>
            {row.original.order_date} <small className="text-muted">{row.original.order_time}</small>
        </>
    );
};

/* status column render */
const StatusColumn = ({row}: CellFormatter<Order>) => {
    return (
        <h5>
            <span
                className={classNames('badge', {
                    'badge-success-lighten': row.original.order_status === 'Delivered',
                    'badge-info-lighten': row.original.order_status === 'Shipped',
                    'badge-warning-lighten': row.original.order_status === 'Processing',
                })}
            >
                {row.original.order_status}
            </span>
        </h5>
    );
};

/* action column render */
const ActionColumn = ({row}: CellFormatter<Order>) => {
    return (
        <>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>
        </>
    );
};

// get all columns
const columns: ReadonlyArray<Column> = [
    {
        Header: 'ID',
        accessor: 'order_id',
        defaultCanSort: true,
        Cell: OrderColumn,
    },
    {
        Header: 'Emer/Mbiemer',
        accessor: 'name_surname',
        defaultCanSort: true,
    },
    {
        Header: 'Cel',
        accessor: 'cel',
        defaultCanSort: false,
    },
    {
        Header: 'Kodi',
        accessor: 'order_code',
        defaultCanSort: true,
    },
    {
        Header: 'Adresa',
        accessor: 'address',
        defaultCanSort: true,
    },
    {
        Header: 'Status',
        accessor: 'order_status',
        defaultCanSort: false,
        Cell: StatusColumn,
    },
    {
        Header: 'Data',
        accessor: 'order_date',
        defaultCanSort: false,
        Cell: OrderDateColumn,
    },
    {
        Header: 'Veprime',
        accessor: 'action',
        defaultCanSort: false,
        Cell: ActionColumn,
    },
];

const sizePerPageList: PageSize[] = [
    {
        text: '10',
        value: 10,
    },
    {
        text: '20',
        value: 20,
    },
    {
        text: '50',
        value: 50,
    },
];

const Orders = () => {
    const {orderList, changeOrderStatusGroup} = useOrders();
    const {selectedDate, onDateChange} = useDatePicker();

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {label: 'eCommerce', path: '/apps/ecommerce/orders'},
                    {label: 'Orders', path: '/apps/ecommerce/orders', active: true},
                ]}
                title={'Orders'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col xl={3}>
                                    <div className="text-lg-end mt-xl-0 mt-2">
                                        <HyperDatepicker
                                            value={selectedDate}
                                            inputClass="form-control-light"
                                            onChange={(date: Date) => {
                                                onDateChange(date);
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col xl={3}>
                                    <div className="text-lg-end mt-xl-0 mt-2">
                                        <HyperDatepicker
                                            value={selectedDate}
                                            inputClass="form-control-light"
                                            onChange={(date: Date) => {
                                                onDateChange(date);
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="text-sm-end">
                                        <Link to="#" className="btn btn-primary mb-2">
                                            <i className="mdi mdi-basket me-1"></i>Filtro Porosi
                                        </Link>
                                    </div>
                                </Col>
                            </Row>

                            <Table<Order>
                                columns={columns}
                                data={orderList}
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                theadClass="table-light"
                                searchBoxClass="mb-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Orders;
