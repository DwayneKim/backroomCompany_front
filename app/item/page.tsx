import TopMenuPage from "@/app/topMenu/pages/topMenuPage";
import DeathStatistic from "@/app/death/pages/DeathStatistic";
import ItemStatistic from "@/app/item/pages/ItemStatistic";

export default async function Page() {

    return (
        <div>
            <main>
                <TopMenuPage></TopMenuPage>
                <ItemStatistic></ItemStatistic>
            </main>
        </div>
    );
}