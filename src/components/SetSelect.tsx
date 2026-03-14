"use client";
import type { CardSet, CardSetType } from '../lib/sets/set_types';
import AsyncSelect from 'react-select/async';
import { useCallback, useState } from 'react';


export default function SetSelect({
    onSelectChange,
    defaultSetCode,
    setType = '',

 }: {
    onSelectChange: (set: CardSet) => void,
    defaultSetCode?: string,
    setType?: CardSetType|"",
}) {

    type SetOption = {
        value: string;
        label: string;
        set: CardSet;
    };

    const [selectedOption, setSelectedOption] = useState<SetOption | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadOptions = useCallback(async (): Promise<SetOption[]> => {
        setIsLoading(true);
        const response = await fetch(`/api/sets/${setType}`);
        if (!response.ok) {
            return [];
        }

        const sets = (await response.json()) as CardSet[];
        const options = sets.map((cardSet) => ({
            value: cardSet.code,
            label: cardSet.name,
            set: cardSet,
        }));

        if(defaultSetCode){
            const foundOption = options.find((option) => option.value === defaultSetCode);

            if(foundOption){
                setSelectedOption(foundOption || null);
                onSelectChange(foundOption.set);
            }
        }
        setIsLoading(false);
        return options;
    }, [setType, defaultSetCode, setSelectedOption, onSelectChange, setIsLoading]);

    const handleChange = (selected: SetOption | null) => {
        if (selected) {
            setSelectedOption(selected);
            onSelectChange(selected.set);
        }
    };


    return (
        <div className="villain-select">
            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                onChange={handleChange}
                placeholder={isLoading ? "loading" : `Search ${setType} sets...`}
                noOptionsMessage={() => "No sets found"}
                value={selectedOption}
            />
        </div>
    );
}