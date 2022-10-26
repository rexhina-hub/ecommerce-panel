import {CellFormatter, FormInput, PageTitle, Table} from "../../../components";
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import {Column} from "react-table";
import {Brand, Category} from './types';
import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useModal} from "../../hooks";
import {useToggle} from "../../../hooks";


const ActionColumn = ({row}: CellFormatter<Brand>) => {
    const [formData, setFormData] = useState<any>({})
    const [filteredData, setFilteredData] = useState([])
    const [allData, setAllData] = useState<any[]>([])
    const [error, setError] = useState('')
    const [isStandardOpen, toggleStandard] = useToggle();
    const navigate = useNavigate();
    const {isOpen, size, className, toggleModal, openModalWithSize} =
        useModal();

    const [brand, setBrand] = useState({
        name: '', status: '', seo_description: '', seo_keywords: '', seo_title: '',
        seo_image: '', logo: '', _method: 'PUT'
    });


    const onFileChange = (e: any) => {
        console.log(e.target.files[0])
        if (e.target && e.target.files[0]) {
            formData.append('file', e.target.files[0]);
        }
    }

    let item = row.values

    // delete request;
    const del = async () => {
        await axios.delete('http://127.0.0.1:8000/api/admin/brands/ ' + `${item.id}`)
        window.location.reload();
    }

    //To e seen for
    useEffect(() => {
        const sess = sessionStorage.getItem('nepazar_admin');
        // @ts-ignore
        const parseUser = JSON.parse(sess);
        const token = parseUser.token

        // get request;

        fetch('http://127.0.0.1:8000/api/admin/brands', {
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
                }))
            )
        });


    }, [])


    const fetchBran = (e: any) => {
        const sess = sessionStorage.getItem('nepazar_admin');
        // @ts-ignore
        const parseUser = JSON.parse(sess);
        const token = parseUser.token
        console.warn('update', e, parseUser, e)
        fetch(`http://127.0.0.1:8000/api/admin/brands/${e}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        }).then(res => res.json()).then(result => {
            let brand = result.data
            console.warn('brand', brand, result)
            setBrand({
                _method: "PUT",
                logo: '',
                name: brand.name || '',
                seo_description: brand.seo_description || '',
                seo_image: brand.seo_image || '',
                seo_keywords: brand.seo_keywords || '',
                seo_title: brand.seo_title || '',
                status: brand.status || '',
            })

        });
    }


    //update request
    const submit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        try {

            await axios.post(`http://127.0.0.1:8000/api/admin/brands/${item.id}`, brand)
            window.location.reload();

        } catch (e: any) {
            setError('Something went wrong')
        }
    }

    const handleUpdate = (e: any) => {
        setBrand({...brand, [e.target.name]: e.target.value});
    }


    return (

        <>
            <Button style={{lineHeight: "0.5"}} variant="outline-third" onClick={() => {
                toggleStandard();
                fetchBran(item.id);
            }}>
                <i className="mdi mdi-square-edit-outline"></i>
            </Button>&nbsp;
            <Button style={{lineHeight: "0.5"}} variant="outline-primary" onClick={() => openModalWithSize('sm')}>
                <i className="mdi mdi-delete"></i>
            </Button>
            {/*Modal for delete */}
            <Modal show={isOpen} onHide={toggleModal} dialogClassName={className} size={size}>
                <Modal.Header onHide={toggleModal} closeButton>
                    <h4 className="modal-title">Confirm Delete</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5>Deshron ta fshish kategorine {item.id}?</h5>
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
                    <h4 className="modal-title">Deshiron ta besh update brandin {item.id}?</h4>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit}>
                        <Row>
                            <Col lg={6}>

                                <FormInput
                                    label="Emri i Brandit"
                                    type="text"
                                    name="name"
                                    containerClass={'mb-3'}
                                    value={brand.name}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                />
                                <FormInput
                                    name="status"
                                    label="Status"
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    id='category-status'
                                    value={brand.status}
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
                                    value={brand.seo_description}
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
                                    value={brand.seo_title}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                />
                                <FormInput
                                    label="Fjale Kyce"
                                    type="text"
                                    name="seo_keywords"
                                    containerClass={'mb-3'}
                                    value={brand.seo_keywords}
                                    onChange={(e) => {
                                        handleUpdate(e)
                                    }}
                                />
                                <FormInput
                                    label="Logo"
                                    type="File"
                                    name="logo"
                                    containerClass={'mb-3'}
                                    id="logo"
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
const LogoColumn = ({row}: CellFormatter<Brand>) => {
    return (
        <div>
            <img src={`http://127.0.0.1:8000/storage/${row.original.logo}`} alt=""/>
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
        Header: 'Brandi',
        accessor: 'name',
        defaultCanSort: true,
    },
    {
        Header: 'Logo',
        accessor: 'logo',
        defaultCanSort: true,
        Cell: LogoColumn
    },
    {
        Header: 'Veprime',
        accessor: 'action',
        defaultCanSort: false,
        Cell: ActionColumn,
    },
];


const Brands = () => {
    const [error, setError] = useState('')
    const [token, setToken] = useState('')
    const [formData, setFormData] = useState<any>({})
    const [filteredData, setFilteredData] = useState([])
    const [allData, setAllData] = useState<any[]>([])
    console.warn('data!!', filteredData, allData)


    useEffect(() => {
        const sess = sessionStorage.getItem('nepazar_admin');
        // @ts-ignore
        const parseUser = JSON.parse(sess);
        setToken(parseUser.token)

        // get request;
        fetch('http://127.0.0.1:8000/api/admin/brands', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${parseUser.token}`,
                'Accept': 'application/json',
            }
        }).then(res => res.json()).then(result => {
            setAllData(result.data.data)
            setFilteredData(
                result.data.data.map((data: any) => ({
                    id: data.id,
                    name: data.name,
                    logo: data.logo,
                }))
            )
        });

    }, [])


    const navigate = useNavigate()
    const submit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        console.log('testbrand', new FormData(e.target))
        setError('')
        try {
            await axios.post('http://127.0.0.1:8000/api/admin/brands', formData)
            window.location.reload();
        } catch (e: any) {
            setError('Something went wrong')
        }
    }


    const onFileChange = (e: any) => {
        console.log(e.target.files[0])
        if (e.target && e.target.files[0]) {
            formData.append('file', e.target.files[0]);
        }
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {label: 'eCommerce', path: '/apps/ecommerce/brands'},
                    {label: 'Brands', path: '/apps/ecommerce/brands', active: true},


                ]}
                title={'Brendet'}
            />
            <Row>
                <Col lg={4}>
                    <Card>
                        <Card.Body>
                            <form onSubmit={submit}>
                                <FormInput
                                    label="Emri i Brandit"
                                    type="text"
                                    name="name"
                                    containerClass={'mb-3'}
                                />
                                <FormInput
                                    label="Logo"
                                    type="File"
                                    name="logo"
                                    containerClass={'mb-3'}
                                    id="logo"
                                    onChange={onFileChange}
                                />
                                <FormInput
                                    name="status"
                                    label="Status"
                                    type="select"
                                    containerClass="mb-3"
                                    className="form-select"
                                    id='brands-status'
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
                                    Shto Brand
                                </Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Table<Brand>
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
    );
};

export default Brands;
