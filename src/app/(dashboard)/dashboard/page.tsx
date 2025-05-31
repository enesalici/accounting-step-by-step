/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CollapsibleTable from "@/components/CollapsibleTable/CollapsibleTable";
import style from "./style.module.css";
import AddTransactionForm from "@/components/transactionForms/addTransactionForm";
import { useAppData } from "@/context/appDataContext"
import { useState, useTransition, useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import { deleteTransaction } from "@/components/transactionForms/actions";
import { useRouter } from "next/navigation";
import LogoutIcon from '@mui/icons-material/Logout';


export default function DashboardPage() {
    const [open, setOpen] = useState(false);
    const { transactions, users, transactionCategories, transactionTypes, setTransactions } = useAppData();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/');
        }
    }, []);

    const handleDeleteTransaction = (_id: string) => {
        startTransition(async () => {
            const result = await deleteTransaction(_id);
            if (result.success) {
                setTransactions(prev => prev.filter(t => t._id !== _id));
            } else {
                alert("Silme işlemi başarısız: " + result.error);
            }
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAddTransaction = (newTransaction: any) => {
        setTransactions(prev => [...prev, newTransaction]);
    };

    return (
        <Container className={style.section}>

            <Box style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={() => {
                        sessionStorage.removeItem("isLoggedIn");
                        window.location.href = '/';
                    }}
                >
                    Çıkış Yap
                </Button>
            </Box>

            <div className={style.tableBox}>
                <CollapsibleTable
                    rows={transactions}
                    categories={transactionCategories}
                    types={transactionTypes}
                    users={users}
                    onDelete={handleDeleteTransaction}
                    openedCreate={setOpen}
                />
            </div>

            <AddTransactionForm
                open={open}
                setOpen={setOpen}
                categories={transactionCategories}
                onSuccess={handleAddTransaction}
            />
        </Container>
    );
}
