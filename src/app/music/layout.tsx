'use client';

import { ReactNode } from 'react';
import styles from './layout.module.css';
import Nav from '@/components/Nav/Nav';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';

type MusicLayoutProps = {
  children: ReactNode;
};

export default function MusicLayout({ children }: MusicLayoutProps) {
  useInitAuth();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <Nav />
          {children}
          <Sidebar />
        </main>
        <Bar />
      </div>
    </div>
  );
}
