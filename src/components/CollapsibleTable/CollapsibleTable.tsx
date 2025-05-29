"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type RowData = {
    _id: string;
    title: string;
    amount: number;
    description: string;
    categoryId: string;
    userId: string;
    createdDateAt: string;
    updatedDateAt: string;
    __v: number;
};

type TransactionCategoryProps = {
    _id: string;
    title: string;
    typeId: string
    __v: number;
};

type TransactionTypeProps = {
    _id: string;
    title: string;
    __v: number;
};

type UserProps = {
    _id: string;
    firstname: string;
    lastname: string;
};

type RowProps = {
    row: RowData;
    TCategory: TransactionCategoryProps[];
    TTypes: TransactionTypeProps[];
    users: UserProps[];
};

function formatDateTR(dateString: string) {
    return new Date(dateString).toLocaleDateString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric',

    });
}

function Row({ row, TCategory, TTypes,users }: RowProps) {
    const [open, setOpen] = React.useState(false);

    const category = TCategory.find(cat => cat._id === row.categoryId);
    const typeTitle = TTypes.find(t => t._id === category?.typeId)?.title || "Tip yok";

    const categoryTitle = TCategory.find(cat => cat._id === row.categoryId)?.title || "Kategori Yok";


    const user = users.find(u => u._id === row.userId);
    const userFullName = user ? `${user.firstname} ${user.lastname}` : "Kullanıcı Yok";

    
    
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset'} }}>
                
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell align="left">{row.amount}<span>₺</span></TableCell>
                <TableCell align="left">{categoryTitle}</TableCell>
                <TableCell
                    align='left'
                    sx={{ color: typeTitle === "Gelir" ? "green" : typeTitle === "Gider" ? "red" : "inherit" }}
                >
                    {typeTitle}
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detaylı Bilgi
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Açıklama</strong></TableCell>
                                        <TableCell>{row.description}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Kullanıcı</strong></TableCell>
                                        <TableCell>{userFullName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Oluşturma Tarihi</strong></TableCell>
                                        <TableCell>{formatDateTR(row.createdDateAt)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Güncelleme Tarihi</strong></TableCell>
                                        <TableCell>{formatDateTR(row.updatedDateAt)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

type CollapsibleTableProps = {
    rows: RowData[];
    categories: TransactionCategoryProps[];
    types: TransactionTypeProps[];
    users: UserProps[];
};

export default function CollapsibleTable({ rows, categories, types, users}: CollapsibleTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        
                        <TableCell align="left"><strong>Başlık</strong></TableCell>
                        <TableCell align="left"><strong>Fiyat (₺)</strong></TableCell>
                        <TableCell align="left"><strong>Kategori</strong></TableCell>
                        <TableCell align="left"><strong>Tür</strong></TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row._id} row={row} TCategory={categories} TTypes={types} users={users} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
