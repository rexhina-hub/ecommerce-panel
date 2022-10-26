
import {PageTitle} from "../../../components";


const AddProducts = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {label: 'eCommerce', path: '/apps/ecommerce/addProducts'},
                    {label: 'Add Products', path: '/apps/ecommerce/addProducts', active: true},


                ]}
                title={'Shto produkte'}
            />
        </>
    );
};

export default AddProducts;
