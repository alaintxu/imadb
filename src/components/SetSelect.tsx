"use client";
import type { CardSet, CardSetType } from '@/store/entities/sets';
import { loadSets } from '@/store/entities/sets';
import { selectSetsByType, selectIsLoading } from '@/store/entities/sets';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import Select from 'react-select';

export const colorStyles: StylesConfig<ColourOption, true> = {
        control: (styles) => ({ ...styles, backgroundColor: 'var(--color-accent)', width: '100%' }),
        option: (styles, { data, isFocused, isSelected }) => {
            const color = data.color || 'var(--color-accent)';
            return {
                ...styles,
                backgroundColor: isFocused ? color : 'var(--color-surface)',
                color: isFocused ? 'var(--color-background)' : color,
                cursor: 'pointer',
            };
        },
        multiValue: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: 'var(--color-surface)',
            }
        },
        multiValueLabel: (styles, { data }) => {
            return {
                ...styles,
                color: data.color || 'var(--color-light)',
            }
        }
    };

export type SetOption = {
    value: string;
    label: string;
    set: CardSet;
};

export default function SetSelect({
    onSelectChange,
    defaultSetCode,
    setType = '',
    className = ''

 }: {
    onSelectChange: (set: CardSet) => void,
    defaultSetCode?: string,
    setType?: CardSetType|"",
    className?: string
}) {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadSets());
    }, [dispatch]);

    const sets: CardSet[] = useAppSelector(state => selectSetsByType(setType)(state));

    const isLoading: boolean = useAppSelector(selectIsLoading);
    const noneOption: SetOption = {
        value: '',
        label: `Select a ${setType} set...`,
        set: null as unknown as CardSet, // This is a bit hacky, but it allows us to have a "None" option in the select
    }

    const options: SetOption[] = [...sets, noneOption].map((cardSet) => ({
        value: cardSet.code,
        label: cardSet.name,
        set: cardSet,
    }));

    const [userSelectedOption, setUserSelectedOption] = useState<SetOption | null>(null);
    const selectedOption: SetOption = userSelectedOption || options.find(option => option.value === defaultSetCode) || noneOption;

    const handleChange = (selected: SetOption | null) => {
        if (selected) {
            setUserSelectedOption(selected);
            onSelectChange(selected.set);
        }
    };

    useEffect(() => {
        if(userSelectedOption !== null) return; // Don't override user selection with defaultSetCode changes
        if(defaultSetCode)
            onSelectChange(options.find(option => option.value === defaultSetCode)?.set || null as unknown as CardSet);
    }, [defaultSetCode, options, onSelectChange, userSelectedOption]);


    return (
        <div className={`${className} villain-select`}>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
            <Select
                options={options}
                onChange={handleChange}
                placeholder={isLoading ? "loading" : `Select ${setType} set...`}
                noOptionsMessage={() => "No sets found"}
                value={selectedOption}
                styles={colorStyles}
            />
            )}
        </div>
    );
}