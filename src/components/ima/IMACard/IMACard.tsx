"use client";
import Link from 'next/link';
import styles from './IMACard.module.css';
import { IMA } from "@/lib/imas/imas";
import Postit from "../../Postit";
import { Suspense } from "react";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import IMACardModulars from "./IMACardModulars";
import SetFigureUse, { SetFigureSkeleton } from "@/components/set/SetFigure";
import { useTranslation } from '@/i18n/I18nProvider';


export default function IMACard({ ima }: { ima: IMA }) {
    const { t } = useTranslation();
    return (
        <Link href={`/ima/${ima.id}`} className={`${styles['imaCard']}`} aria-label={`Open IMA ${ima.id}`}>
            <header className={`${styles['imaCardTitle']} glass`}>
                <div className="typewritter text-stone-500">
                    {ima.id}
                </div>
            </header>
            <div className={`${styles['imaCardContent']} glass`}>
                <div className="p-6">
                    <Postit className={`${styles['imaCardDescription']} text-lg` } color="danger">{ima.title}</Postit>
                </div>
                <ErrorBoundary>
                    <Suspense fallback={<SetFigureSkeleton className="color-modok typewritter" />}>
                        <SetFigureUse code={ima.villain_code} className="color-modok typewritter" dataTitle={t('imasNew.villain')}/>
                    </Suspense>
                </ErrorBoundary>
                <IMACardModulars set_codes={ima.modular_set_codes} className="typewritter" />
                <ul className={`${styles['imaCardTags']}`}>
                    {ima.tags.map((tag) =>
                        <li className="sticker p-4" key={tag}>{tag}</li>
                    )}
                </ul>
            </div>
        </Link>
    );
}