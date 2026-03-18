import { Suspense } from 'react';
import Image from 'next/image';
import {Pack} from '@/lib/packs/packs';
import { fetchItems } from '@/lib/apiFetch/fetchData';
import { PackList } from './PackList';


export default async function PacksListPage() {
    const url = 'https://cdn.jsdelivr.net/gh/zzorba/marvelsdb-json-data@master/packs.json';
    const packsPromise = fetchItems<Pack>(url);

    return (
        <section>
            <h1>
                Lista de Packs
            </h1>

            <Suspense fallback={
                <Image src="/lab_animated.svg" alt="Loading..." width={500} height={500} style={
                    { width: '50%', maxWidth: '500px', margin: 'auto' }
                } />
                }>
                <div>
                    <PackList packsPromise={packsPromise} />
                </div>
            </Suspense>
        </section>
    );
}