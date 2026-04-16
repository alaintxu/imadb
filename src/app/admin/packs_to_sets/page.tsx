import { fetchAllPacks } from "@/lib/jsdelivr/packs";
import { getAllSets } from "@/lib/sets/sets";

import { packNameByLanguage } from "@/lib/packs/packs_front";
import { CardSetNameWithCode } from "@/components/CardSetName";
import CardImageWithSkeleton from "@/components/CardImageWithSkeleton";


export default async function PacksToSetsPage() {
    const packs = await fetchAllPacks();
    const sets = await getAllSets();
    const noPackSets = sets.filter((set) => set.pack_code === null);    
    const packSets = sets
        .filter((set) => set.pack_code !== null)
        .sort((a, b) => (b.size ?? 0) - (a.size ?? 0));

    return (

        <section className="bg-folder p-4">
            <h1 className="sticker text-modok mb-4">Cargar Cartas de packs para actualizar los sets</h1>
            <div className="flex flex-wrap gap-1">
                {packs.map(pack => {
                    const color = sets.some(s => s.pack_code === pack.code) ? "bg-green-500" : "bg-modok";
                    return (
                    <a  key={pack.code} 
                        href={`/api/admin/scrapping/load_pack_code_to_sets/${pack.code}`}
                        className={`rounded ${color} text-white px-2 py-1`}
                        target="_blank">
                        {packNameByLanguage(pack, "es")} ({pack.code})
                    </a>
                    )
                })}
            </div>
            <h2 className="sticker text-modok my-4">Sets sin pack</h2>
            <ul className="flex flex-wrap gap-1 rounded">
                {noPackSets.map(set => (
                    <li key={set.code} className="flex flex-col gap-1 bg-clip p-4">
                        <span className="sticker"><CardSetNameWithCode set={set} /></span>
                        <span>Pack: {set.pack_code}</span>
                        <span>Size: {set.size}</span>
                    </li>
                ))}
            </ul>
            <h2 className="sticker text-modok my-4">Sets con pack</h2>
            <ul className="auto-grid rounded">
                {packSets.map(set => (
                    <li key={set.code} className="flex flex-col gap-1 bg-clip p-4">
                        <span className="text-xl handwritten"><CardSetNameWithCode set={set} /></span>
                        <pre className="sticker text-dark"><code>
                            {JSON.stringify(set, null, 2)}
                        </code></pre>
                        {set.first_card_code && 
                            <CardImageWithSkeleton src={`https://cdn.jsdelivr.net/gh/alaintxu/mc-ocr@main/images/accepted/${set.first_card_code}.webp`} 
                                alt={set.name["es"] || set.name["en"] || set.code}
                                className="rounded" />
                        }
                    </li>
                ))}
            </ul>
        </section>
    );
}