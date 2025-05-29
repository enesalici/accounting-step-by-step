"use client";
import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';


const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'transaction',
        title: 'Transaction',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'user',
        title: 'User',
        icon: <PersonIcon />,
        children: [
            {
                segment: 'profile',
                title: 'Profile',
            },
        ],
    }
];

const Theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});


export default function Dashboard({ children, }: { children: React.ReactNode }) {

    return (
        <>
            <AppProvider
                navigation={NAVIGATION}
                branding={{
                    title: 'EnesDashboard',
                    homeUrl: '/dashboard',
                }}
                theme={Theme}
            >
                <DashboardLayout>
                    <section>{children}</section>
                </DashboardLayout>
            </AppProvider>
        </>
    );
}