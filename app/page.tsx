//import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This is the main dashboard page.</p>
      <Link href="/pages/electricity">
        Go to Electricity Dashboard
      </Link>
    </div>
  );
}
