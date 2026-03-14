"use client"
import SetSelectMulti from '@/components/SetSelectMulti';
import SetSelect from '@/components/SetSelect';
import type { CardSet } from '../store/entities/sets';
import { useState } from "react";
import { MdAdd } from "react-icons/md";

export default function ImaForm() {
    const [selectedVillain, setSelectedVillain] = useState<CardSet|null>(null);
    const [selectedModules, setSelectedModules] = useState<CardSet[]>([]);
    const [selectedNemesis, setSelectedNemesis] = useState<CardSet[]>([]);


  return (
    <div className="p-4 flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
            <label className="w-full">
                Villano
                <SetSelect onSelectChange={(set) => setSelectedVillain(set)} setType="villain" defaultSetCode={"crossbones"} className="w-full"/>
            </label>
            <label className="w-full">
                Módulos
                <SetSelectMulti onSelectChange={(sets) => setSelectedModules(sets)} setType="modular" defaultSetCodes={["ant", "acolytes"]} className="w-full" />
            </label>
            <label className="w-full">
                Archienemigos
                <SetSelectMulti onSelectChange={(sets) => setSelectedNemesis(sets)} setType="nemesis" defaultSetCodes={["x23_nemesis", "angel_nemesis"]} className="w-full" />
            </label>
        </div>
        <label>
            Descripción
            <textarea className="w-full h-48 p-4 border rounded" placeholder="Descripción" />
        </label>
        <div>
            <button className="border rounded flex gap-1 items-center py-1 px-4">
                <MdAdd/>
                Guardar IMA
            </button>
        </div>

        <div className="flex gap-4 justify-between">
            {selectedVillain && (
                <div>
                    <h3>Selected Villain:</h3>
                    <div className="border rounded py-1 px-4">
                        {selectedVillain.name} ({selectedVillain.code})
                    </div>
                </div>
            )}
            {selectedModules.length > 0 && (
                <div className="w-full">
                    <h3>Selected Modules:</h3>
                    <ul className="flex flex-col flex-wrap gap-4">
                        {selectedModules.map((module) => (
                            <li className="border rounded py-1 px-4 text-center" key={module.code}>{module.name} ({module.code})</li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedNemesis.length > 0 && (
                <div className="w-full">
                    <h3>Selected Nemesis:</h3>
                    <ul className="flex flex-col flex-wrap gap-4">
                        {selectedNemesis.map((module) => (
                            <li className="border rounded py-1 px-4 text-center" key={module.code}>{module.name} ({module.code})</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
  );
}