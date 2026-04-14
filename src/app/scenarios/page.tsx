import ScenarioList from "@/components/scenario/ScenarioList";
import { Suspense } from "react";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import Loading from "@/components/Loading";
import { ScenarioPageClient } from "./ScenarioPageClient";

export const dynamic = "force-dynamic";

export default async function ScenarioListPage() {
    return (
        <section>
            <ScenarioPageClient />
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <ScenarioList />
                </Suspense>
            </ErrorBoundary>
        </section>
    );
}