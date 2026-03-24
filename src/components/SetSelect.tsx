"use client";
import { useState, useEffect, use } from 'react';
import type { StylesConfig } from 'react-select';
import Select from 'react-select';
import type { CardSet, CardSetType } from '@/lib/sets/sets'
import { sortSetsByName } from '@/lib/sets/sets_front';
import { useSetsQuery, SetsQueryParams } from '@/lib/query/queries';
import { cardSetNameByLanguage } from '@/lib/sets/sets_front';

export type SetOption = {
    value: string;
    label: string;
    set: CardSet;
};

export const colorStyles: StylesConfig<SetOption, boolean> = {
        control: (styles) => ({
            ...styles, 
            backgroundColor: 'var(--clip)',
            width: '100%',
            fontFamily: 'var(--typewritter-font-family)',
        }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? 'var(--folder)' : 'var(--clip)',
                color: (isFocused || isSelected) ? 'var(--dark)' : 'var(--light)',
                cursor: 'pointer',
                fontFamily: 'var(--typewritter-font-family)'
            };
        },
        singleValue: (styles) => {
            return {
                ...styles,
                fontFamily: 'var(--typewritter-font-family)',
            }
        },
        multiValue: (styles) => {
            return {
                ...styles,
                backgroundColor: 'var(--folder)',
            }
        },
        multiValueLabel: (styles) => {
            return {
                ...styles,
                color: 'var(--dark)',
                fontFamily: 'var(--typewritter-font-family)'
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
    const setsQueryParams: SetsQueryParams = setType ? {type: setType} : {};
    const setsQuery = useSetsQuery(setsQueryParams);
    const sets = use(setsQuery.promise);

    const noneSet: CardSet = {
        code: '',
        name:{"es": `Select a ${setType} set...`},
        set_type: setType as CardSetType,
    }

    const options: SetOption[] = [noneSet, ...sortSetsByName(sets)].map((cardSet) => ({
        value: cardSet.code,
        label: cardSetNameByLanguage(cardSet, "es"),
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
            <Select
                options={options}
                onChange={handleChange}
                placeholder={`Select ${setType} set...`}
                noOptionsMessage={() => "No sets found"}
                value={selectedOption}
                styles={colorStyles}
            />
        </div>
    );
}