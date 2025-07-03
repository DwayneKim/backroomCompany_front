import TopMenuPage from "@/app/topMenu/pages/topMenuPage";
import StatisticPage from "@/app/statistics/pages/statisticPage";

export default async function Page() {

    return (
        <div>
            <main>
                <TopMenuPage></TopMenuPage>
                <StatisticPage></StatisticPage>
            </main>
        </div>
    );
}