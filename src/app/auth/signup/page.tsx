'use client';

import { getToken, signUpUser } from '@/services/auth/authApi';
import styles from './page.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { AxiosError } from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      setIsLoading(false);
      return setErrorMessage('Пожалуйста, заполните все поля');
    }
    if (password !== passwordConfirm) {
      setIsLoading(false);
      return setErrorMessage('Пароли не совпадают');
    }
    const username = email.split('@')[0];
    signUpUser({ email, password, username })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.result.username));
      })
      .then(() => {
        return getToken({ email, password });
      })
      .then((response) => {
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
      })
      .then(() => {
        window.location.href = '/music/main';
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage(
              'Нет ответа от сервера. Пожалуйста, попробуйте позже.',
            );
          } else {
            setErrorMessage(
              'Неизвестная ошибка, попробуйте, пожалуйста, позже.',
            );
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={handleEmailChange}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={handlePasswordChange}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={handlePasswordConfirmChange}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
