import {Link} from 'react-router-dom';
import {Row, Col, Card, Button} from 'react-bootstrap';
import classNames from 'classnames';
import {Column} from 'react-table';
import {Table, PageTitle, CellFormatter, PageSize} from 'components';
import {Customer} from './types';

/* name column render */
const NameColumn = ({row}: CellFormatter<Customer>) => {
    return (
        <div className="table-user">
            <img src={row.original.avatar} alt="" className="me-2 rounded-circle"/>
            <Link to="#" className="text-body fw-semibold">
                {row.original.name}
            </Link>
        </div>
    );
};

/* status column render */
const StatusColumn = ({row}: CellFormatter<Customer>) => {
    return (
        <span
            className={classNames('badge', {
                'badge-success-lighten': row.original.status === 'Active',
                'badge-danger-lighten': row.original.status === 'Blocked',
            })}
        >
            {row.original.status}
        </span>
    );
};

/* action column render */
const ActionColumn = ({row}: CellFormatter<Customer>) => {
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

const columns: ReadonlyArray<Column> = [
    {
        Header: 'Customer',
        accessor: 'name',
        defaultCanSort: true,
        Cell: NameColumn,
    },
    {
        Header: 'Phone',
        accessor: 'phone',
        defaultCanSort: true,
    },
    {
        Header: 'Email',
        accessor: 'email',
        defaultCanSort: true,
    },
    {
        Header: 'Location',
        accessor: 'location',
        defaultCanSort: true,
    },
    {
        Header: 'Created On',
        accessor: 'created_on',
        defaultCanSort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        defaultCanSort: true,
        Cell: StatusColumn,
    },
    {
        Header: 'Action',
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
        text: '25',
        value: 25,
    },
    {
        text: '50',
        value: 50,
    },
];

const Customers = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {label: 'eCommerce', path: '/apps/ecommerce/customers'},
                    {
                        label: 'Customers',
                        path: '/apps/ecommerce/customers',
                        active: true,
                    },
                ]}
                title={'Kliente'}
            />


        </>
    );
};

export default Customers;
