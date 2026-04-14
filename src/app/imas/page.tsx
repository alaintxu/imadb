import type { IMAQueryParams } from "@/lib/query/queries";
import IMAListServerComponent from "@/components/ima/IMAListServerComponent";
import { IMAListPageClient } from "./IMAListPageClient";

export default async function IMAListPage({searchParams}: {searchParams: Promise<IMAQueryParams>}) {
    const imaQueryParams = await searchParams;

    return (
        <section className="">
            <IMAListPageClient villainCode={imaQueryParams.villainCode} />
            <IMAListServerComponent {...imaQueryParams} />
        </section>
    );
}