import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import React from 'react';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: React.ReactNode;
    onConfirm: () => void;
    onClose: () => void;

}

export default function ConfirmDialog({
    onConfirm,
    onClose,
    open,
    title,
    message,
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button onClick={onConfirm} color="error">Sil</Button>
            </DialogActions>
        </Dialog>
    );
}