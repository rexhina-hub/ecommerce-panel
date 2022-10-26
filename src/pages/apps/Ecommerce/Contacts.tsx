
import {PageTitle} from "../../../components";


const Contacts = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {label: 'eCommerce', path: '/apps/ecommerce/contacts'},
                    {label: 'Contacts', path: '/apps/ecommerce/contacts', active: true},


                ]}
                title={'Kontakte'}
            />
        </>
    );
};

export default Contacts;
