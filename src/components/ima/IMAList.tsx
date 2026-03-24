"use client";

import { use } from "react";
import type { IMA } from "@/lib/imas/imas";
import { useIMAsQuery, type IMAQueryParams } from "@/lib/query/queries";
import IMACard from "./IMACard/IMACard";

function getRotationClass(code: string): string {
    const rotations = ["-rotate-2", "-rotate-1", "rotate-1", "rotate-2"];
    const hash = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return rotations[hash % rotations.length]!;  // ! makes TypeScript happy, we know this will always be defined
}

export default function IMAList(params: IMAQueryParams) {

    const imasQuery = useIMAsQuery(params);
    const imas: IMA[] = use(imasQuery.promise);

    return (
        <section id="ima-folder-list" className="auto-grid">
            {imas.map(async ima => (
                <div key={ima.id} className={getRotationClass(ima.id)}>
                    <IMACard ima={ima} />
                </div>
            ))}
        </section>
    );
} 