export type CardSetType = 'level' | 'villain' | 'modular' | 'nemesis' | 'unknown' | 'other';

export type CardSet = {
    code: string;
    name: string;
    set_type: CardSetType;
}