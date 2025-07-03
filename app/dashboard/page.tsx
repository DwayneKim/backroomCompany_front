import TopMenuPage from "@/app/topMenu/pages/topMenuPage";
import DashboardPage from "@/app/dashboard/pages/dashboardPage";

export default async function Page() {

    return (
        <div>
            <main>
                <TopMenuPage></TopMenuPage>
                <DashboardPage></DashboardPage>
            </main>
        </div>
    );
}