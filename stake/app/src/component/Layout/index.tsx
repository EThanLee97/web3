import { ReactNode } from 'react';
import styles from '../../styles/Home.module.css';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header></Header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
