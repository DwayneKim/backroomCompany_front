import TopMenuPage from "@/app/topMenu/pages/topMenuPage";
import DeathStatistic from "@/app/death/pages/DeathStatistic";

export default async function Page() {

    return (
        <div>
            <main>
                <TopMenuPage></TopMenuPage>
                <DeathStatistic></DeathStatistic>
            </main>
        </div>
    );
}