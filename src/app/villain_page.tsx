"use client"
import SetSelectMulti from '@/components/SetSelectMulti';
import SetSelect from '@/components/SetSelect';
import type { CardSet } from '../lib/sets/set_types';
import { useState } from "react";

export default function VillainPage() {
    const [selectedVillain, setSelectedVillain] = useState<CardSet|null>(null);
    const [selectedModules, setSelectedModules] = useState<CardSet[]>([]);
    const [selectedNemesis, setSelectedNemesis] = useState<CardSet[]>([]);


  return (
    <div className="border m-4">
    <SetSelect onSelectChange={(set) => setSelectedVillain(set)} setType="villain" defaultSetCode={"crossbones"} />
      {selectedVillain && (
        <div>
          <h3>Selected Villain:</h3>
          <span>{selectedVillain.code}</span>
        </div>
      )}
    <SetSelectMulti onSelectChange={(sets) => setSelectedModules(sets)} setType="modular" defaultSetCodes={["ant", "acolytes"]} />
    {selectedModules.length > 0 && (
        <div>
            <h3>Selected Modules:</h3>
            <ul>
                {selectedModules.map((module) => (
                    <li key={module.code}>{module.code}</li>
                ))}
            </ul>
        </div>
    )}
    <SetSelectMulti onSelectChange={(sets) => setSelectedNemesis(sets)} setType="nemesis" defaultSetCodes={["x23_nemesis", "angel_nemesis"]} />
    {selectedNemesis.length > 0 && (
        <div>
            <h3>Selected Nemesis:</h3>
            <ul>
                {selectedNemesis.map((module) => (
                    <li key={module.code}>{module.code}</li>
                ))}
            </ul>
        </div>
    )}
    </div>
  );
}