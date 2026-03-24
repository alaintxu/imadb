import ScenarioList from "@/components/scenario/ScenarioList";
import { Heading1 } from "@/components/Headings";
import { MdPhotoAlbum } from "react-icons/md";
import { Suspense } from "react";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import Loading from "@/components/Loading";

export default async function ScenarioListPage() {
    return (

        <section>
            <Heading1 title="Elige un escenario">
                <MdPhotoAlbum />
                IMAs por escenario
            </Heading1>
            <ErrorBoundary>
                <Suspense fallback={
                    <Loading>
                        Cargando escenarios...
                    </Loading>
                }>
                    <ScenarioList />
                </Suspense>
            </ErrorBoundary>
        </section>
    );
}