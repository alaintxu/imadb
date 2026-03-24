"use client";
import { colorStyles } from './SetSelect';
import type { MultiValue } from 'react-select';
import Select from 'react-select';
import { use, useEffect, useState } from 'react';
import { useSetsQuery, type SetsQueryParams } from '@/lib/query/queries';
import type { SetOption } from './SetSelect';
import type { CardSet, CardSetType } from '@/lib/sets/sets';
import { sortSetsByName, cardSetNameByLanguage } from '@/lib/sets/sets_front';



export default function SetSelectMulti({
    onSelectChange,
    defaultSetCodes,
    setType = '',
    className = ''
 }: {
    onSelectChange: (sets: CardSet[]) => void,
    defaultSetCodes?: string[],
    setType?: CardSetType | '',
    className?: string
}) {
    const setsQueryParams: SetsQueryParams = setType ? {type: setType} : {};
    const setsQuery = useSetsQuery(setsQueryParams);
    const sets = use(setsQuery.promise);

    const options: SetOption[] = sortSetsByName(sets).map((cardSet) => ({
        value: cardSet.code,
        label: cardSetNameByLanguage(cardSet, "es"),
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
            <Select
                isMulti
                options={options}
                onChange={handleChange}
                placeholder={`Search ${setType} sets...`}
                noOptionsMessage={() => "No sets found"}
                value={selectedOptions}
                styles={colorStyles}
            />
        </div>
    );
}