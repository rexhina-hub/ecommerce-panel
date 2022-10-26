import {CellFormatter, FormInput, PageTitle, Table} from "../../../components";
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import {Column} from "react-table";
import {Category, Customer} from './types';
import React, {BaseSyntheticEvent, ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import {useModal} from "../../hooks";
import {useToggle} from "../../../hooks";
import * as events from "events";


const ActionColumn = ({row}: CellFormatter<Category>) => {
    const [category, setCategory] = useState({
        name: '', status: '', parent_id: '', seo_description: '', seo_keywords: '', seo_title: '', seo_image: '',
        icon: '', _method: 'PUT'
    })
    const [formData, setFormData] = useState<any>({})
    const [filteredData, setFilteredData] = useState([])
    const [allData, setAllData] = useState<any[]>([])
    const [error, setError] = useState('')
    const [isStandardOpen, toggleStandard] = useToggle();
    const navigate = useNavigate();
    const {isOpen, size, className, toggleModal, openModalWithSize} =
        useModal();


    const onFileChange = (e: any) => {
        if (e.target && e.target.files[0]) {
           formData.append('icon', e.target.files[0])}
    }

    let item = row.values


    // delete request;
    const del = async () => {
        await axios.delete('http://127.0.0.1:8000/api/admin/categories/ ' + `${item.id}`)
        window.location.reload();
    }


    //
    //per tu fshire me vone
    useEffect(() => {
        const sess = sessionStorage.getItem('nepazar_admin');
        // @ts-ignore
        const parseUser = JSON.parse(sess);
        const token = parseUser.token

        // get request;

        fetch('http://127.0.0.1:8000/api/admin/categories', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            })
        }).then(res => res.json()).then(result => {
            setAllData(result.data.data)
            setFilteredData(
                result.data.data.map((data: any) => ({
                    id: data.id,
                    name: data.name,
                    parent: data.parent != null ? data.parent.name : 'No Parent',
                }))
            )
        });

    }, [])


    const fetchCat = (e:any) => {
        const sess = sessionStorage.getItem('nepazar_admin');
        // @ts-ignore
        const parseUser = JSON.parse(sess);
        const token = parseUser.token
        console.warn('update', e, parseUser)
        fetch(`http://127.0.0.1:8000/api/admin/categories/${e}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        }).then(res => res.json()).then(result => {
            let category = result.data
            console.warn('parent_id: ', category.parent_id, category);
            setCategory({
                _method: "PUT",
                icon: '',
                name: category.name || '',
                parent_id: category.parent.id || '',
                seo_description: category.seo_description || '',
                seo_image: category.seo_image || '',
                seo_keywords: category.seo_keywords || '',
                seo_title: category.seo_title || '',
                status: category.status || ''

            })

        });
    }

    //update request
    const submit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        try {

            await axios.post(`http://127.0.0.1:8000/api/admin/categories/${item.id}`, category)
            window.location.reload();

        } catch (e: any) {
            setError('Something went wrong')
        }
    }

    const handleUpdate = (e: any) => {
        setCategory({...category, [e.target.name]: e.target.value});
    }

    // , fetchCat(item.id)
    // @ts-ignore
    return (
        <>
            <Button style={{lineHeight: "0.5"}} variant="outline-third" onClick={()=>{toggleStandard(); fetchCat(item.id);}}>
                <i className="mdi mdi-square-edit-outline"></i>
            </Button>&nbsp;
            <Button style={{lineHeight: "0.5"}} variant="outline-primary" onClick={() => openModalWithSize('sm')}>
                <i className="mdi mdi-delete"></i>
            </Button>

            {/*Modal for edit button*/}
            <Modal show={isOpen} onHide={toggleModal} dialogClassName={className} size={size}>
                <Modal.Header onHide={toggleModal} closeButton>
                    <h4 className="modal-title">Confirm Delete</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5>Deshiron ta fshish kategorine {item.id}?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggleModal}>
                        JO
                    </Button>{' '}
                    <Button onClick={del}>PO</Button>
                </Modal.Footer>
            </Modal>

            {/*Modal for update button*/}
            <Modal show={isStandardOpen} onHide={toggleStandard}>
                <Modal.Header onHide={toggleStandard} closeButton>
                    <h4 className="modal-title">Deshiron ta besh update kategorine {item.id}?</h4>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit}>
                        <Row>
                            <Col lg={6}>
                                <FormInput
                                    type="hidden"
                                    name="_method"
                                    defaultValue='PUT'
                                    value={"PUT"}
                                />
                                <FormInput
                                    label="Emri i kategorise"
                                    type="text"
                                    name="name"
                                    containerClass={'mb-3'}
                                    value={category.name}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                />
                                <FormInput
                                    name="parent_id"
                                    label="Kategoria Prind(Opsionale)"
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    value={category.parent_id}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                >
                                    <option value="none" hidden>Select...</option>
                                    {allData.map((data, index) => (
                                        <option key={index} value={data.id}>{data.name}</option>
                                    ))}
                                </FormInput>
                                <FormInput
                                    name="status"
                                    label="Status"
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    id='category-status'
                                    value={category.status}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                >
                                    <option value="" hidden>Select...</option>
                                    <option value='1'>Enabled</option>
                                    <option value='0'>Disabled</option>
                                </FormInput>
                                <FormInput
                                    label="Pershkrimi"
                                    type="textarea"
                                    name="seo_description"
                                    containerClass={'mb-3'}
                                    value={category.seo_description}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                />
                            </Col>
                            <Col lg={6}>
                                <FormInput
                                    label="Seo Title"
                                    type="text"
                                    name="seo_title"
                                    containerClass={'mb-3'}
                                    value={category.seo_title}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                />
                                <FormInput
                                    label="Fjale Kyce"
                                    type="text"
                                    name="seo_keywords"
                                    containerClass={'mb-3'}
                                    value={category.seo_keywords}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                />
                                <FormInput
                                    label="Icon"
                                    type="File"
                                    name="icon"
                                    containerClass={'mb-3'}
                                    id="icon"
                                    // value={data.icon}
                                    onChange={onFileChange}
                                />
                                <FormInput
                                    label="Seo Image"
                                    type="File"
                                    name="seo_Image"
                                    containerClass={'mb-3'}
                                    id="seo_Image"
                                    onChange={onFileChange}
                                />

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggleStandard}>
                        JO
                    </Button>{' '}
                    <Button onClick={submit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


/* name column render */
const IconColumn = ({row}: CellFormatter<Category>) => {
    return (
        <div>
            <img src={`http://127.0.0.1:8000/storage/${row.original.icon}`} alt=""/>
        </div>
    );
};

const columns: ReadonlyArray<Column> = [
    {
        Header: 'ID',
        accessor: 'id',
        defaultCanSort: true,
    },
    {
        Header: 'Kategoria',
        accessor: 'name',
        defaultCanSort: true,
    },
    {
        Header: 'Kategoria Prind',
        accessor: 'parent',
        defaultCanSort: true,
    },
    {
        Header: 'Icon',
        accessor: 'icon',
        defaultCanSort: false,
        Cell: IconColumn
    },
    {
        Header: 'Veprime',
        accessor: 'action',
        defaultCanSort: false,
        Cell: ActionColumn,
    },
];


const Categories = () => {
    const [file, setFile] = React.useState(null);
    const [error, setError] = useState('')
    const [formData, setFormData] = useState<any>({})
    const [filteredData, setFilteredData] = useState([])
    const [allData, setAllData] = useState<any[]>([])
    console.warn('data_kategorise', filteredData, allData)


    useEffect(() => {
        const sess = sessionStorage.getItem('nepazar_admin');
        // @ts-ignore
        const parseUser = JSON.parse(sess);
        const token = parseUser.token

        // get request;
        fetch('http://127.0.0.1:8000/api/admin/categories', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            })
        }).then(res => res.json()).then(result => {
            setAllData(result.data.data)
            setFilteredData(
                result.data.data.map((data: any) => ({
                    id: data.id,
                    name: data.name,
                    parent: data.parent != null ? data.parent.name : 'No Parent',
                    icon: data.icon
                }))
            )
        });

    }, [])


    const onFileChange = (e: any) => {
        console.warn('file change on CREATE', e.target,  e.target.files, formData)
        if (e.target && e.target.files[0]) {
            let file = e.target.files[0]
            formData.append('file', file);
        //    sepse ketu ne get ne marin nga forma e create
        }
    }

    const navigate = useNavigate()
    const submit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        console.log('test', new FormData(e.target))
        setError('')
        try {
            await axios.post('http://127.0.0.1:8000/api/admin/categories', formData)

            window.location.reload();
        } catch (e: any) {
            setError('Something went wrong')
        }
    }


    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {label: 'eCommerce', path: '/apps/ecommerce/categories'},
                    {label: 'Categories', path: '/apps/ecommerce/categories', active: true},
                ]}
                title={'Kategorite'}
            />
            <Row>
                <Col lg={4}>
                    <Card>
                        <Card.Body>
                            <form onSubmit={submit}>
                                <FormInput
                                    label="Emri i kategorise"
                                    type="text"
                                    name="name"
                                    containerClass={'mb-3'}
                                />
                                <FormInput
                                    name="parent_id"
                                    label="Kategoria Prind(Opsionale)"
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    defaultValue={''}
                                >

                                    <option value=''>No Parent</option>
                                    {allData.map((data, index) => (
                                        <option key={index} value={data.id}>{data.name}</option>
                                    ))}
                                </FormInput>
                                <FormInput
                                    label="Icon"
                                    type="File"
                                    name="icon"
                                    containerClass={'mb-3'}
                                    id="icon"
                                    onChange={onFileChange}
                                />
                                <FormInput
                                    name="status"
                                    label="Status"
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    id='category-status'
                                >
                                    <option value="" hidden>Select...</option>
                                    <option value='1'>Enabled</option>
                                    <option value='0'>Disabled</option>
                                </FormInput>
                                <FormInput
                                    label="Seo Title"
                                    type="text"
                                    name="seo_title"
                                    containerClass={'mb-3'}
                                />
                                <FormInput
                                    label="Fjale Kyce"
                                    type="text"
                                    name="seo_keywords"
                                    containerClass={'mb-3'}
                                />
                                <FormInput
                                    label="Pershkrimi"
                                    type="textarea"
                                    name="seo_description"
                                    containerClass={'mb-3'}
                                />
                                <FormInput
                                    label="Seo Image"
                                    type="File"
                                    name="seo_Image"
                                    containerClass={'mb-3'}
                                    id="seo_Image"
                                    onChange={onFileChange}
                                />
                                <Button style={{marginTop: '20px'}} variant="primary" type="submit">
                                    Shto Kategori
                                </Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Table<Category>
                                columns={columns}
                                data={filteredData}
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
    )

};

export default Categories;
