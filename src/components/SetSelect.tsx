"use client";
import type { CardSet, CardSetType } from '@/store/entities/sets';
import { loadSets, selectAllSets } from '@/store/entities/sets';
import { selectSetsByType, selectIsLoading } from '@/store/entities/sets';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import type { StylesConfig } from 'react-select';
import Select from 'react-select';

export type SetOption = {
    value: string;
    label: string;
    set: CardSet;
};

export const colorStyles: StylesConfig<SetOption, boolean> = {
        control: (styles) => ({ ...styles, backgroundColor: 'var(--color-accent)', width: '100%' }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? 'var(--color-accent)' : 'var(--color-surface)',
                color: (isFocused || isSelected) ? 'var(--color-background)' : 'var(--color-light)',
                cursor: 'pointer',
            };
        },
        multiValue: (styles) => {
            return {
                ...styles,
                backgroundColor: 'var(--color-surface)',
            }
        },
        multiValueLabel: (styles) => {
            return {
                ...styles,
                color: 'var(--color-light)',
            }
        }
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

    const sets: CardSet[] = useAppSelector((state) =>
        setType !== '' ? selectSetsByType(setType)(state) : selectAllSets(state)
    );

    const isLoading: boolean = useAppSelector(selectIsLoading);
    const noneSet: CardSet = {
        code: '',
        name: `Select a ${setType} set...`,
        set_type: setType as CardSetType,
    }

    const options: SetOption[] = [noneSet, ...sets].map((cardSet) => ({
        value: cardSet.code,
        label: cardSet.name,
        set: cardSet,
    }));

    const [userSelectedOption, setUserSelectedOption] = useState<SetOption | null>(null);
    const selectedOption: SetOption = userSelectedOption || options.find(option => option.value === defaultSetCode) || options.find(option => option.value === '') as SetOption;

        const handleChange = (selected: SetOption | readonly SetOption[] | null) => {
            const option = Array.isArray(selected) ? selected[0] : selected;

            if (option) {
                setUserSelectedOption(option);
                onSelectChange(option.set);
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