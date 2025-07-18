import styles from "./page.module.css";
import StatisticPage from "@/app/statistics/pages/statisticPage";
import TopMenuPage from "@/app/topMenu/pages/topMenuPage";
import LoginPage from "@/app/login/pages/LoginPage";

export default async function Home() {

    return (
    <div className={styles.page}>
      <main className={styles.main}>
          <TopMenuPage></TopMenuPage>
          <StatisticPage></StatisticPage>
      </main>
    </div>
  );
}

