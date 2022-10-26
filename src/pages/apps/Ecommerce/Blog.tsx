
import {PageTitle} from "../../../components";


const Blog = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {label: 'eCommerce', path: '/apps/ecommerce/blog'},
                    {label: 'Blog', path: '/apps/ecommerce/blog', active: true},


                ]}
                title={'Blog'}
            />
        </>
    );
};

export default Blog;
