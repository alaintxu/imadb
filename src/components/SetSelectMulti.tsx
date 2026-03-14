"use client";
import type { CardSet, CardSetType } from '@/store/entities/sets';
import { colorStyles } from './SetSelect';
import { loadSets } from '@/store/entities/sets';
import { selectSetsByType, selectIsLoading } from '@/store/entities/sets';
import type { MultiValue } from 'react-select';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import type { SetOption } from './SetSelect';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';


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
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadSets());
    }, [dispatch]);

    const sets: CardSet[] = useAppSelector(state => selectSetsByType(setType)(state));

    const isLoading: boolean = useAppSelector(selectIsLoading);
    const options: SetOption[] = sets.map((cardSet) => ({
        value: cardSet.code,
        label: cardSet.name,
        set: cardSet,
    }));

    const [userSelectedOptions, setUserSelectedOptions] = useState<SetOption[]|null>(null);

    const selectedOptions: SetOption[] = userSelectedOptions !== undefined ? userSelectedOptions
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