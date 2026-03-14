"use client";
import type { CardSet, CardSetType } from '../lib/sets/set_types';
import type { MultiValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useCallback, useState } from 'react';


export default function SetSelectMulti({
    onSelectChange,
    defaultSetCodes,
    setType = '',

 }: {
    onSelectChange: (sets: CardSet[]) => void,
    defaultSetCodes?: string[],
    setType?: CardSetType|"",
}) {

    type SetOption = {
        value: string;
        label: string;
        set: CardSet;
    };

    const [selectedOptions, setSelectedOptions] = useState<SetOption[]>([]);
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

        if(defaultSetCodes && defaultSetCodes.length > 0){
            const defaultOptions = options.filter((option) => defaultSetCodes.includes(option.value))
            setSelectedOptions(defaultOptions);
            onSelectChange(defaultOptions.map((option) => option.set)); // Notify parent of default selections

        }
        setIsLoading(false);
        return options;
    }, [setType, setSelectedOptions, defaultSetCodes, setIsLoading, onSelectChange]);

    const handleChange = (selected: MultiValue<SetOption>) => {
        setSelectedOptions([...selected]);
        onSelectChange(selected.map((option) => option.set));
    };


    return (
        <div className="villain-select">
            
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                onChange={handleChange}
                placeholder={isLoading ? "loading" : `Search ${setType} sets...`}
                noOptionsMessage={() => "No sets found"}
                value={selectedOptions}
            />
        </div>
    );
}