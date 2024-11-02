// app/electricity/page.tsx
import styles from './page.module.css';

export default function ElectricityPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Electricity Dashboard</h1>
      <p className={styles.description}>This is the electricity page.</p>
    </div>
  );
}