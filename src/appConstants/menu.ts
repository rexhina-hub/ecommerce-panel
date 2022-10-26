export type MenuItemType = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemType[];
};

const MENU_ITEMS: MenuItemType[] = [
    {
        isTitle: false,
        icon: 'uil-home-alt',
        key: 'ds-ecommerce',
        label: 'Kreu',
        url: '/dashboard/ecommerce',
    },

    {
        key: 'products',
        label: 'Produkte',
        isTitle: false,
        icon: 'uil-store',
        children: [
            {
                key: 'all-products',
                label: 'Te gjitha ',
                parentKey: 'products',
                url: '/apps/ecommerce/products',
                icon: 'dripicons-store',
            },
            {
                key: 'add-products',
                label: 'Shto Produkte',
                parentKey: 'products',
                url: '/apps/ecommerce/addProducts',
                icon: 'dripicons-stack',
            },
            {
                key: 'categories',
                label: 'Kategorite',
                parentKey: 'products',
                url: '/apps/ecommerce/categories',
                icon: 'dripicons-pamphlet',
            },
            {
                key: 'brands',
                label: 'Brendet',
                parentKey: 'products',
                url: '/apps/ecommerce/brands',
                icon: 'uil-meeting-board',
            }
        ],
    },

    {
        isTitle: false,
        icon: 'uil-clipboard-alt',
        key: 'ecommerce-orders',
        label: 'Porosi',
        url: '/apps/ecommerce/orders',
    },
    {
        isTitle: false,
        icon: 'uil-users-alt',
        key: 'ecommerce-customers',
        label: 'Kliente',
        url: '/apps/ecommerce/customers',
    },
    {
        isTitle: false,
        icon: 'uil-clipboard-alt',
        key: 'ecommerce-contacts',
        label: 'Kontakte',
        url: '/apps/ecommerce/contacts',
    },
    {
        isTitle: false,
        icon: 'uil-users-alt',
        key: 'ecommerce-customers',
        label: 'Blog',
        url: '/apps/ecommerce/blog',
    }
];

export {MENU_ITEMS};
