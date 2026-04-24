"use client";
import { SetFigure } from "@/components/set/SetFigure";
import styles from "./ScenarioList.module.css";
import Link from "next/link";
import { use, useState } from "react";
import { MdClear } from "react-icons/md";
import { useSetsQuery } from "@/lib/query/queries";
import { useTranslation } from "@/i18n";
import type { CardSet } from "@/lib/sets/sets";
import { useSortSetsByFirstCardCode } from "@/lib/sets/sets_front";

function getRotationClass(code: string): string {
    const rotations = ["-rotate-4", "-rotate-3", "-rotate-2", "-rotate-1", "rotate-1", "rotate-2", "rotate-3", "rotate-4"];
    const hash = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return rotations[hash % rotations.length]!;
}

function getCardSetName(set: CardSet, language: string): string {
    return set.name[language] ?? set.name["en"] ?? set.code;
}

export default function ScenarioList() {
    const { t, language } = useTranslation();
    const villainsQuery = useSetsQuery({type: "villain"});
    const villains = use(villainsQuery.promise);
    const [filterText, setFilterText] = useState("");
    const lowerFilter = filterText.toLowerCase();
    const filteredScenarios = villains.filter((scenario) =>
        getCardSetName(scenario, language).toLowerCase().includes(lowerFilter)
    );
    return (
        <div>
            <div className="flex justify-end mb-4">
                <input  type="text" 
                        placeholder={t("scenarios.filterPlaceholder")} 
                        className="bg-white border-b-2 border-gray-300 focus:border-modok outline-none px-4 rounded-l-lg text-sm"
                        value={filterText} 
                        onChange={(e) => setFilterText(e.target.value)} />
                <button className="bordered p-4 bg-modok text-white rounded-r-lg" onClick={() => setFilterText("")}>
                    <MdClear />
                </button>
            </div>
            <div className={`auto-grid ${styles['scenarioGrid']}`}>
                {filteredScenarios.map((scenario) => {
                    const randRotate = getRotationClass(scenario.code);
                    const scenarioName = getCardSetName(scenario, language);
                    return (
                    <Link key={scenario.code}
                            href={`/imas?villainCode=${scenario.code}`}
                            className={randRotate}>
                        <SetFigure
                            name={scenarioName}
                            code={scenario.first_card_code || "back_orange"}
                            className="shadow-lg hover:shadow-md"
                            />
                    </Link>
                )})}
            </div>
        </div>
    )

}