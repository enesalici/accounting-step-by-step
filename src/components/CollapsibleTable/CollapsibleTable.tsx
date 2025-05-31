"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, InputAdornment, TablePagination, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ModeIcon from '@mui/icons-material/Mode';
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTransactionForm from "../transactionForms/updateTransactionForm";
import { useAppData } from "@/context/appDataContext";

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
    typeId: string;
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
    onDelete?: (_id: string) => void;
    openedCreate: (setOpen: boolean) => void;
};

function formatDateTR(dateString: string) {
    return new Date(dateString).toLocaleDateString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Row({ row, TCategory, TTypes, users, onDelete }: RowProps) {
    const [open, setOpen] = React.useState(false);
    const [transactionToDelete, setTransactionToDelete] = React.useState<string | null>(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<RowData | null>(null);

    const { setTransactions } = useAppData();

    const category = TCategory.find((cat) => cat._id === row.categoryId);
    const typeTitle = TTypes.find((t) => t._id === category?.typeId)?.title || "Tip yok";
    const categoryTitle = category?.title || "Kategori Yok";
    // const user = users.find((u) => u._id === row.userId);
    // const userFullName = user ? `${user.firstname} ${user.lastname}` : "Kullanıcı Yok";

    const handleOpenDialog = (_id: string) => {
        setTransactionToDelete(_id);
        setConfirmDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setConfirmDialogOpen(false);
        setTransactionToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (transactionToDelete !== null && onDelete) {
            onDelete(transactionToDelete);
            handleCloseDialog();
        }
    };

    const handleOpenUpdateDialog = (row: RowData) => {
        setSelectedRow(row);
        setUpdateOpen(true);
        
    };

    const handleUpdateSuccess = (updatedTx: RowData) => {
        setTransactions((prev) =>
            prev.map((tx) => (tx._id === updatedTx._id ? updatedTx : tx))
        );
    };


    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="left">{row.amount} ₺</TableCell>
                <TableCell align="left">{categoryTitle}</TableCell>
                <TableCell
                    align="left"
                    sx={{
                        color: typeTitle === "Gelir" ? "green" : typeTitle === "Gider" ? "red" : "inherit",
                    }}
                >
                    {typeTitle}
                </TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
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
                                    {/* <TableRow>
                                        <TableCell><strong>Kullanıcı</strong></TableCell>
                                        <TableCell>{userFullName}</TableCell>
                                    </TableRow> */}
                                    <TableRow>
                                        <TableCell><strong>Oluşturma Tarihi</strong></TableCell>
                                        <TableCell>{formatDateTR(row.createdDateAt)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Güncelleme Tarihi</strong></TableCell>
                                        <TableCell>{formatDateTR(row.updatedDateAt)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Button variant="contained" color="error" onClick={() => handleOpenDialog(row._id)}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={() => handleOpenUpdateDialog(row)}>
                                                <ModeIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <ConfirmDialog
                open={confirmDialogOpen}
                onConfirm={handleConfirmDelete}
                onClose={handleCloseDialog}
                title="Silme Onayı"
                message="Bu işlemi onaylıyor musunuz?"
            />

            {selectedRow && (
                <UpdateTransactionForm
                    open={updateOpen}
                    setOpen={setUpdateOpen}
                    initialData={{
                        _id: selectedRow._id,
                        title: selectedRow.title,
                        amount: selectedRow.amount,
                        description: selectedRow.description,
                        categoryId: selectedRow.categoryId,
                    }}
                    categories={TCategory}
                    onSuccess={(updatedTx) => {
                        setUpdateOpen(false);
                        setSelectedRow(null);
                        handleUpdateSuccess(updatedTx as RowData);  
                    }}
                />
            )}
        </React.Fragment>
    );
  }

type CollapsibleTableProps = {
    rows: RowData[];
    categories: TransactionCategoryProps[];
    types: TransactionTypeProps[];
    users: UserProps[];
    onDelete?: (_id: string) => void;
    openedCreate: (setOpen: boolean)=> void;
};

export default function CollapsibleTable({ rows, categories, types, users, onDelete, openedCreate }: CollapsibleTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(35);
    const [searchTerm, setSearchTerm] = React.useState("");


    const [startDate, setStartDate] = React.useState<string | null>(null);
    const [endDate, setEndDate] = React.useState<string | null>(null);
    const [selectedType, setSelectedType] = React.useState<string>(""); // type id
    const [selectedCategory, setSelectedCategory] = React.useState<string>(""); // category id

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filtreleme işlemi
    const filteredRows = rows.filter((row) => {
        const createdDate = new Date(row.createdDateAt);

        if (startDate && createdDate < new Date(startDate)) return false;
        if (endDate && createdDate > new Date(endDate)) return false;

        if (selectedType) {
            const categoriesForType = categories.filter((cat) => cat.typeId === selectedType);
            const categoryIdsForType = categoriesForType.map((cat) => cat._id);

            if (selectedCategory) {
                if (row.categoryId !== selectedCategory) return false;
            } else {
                if (!categoryIdsForType.includes(row.categoryId)) return false;
            }
        } else {
            if (selectedCategory) {
                if (row.categoryId !== selectedCategory) return false;
            }
        }

        const category = categories.find((c) => c._id === row.categoryId);
        const user = users.find((u) => u._id === row.userId);
        const userFullName = user ? `${user.firstname} ${user.lastname}` : "";

        if (
            !(
                (row.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (row.description ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (category?.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (userFullName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
            )
        ) {
            return false;
        }

        return true;
    });

    const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Box
                sx={{
                    marginBottom: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignContent: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <TextField
                        label="Başlangıç Tarihi"
                        type="date"
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                        value={startDate ?? ""}
                        onChange={(e) => {
                            setStartDate(e.target.value || null);
                            setPage(0);
                        }}
                        sx={{ minWidth: 150 }}
                    />
                    <TextField
                        label="Bitiş Tarihi"
                        type="date"
                        slotProps={{
                            inputLabel: { shrink: true },
                        }}
                        value={endDate ?? ""}
                        onChange={(e) => {
                            setEndDate(e.target.value || null);
                            setPage(0);
                        }}
                        sx={{ minWidth: 150 }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignContent: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <TextField
                        select
                        label=" "
                        slotProps={{
                            select: { native: true },
                        }}
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value);
                            setSelectedCategory("");
                            setPage(0);
                        }}
                        sx={{ minWidth: 150 }}
                    >
                        <option value="">Hepsi</option>
                        {types.map((type) => (
                            <option key={type._id} value={type._id}>
                                {type.title}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label=" "
                        slotProps={{
                            select: { native: true },
                        }}
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setPage(0);
                        }}
                        disabled={!selectedType}
                        sx={{ minWidth: 150 }}
                    >
                        <option value="">Hepsi</option>
                        {categories
                            .filter((cat) => !selectedType || cat.typeId === selectedType)
                            .map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.title}
                                </option>
                            ))}
                    </TextField>
                </Box>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignContent: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                            setSelectedType("");
                            setSelectedCategory("");
                            setSearchTerm("");
                            setPage(0);
                        }}
                    >
                        Sorguları Sıfırla
                    </Button>
                    <Button variant="contained" onClick={() => openedCreate(true)}>
                        Yeni Veri Girişi
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignContent: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <TextField
                        label="Arama"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(0);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{ maxHeight: 700, overflow: "auto" }}>
                <Table aria-label="collapsible table" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="left"
                                sx={{ position: "sticky", bgcolor: "gray", top: 0, zIndex: 1 }}
                            >
                                <strong>Başlık</strong>
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ position: "sticky", bgcolor: "gray", top: 0, zIndex: 1 }}
                            >
                                <strong>Fiyat (₺)</strong>
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ position: "sticky", bgcolor: "gray", top: 0, zIndex: 1 }}
                            >
                                <strong>Kategori</strong>
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ position: "sticky", bgcolor: "gray", top: 0, zIndex: 1 }}
                            >
                                <strong>Tür</strong>
                            </TableCell>
                            <TableCell sx={{ position: "sticky", bgcolor: "gray", top: 0, zIndex: 1 }} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <Row
                                key={`${row._id}-main`}
                                row={row}
                                TCategory={categories}
                                TTypes={types}
                                users={users}
                                onDelete={onDelete}
                                openedCreate={openedCreate}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[35, 100, 200]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


        </>
    );
}
