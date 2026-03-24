"use client";
import type { CardSet } from "@/lib/sets/sets";
import Image from 'next/image';
import Link from 'next/link';
import styles from './IMACard.module.css';
import { IMA } from "@/lib/imas/imas";
import Postit from "../../Postit";
import { useSetQueryByCode } from "@/lib/query/queries";
import { Suspense, use } from "react";
import { cardSetNameByLanguage } from "@/lib/sets/sets_front";
import ErrorBoundary from "@/components/Error/ErrorBoundary";

export default function IMACard({ ima }: { ima: IMA }) {
    return (
        <Link href={`/ima/${ima.id}`} className={`${styles.imaCard}`} aria-label={`Open IMA ${ima.id}`}>
            <header className={styles.imaCardTitle}>
                <div className="typewritter text-stone-500">
                    {ima.id}
                </div>
            </header>
            <div className={`${styles.imaCardContent}`}>
                <div className="p-6">
                    <Postit className={`${styles.imaCardDescription} text-lg` } color="danger">{ima.title}</Postit>
                </div>
                <ErrorBoundary>
                    <Suspense fallback={<ImaCardFigureSkeleton type="villain" />}>
                        <ImaCardFigure code={ima.villain_code} type="villain" />
                    </Suspense>
                </ErrorBoundary>
                <div className={styles.imaCardModulars} data-title={`Encuentros modulares`}>
                    {ima.modular_set_codes.map((set_code) =>
                    <ErrorBoundary key={set_code}>
                        <Suspense fallback={<ImaCardFigureSkeleton type="modular" />}>
                            <ImaCardFigure code={set_code} type="modular" />
                        </Suspense>
                    </ErrorBoundary>
                    )}
                </div>
                <ul className={`${styles.imaCardTags}`}>
                    {ima.tags.map((tag) =>
                        <li className="sticker p-4" key={tag}>{tag}</li>
                    )}
                </ul>
            </div>
        </Link>
    );
}

function ImaCardFigure({code, type}: {code: string, type?: 'villain' | 'modular'}) {
    const setQuery = useSetQueryByCode(code);
    const set: CardSet = use(setQuery.promise);
    const dataTitle = type === 'villain' ? 'Escenario' : 'Encuentro modular';
    const stylesForType = type === 'villain' ? styles.imaCardVillainFigure : styles.imaCardModularFigure;
    const stylesForImage = type === 'villain' ? styles.imaCardVillainImg : styles.imaCardModularImg;
    return (
        <figure className={stylesForType} title={cardSetNameByLanguage(set, 'es')} data-title={dataTitle}>
            <Image
                src={`https://picsum.photos/seed/${set.code}/300/300`}
                alt={cardSetNameByLanguage(set, 'es')}
                width={300}
                height={300}
                className={stylesForImage}
            />
            <figcaption className="handwritten">{cardSetNameByLanguage(set, 'es')}</figcaption>
        </figure>
    );
}

function ImaCardFigureSkeleton({type}: {type?: 'villain' | 'modular'}) {
    const dataTitle = type === 'villain' ? 'Escenario' : 'Encuentro modular';
    const stylesForType = type === 'villain' ? styles.imaCardVillainFigure : styles.imaCardModularFigure;
    const stylesForImage = type === 'villain' ? styles.imaCardVillainImg : styles.imaCardModularImg;
    return (
        <figure className={stylesForType} title={"..."} data-title={dataTitle}>
            <div className={`${stylesForImage} animate-pulse`} style={{width: "300px", height: "300px"}} />
            <figcaption className="handwritten animate-pulse">...</figcaption>
        </figure>
    );
}