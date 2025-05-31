"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateTransaction } from "./actions";

interface Category {
    _id: string;
    title: string;
}

interface Transaction {
    _id: string;
    title: string;
    amount: number;
    description: string;
    categoryId: string;
}

type UpdateTransactionFormProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    initialData: Transaction;
    categories: Category[];

    onSuccess: (updatedTx: Transaction) => void;
};

export default function UpdateTransactionForm({
    open,
    setOpen,
    categories,
    initialData,
    onSuccess,
}: UpdateTransactionFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        description: "",
        categoryId: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                amount: initialData.amount.toString(),
                description: initialData.description,
                categoryId: initialData.categoryId,
            });
        }
    }, [initialData]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Gönderilecek veri objesi
        const data = {
            title: formData.title,
            amount: parseFloat(formData.amount), // string'ten sayıya çevriliyor
            description: formData.description,
            categoryId: formData.categoryId,
        };

        try {
            const result = await updateTransaction(initialData._id, data);

            console.log("Update result:", result);

            if (result.success && result.details) {
                onSuccess(result.details);
            } else {
                console.error("Update başarısız:", result);
            }
            

        } catch (error) {
            console.error("Güncelleme hatası:", error);
        } finally {
            setOpen(false);
        }
        console.log("seçilen: ", data)
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Güncelle</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Başlık"
                        name="title"
                        fullWidth
                        margin="dense"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <TextField
                        label="Fiyat"
                        name="amount"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                        inputProps={{ step: "0.01" }}
                    />

                    <TextField
                        label="Açıklama"
                        name="description"
                        fullWidth
                        margin="dense"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <FormControl fullWidth margin="dense" required>
                        <InputLabel id="category-label">Kategori</InputLabel>
                        <Select
                            labelId="category-label"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            label="Kategori"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>İptal</Button>
                    <Button type="submit" variant="contained">
                        Kaydet
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
