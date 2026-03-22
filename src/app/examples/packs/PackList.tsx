"use client";
import { use } from 'react';
import { Pack } from '@/lib/packs/packs';

export function PackList({packsPromise}: {packsPromise: Promise<Pack[]>}) {
    const packs = use(packsPromise);
    const filteredPacks = packs.filter(pack => pack.pack_type_code === 'story');

    return (
        <div className="auto-grid">
            {filteredPacks.map(pack => (
                <div key={pack.code} className="border rounded p-4 bg-folder typewritter">
                    <h2 className="text-modok">{pack.name.es}</h2>
                    <p>Release Date: {pack.date_release}</p>
                    <p>Type: {pack.pack_type_code}</p>
                    <p>Size: {pack.size} cards</p>
                </div>
            ))}
        </div>
    );
}