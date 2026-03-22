"use client";
import { CardSet } from "@/lib/sets/sets";
import CardPhoto from "@/components/CardPhoto/CardPhoto";
import styles from "./ScenarioList.module.css";
import Link from "next/link";
import { useState } from "react";
import { MdClear } from "react-icons/md";

function getRotationClass(code: string): string {
    const rotations = ["-rotate-4", "-rotate-3", "-rotate-2", "-rotate-1", "rotate-1", "rotate-2", "rotate-3", "rotate-4"];
    const hash = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return rotations[hash % rotations.length];
}

export default function ScenarioList({ scenarios }: { scenarios: CardSet[] }) {
    const sortedScenarios = scenarios.sort((a, b) => a.name.es.localeCompare(b.name.es));
    const [filterText, setFilterText] = useState("");
    const filteredScenarios = sortedScenarios.filter(scenario => scenario.name.es.toLowerCase().includes(filterText.toLowerCase()));
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
            <div className={`auto-grid ${styles.scenarioGrid}`}>
                {filteredScenarios.map((scenario) => {
                    const randRotate = getRotationClass(scenario.code);
                    return (
                    <Link   key={scenario.code}
                            href={`/imas?scenario=${scenario.code}`}
                            title={scenario.name.es}
                            className={randRotate}>
                        <CardPhoto 
                            name={scenario.name.es} 
                            code={scenario.code}
                            className="shadow-lg hover:shadow-md"
                            />
                    </Link>
                )})}
            </div>
        </div>
    )

}