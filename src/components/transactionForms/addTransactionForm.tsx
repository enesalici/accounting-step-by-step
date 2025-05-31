import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { Dispatch, SetStateAction, useState, } from "react";
import { addTransaction } from "./actions"

interface Category {
    _id: string;
    title: string;
    typeId: string;
}

interface AddTransactionFormProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    categories: Category[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (newTransaction: any) => void;
    
}

export default function AddTransactionForm({
    open,
    setOpen,
    categories,
    onSuccess
}: AddTransactionFormProps) {
    const [selectedCategory, setSelectedCategory] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newTransaction = await addTransaction(formData);
        console.log("newTransaction:", newTransaction);
        if (newTransaction) {
            onSuccess(newTransaction);
        } else {
            alert("Yeni işlem eklenemedi veya veri eksik");
        }
    };


    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>Yeni İşlem Ekle</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField name="title" label="Başlık" fullWidth margin="dense" />
                    <TextField
                        name="amount"
                        label="Fiyat"
                        type="number"
                        fullWidth
                        margin="dense"
                        slotProps={{
                            input: {
                                inputProps: {
                                    step: "any",
                                },
                            },
                        }}
                    />
                    <TextField
                        name="description"
                        label="Açıklama"
                        fullWidth
                        margin="dense"
                    />
                    {/* <TextField
                        name="userId"
                        label="Kullanıcı"
                        fullWidth
                        margin="dense"
                    /> */}

                    <FormControl fullWidth margin="dense">
                        <InputLabel id="category-label">Kategori</InputLabel>
                        <Select
                            labelId="category-label"
                            name="categoryId"
                            value={selectedCategory || ""}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            label="Kategori"
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>İptal</Button>
                    <Button onClick={() => setOpen(false)} type="submit" variant="contained">
                        Kaydet
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
