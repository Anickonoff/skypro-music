'use client';

import Link from 'next/link';
import styles from './not-found.module.css';
import Nav from '@/components/Nav/Nav';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import { useState } from 'react';
import Search from '@/components/Search/Search';
import { useRouter } from 'next/navigation';

export default function notFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); // состояние для хранения поискового запроса
  const onSearchInputChange = (query: string) => {
    setSearchQuery(query);
  }; // функция для обновления поискового запроса
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.notFound}>
            <Search
              onInputChange={onSearchInputChange}
              inputValue={searchQuery}
            />
            <div className={styles.notFound_wrapper}>
              <h1 className={styles.notFound_title}>404</h1>
              <div className={styles.notFound_subtitle}>
                <p>Страница не найдена</p>
                <img src="img/smile_crying.png" alt="Грустный смайлик" />
              </div>
              <p className={styles.notFound_text}>
                Возможно она была удалена или перенесена на другой адрес
              </p>
              <button
                className={styles.notFound_btn}
                onClick={() => {
                  router.push('/music/main');
                }}
              >
                Вернуться на главную
              </button>
            </div>
          </div>
          <Sidebar showPlaylists={false} />
        </main>
        <Bar />
      </div>
    </div>
  );
}
