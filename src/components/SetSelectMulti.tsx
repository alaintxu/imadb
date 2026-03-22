"use client";
import { colorStyles } from './SetSelect';
import type { MultiValue } from 'react-select';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useSetsQuery } from '@/lib/query/queries';
import type { SetOption } from './SetSelect';
import type { CardSet, CardSetType } from '@/lib/sets/sets';



export default function SetSelectMulti({
    onSelectChange,
    defaultSetCodes,
    setType = '',
    className = ''
 }: {
    onSelectChange: (sets: CardSet[]) => void,
    defaultSetCodes?: string[],
    setType?: CardSetType|"",
    className?: string
}) {
    const { data: sets = [], isLoading} = useSetsQuery(setType);

    const options: SetOption[] = sets.map((cardSet) => ({
        value: cardSet.code,
        label: cardSet.name.es,
        set: cardSet,
    }));


    const [userSelectedOptions, setUserSelectedOptions] = useState<SetOption[]|null>(null);

    const selectedOptions: SetOption[] = userSelectedOptions !== null ? userSelectedOptions
        : options.filter(option => defaultSetCodes?.includes(option.value)) || [];

    const handleChange = (selected: MultiValue<SetOption>) => {
        setUserSelectedOptions([...selected]);
        onSelectChange(selected.map((option) => option.set));
    };

    useEffect(() => {
        if(userSelectedOptions !== null) return;
        if(defaultSetCodes)
            onSelectChange(options.filter(option => defaultSetCodes?.includes(option.value)).map(option => option.set));
    }, [defaultSetCodes, options, onSelectChange, userSelectedOptions]);


    return (
        <div className={`${className} villain-select`}>
            {isLoading ? (<div>Loading...</div>) : (
            <Select
                isMulti
                options={options}
                onChange={handleChange}
                placeholder={isLoading ? "loading" : `Search ${setType} sets...`}
                noOptionsMessage={() => "No sets found"}
                value={selectedOptions}
                styles={colorStyles}
            />
            )}
        </div>
    );
}