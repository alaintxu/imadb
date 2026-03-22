import { getSetsByType } from "@/lib/sets/sets";
import { CardSet } from "@/lib/sets/sets";
import ScenarioList from "@/components/scenario/ScenarioList";
import { Heading1 } from "@/components/Headings";
import { MdPhotoAlbum } from "react-icons/md";


export default async function ScenarioListPage() {
    const scenarios: CardSet[] = await getSetsByType("villain");

    return (

        <section>
            <Heading1 title="Elige un escenario">
                <MdPhotoAlbum/>
                IMAs por escenario
            </Heading1>
            <ScenarioList scenarios={scenarios} />
        </section>
    );
}