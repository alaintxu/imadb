"use client";
import CardPhoto from "@/components/CardPhoto/CardPhoto";
import styles from "./ScenarioList.module.css";
import Link from "next/link";
import { use, useState } from "react";
import { MdClear } from "react-icons/md";
import { useSetsQuery } from "@/lib/query/queries";
import { sortSetsByName } from "@/lib/sets/sets_front";
import { cardSetNameByLanguage } from "@/lib/sets/sets_front";

function getRotationClass(code: string): string {
    const rotations = ["-rotate-4", "-rotate-3", "-rotate-2", "-rotate-1", "rotate-1", "rotate-2", "rotate-3", "rotate-4"];
    const hash = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return rotations[hash % rotations.length]!;
}

export default function ScenarioList() {
    const villainsQuery = useSetsQuery({type: "villain"});
    const villains = use(villainsQuery.promise);
    const [filterText, setFilterText] = useState("");
    const lowerFilter = filterText.toLowerCase();
    const sortedVillains = sortSetsByName(villains);
    const filteredScenarios = sortedVillains.filter((scenario) =>
        cardSetNameByLanguage(scenario, "es").toLowerCase().includes(lowerFilter)
    );
    return (
        <div>
            <div className="flex justify-end mb-4">
                <input  type="text" 
                        placeholder="Filtrar escenario con texto..." 
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
                    const scenarioName = cardSetNameByLanguage(scenario, "es");
                    return (
                    <Link   key={scenario.code}
                            href={`/imas?scenario=${scenario.code}`}
                            title={scenarioName}
                            className={randRotate}>
                        <CardPhoto 
                            name={scenarioName} 
                            code={scenario.code}
                            className="shadow-lg hover:shadow-md"
                            />
                    </Link>
                )})}
            </div>
        </div>
    )

}