/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from 'react';
import { createTheme, useTheme } from '@mui/material/styles';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppDataProvider } from '@/context/appDataContext';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';

const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    { kind: 'divider' },
    {
        segment: 'dashboard',
        title: 'Tablo',
        icon: <DeveloperModeIcon />,
    },
    {
        segment: 'dashboard',
        title: 'Kategoriler',
        icon: <DeveloperModeIcon />,
    },
    {
        segment: 'dashboard',
        title: 'Tipler',
        icon: <DeveloperModeIcon />,
    },
    { kind: 'divider' },
    {
        segment: 'Dashboard',
        title: 'Auth',
        icon: <DeveloperModeIcon />,
        children: [
            {
                segment: 'dashboard',
                title: 'Admin',
            },
            {
                segment: 'dashboard',
                title: 'Profil',
            },
            {
                segment: 'dashboard',
                title: 'Profil',
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

    const theme = useTheme();


    return (
        <AppDataProvider>
            <AppProvider
                navigation={NAVIGATION}
                branding={{
                    logo: <img
                        src="/logo.svg"
                        alt="Logo"
                        width={280}
                        height={50}
                        style={{
                            filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                          }}
                        />,
                    title: 'An Matematik',
                    homeUrl: '/dashboard',
                }}
                theme={Theme}
            >
                <DashboardLayout>
                    <section>{children}</section>
                </DashboardLayout>
            </AppProvider>
        </AppDataProvider>
    );
}