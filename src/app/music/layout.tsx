import { ReactNode } from 'react';
import styles from './layout.module.css';
import Nav from '@/components/Nav/Nav';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function CategoryLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          {children}
          <Sidebar />
        </main>
        <Bar />
      </div>
    </div>
  );
}
