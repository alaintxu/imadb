import { getAllIMAs, getIMAsByVillainCode } from "@/lib/imas/imas";
import IMACard from "@/components/ima/IMACard";
import type { IMA } from "@/lib/imas/imas";
import { Heading1 } from "@/components/Headings";
import Postit from "@/components/Postit";
import { ImLab } from "react-icons/im";


function getRotationClass(code: string): string {
    const rotations = ["-rotate-2", "-rotate-1", "rotate-1", "rotate-2"];
    const hash = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return rotations[hash % rotations.length];
}


export default async function IMAListPage({searchParams}: {searchParams: Promise<{scenario?: string}>}) {
    const {scenario} = await searchParams;
    const imas: IMA[] = scenario ? await getIMAsByVillainCode(scenario) : await getAllIMAs();

    return (

        <section className="">
            <Heading1>
                <ImLab/>
                IMAs {scenario && <span>({scenario})</span>}
            </Heading1>
            {imas.length === 0 && <>
                <div className="flex justify-center mt-16">
                    <Postit>No hay IMAs para este escenario</Postit>
                </div>
            </>}

            <div id="ima-folder-list" className="auto-grid">
                {imas.map(async ima => <div key={ima.id} className={getRotationClass(ima.id)}><IMACard ima={ima} /></div>)}
            </div>
        </section>
    );
}