import { FuseNavigation } from "@fuse/types";

var Business_admin: FuseNavigation[] = [
    {
        id: "chichi",
        title: "",
        translate: "NAV.APPLICATIONS",
        type: "group",
        children: [
            {
                id: "dashboard",
                title: "Dashboard",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "dashboard",
                url: "/dashboard",
            },
            {
                id: "manage-store",
                title: "Store Management",
                type: "collapsable",
                icon: "store",
                children: [
                    {
                        id: "branches",
                        title: "Manage Branches",
                        type: "item",
                        url: "/manage-branch",
                    },
                    {
                        id: "branch-manager",
                        title: "Manage Branch Managers",
                        type: "item",
                        url: "/manage-branchmanager",
                    },
                ],
            },
            {
                id: "manage-masters",
                title: "Manage Master",
                type: "collapsable",
                icon: "list_alt",
                children: [
                    {
                        id: "categories",
                        title: "Manage Categories",
                        type: "item",
                        url: "/manage-masters/categories",
                    },
                    {
                        id: "sub-categories",
                        title: "Manage SubCategories",
                        type: "item",
                        url: "/manage-masters/sub-categories",
                    },
                ],
            },
            // {
            //     id: 'businesses',
            //     title: 'Manage Businesses',
            //     translate: 'NAV.SUBJECTS',
            //     type: 'item',
            //     icon: 'business',
            //     url: '/manage-masters/size'
            // },
            {
                id: "manage-orders",
                title: "Manage Orders",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "add_shopping_cart",
                url: "/manage-orders",
            },
            {
                id: "manage-commission",
                title: "Manage Commission",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "account_balance_wallet",
                url: "/manage-commission",
            },

            // {
            //     id: 'manage-payments',
            //     title: 'Manage Payments',
            //     translate: 'NAV.SUBJECTS',
            //     type: 'item',
            //     icon: 'account_balance',
            //     url: '/manage-payments',
            // },
            {
                id: "manage-reports",
                title: "Reports",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "note_add",
                url: "/manage-reports",
            },
        ],
    },
];
var store_admin: FuseNavigation[] = [
    {
        id: "chichi",
        title: "",
        translate: "NAV.APPLICATIONS",
        type: "group",
        children: [
            {
                id: "dashboard",
                title: "Dashboard",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "dashboard",
                url: "/dashboard",
            },
            {
                id: "manage-masters",
                title: "Store Management",
                type: "collapsable",
                icon: "border_all",
                children: [
                    {
                        id: "categories",
                        title: "Manage Branches",
                        type: "item",
                        url: "/manage-branch",
                    },
                    {
                        id: "sub-categories",
                        title: "Manage Branch Managers",
                        type: "item",
                        url: "/manage-branchmanager",
                    },
                    {
                        id: "categories",
                        title: "Manage Categories",
                        type: "item",
                        url: "/manage-masters/categories",
                    },
                    {
                        id: "categories",
                        title: "Manage SubCategories",
                        type: "item",
                        url: "/manage-masters/sub-categories",
                    },
                    {
                        id: "size",
                        title: "Manage Businesses",
                        type: "item",
                        url: "/manage-masters/size",
                    },
                ],
            },
            {
                id: "manage-orders",
                title: "Manage Orders",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "add_shopping_cart",
                url: "/manage-orders",
            },
            {
                id: "manage-commission",
                title: "Manage Commission",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "account_balance_wallet",
                url: "/manage-commission",
            },

            {
                id: "manage-payments",
                title: "Manage Payments",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "account_balance",
                url: "/manage-payments",
            },
            {
                id: "manage-reports",
                title: "Manage Reports",
                translate: "NAV.SUBJECTS",
                type: "item",
                icon: "note_add",
                url: "/manage-reports",
            },
        ],
    },
];

export const navigation = Business_admin;
