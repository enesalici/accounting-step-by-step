import React from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import styles from './style.module.css';


export default function LoginPage() {
    return (
        <div className={styles.loginPage}>

            <div className={styles.loginBox}>
                <h1>Giriş yap </h1>
                <div className={styles.items}>
                    <Input
                        color="neutral"
                        disabled={false}
                        placeholder="E-Mail"
                        size="md"
                        type='email'
                        variant="solid"
                    />
                </div>

                <div className={styles.items}>
                    <Input
                        color="neutral"
                        disabled={false}
                        placeholder="Password"
                        type='password'
                        size="md"
                        variant="solid"
                    />
                </div>

                <div className={styles.items}>
                    <Button variant="contained">giriş yap</Button>
                </div>
            </div>
        </div>
    )
}