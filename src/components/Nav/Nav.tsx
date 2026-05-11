'use client';

import Image from 'next/image';
import styles from './nav.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { clearUserData } from '@/store/features/authSlice';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = (): void => {
    dispatch(clearUserData());
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger} onClick={toggleMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isMenuOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/music/favorite" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/auth/signin" className={styles.menu__link}>
                Войти
              </Link>
            </li>
            <li className={styles.menu__item}>
              <p className={styles.menu__link} onClick={logout}>
                Выйти
              </p>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
