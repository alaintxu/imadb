import type { IMA } from "@/lib/imas/imas";
import { getIMAs } from "@/lib/imas/imas";
import IMACard from "./IMACard/IMACard";
import type { IMAQueryParams } from "@/lib/query/queries";
import Postit from "@/components/Postit";

function getRotationClass(code: string): string {
    const rotations = ["-rotate-2", "-rotate-1", "rotate-1", "rotate-2"];
    const hash = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return rotations[hash % rotations.length]!;  // ! makes TypeScript happy, we know this will always be defined
}

export default async function IMAListServerComponent(params: IMAQueryParams) {

    const imas: IMA[] = await getIMAs(params);

    if (imas.length === 0) {
        return (
            <section id="ima-folder-list" className="flex justify-center items-center mt-10">
                <Postit color="warning">
                    <p>No IMAs found</p>
                </Postit>
            </section>
        );
    }

    return (
        <section id="ima-folder-list" className="auto-grid">
            {imas.map(ima => (
                <div key={ima.id} className={getRotationClass(ima.id)}>
                    <IMACard ima={ima} />
                </div>
            ))}
        </section>
    );
} 