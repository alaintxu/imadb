import { Heading1 } from "@/components/Headings";
import { ImLab } from "react-icons/im";
import LinkButton from "@/components/LinkButton";
//import { Suspense } from "react";
//import IMAList from "@/components/ima/IMAList";
import type { IMAQueryParams } from "@/lib/query/queries";
//import ErrorBoundary from "@/components/Error/ErrorBoundary";
//import Loading from "@/components/Loading";
import IMAListServerComponent from "@/components/ima/IMAListServerComponent";

export default async function IMAListPage({searchParams}: {searchParams: Promise<IMAQueryParams>}) {
    const imaQueryParams = await searchParams;

    return (
        <section className="">
            <Heading1>
                <ImLab/>
                IMAs {imaQueryParams.villainCode && <span>({imaQueryParams.villainCode})</span>}
            </Heading1>
            <div className="flex justify-end mb-4">
                <LinkButton href="/imas/new" className="btn" iconConcept="add" >
                    Create new IMA
                </LinkButton>
            </div>
            {/*<ErrorBoundary>
                <Suspense fallback={
                    <Loading>
                        Cargando IMAs...
                    </Loading>
                }>
                    <IMAList {...imaQueryParams} />
                </Suspense>
            </ErrorBoundary>*/}
            <IMAListServerComponent {...imaQueryParams} />
        </section>
    );
}