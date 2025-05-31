'use client';

import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import styles from './style.module.css';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email === 'admin' && password === 'meral') {
      // sessionStorage (tarayıcı kapanınca silinir)
      sessionStorage.setItem('isLoggedIn', 'true');

      // session cookie (expires verilmediği için tarayıcı kapanınca silinir)
      document.cookie = `isLoggedIn=true; path=/`;

      router.push('/dashboard');
    } else {
      alert('Kullanıcı adı veya şifre yanlış');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <h1>Giriş yap</h1>

        <div className={styles.items}>
          <Input
            placeholder="Kullanıcı adı"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="solid"
          />
        </div>

        <div className={styles.items}>
          <Input
            placeholder="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="solid"
          />
        </div>

        <div className={styles.items}>
          <Button variant="contained" onClick={handleLogin}>Giriş Yap</Button>
        </div>
      </div>
    </div>
  );
}
