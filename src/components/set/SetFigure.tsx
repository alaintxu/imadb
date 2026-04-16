"use client";
import Link from 'next/link';
import styles from './SetFigure.module.css';
import { use } from 'react';
import { useSetQueryByCode } from '@/lib/query/queries';
import { CardSet } from '@/lib/sets/sets';
import { useTranslation } from '@/i18n';
import CardImageWithSkeleton from '@/components/CardImageWithSkeleton';

function getCardSetName(set: CardSet, language: string): string {
  return set.name[language] ?? set.name["en"] ?? set.code;
}

export default function SetFigureUse(
  { code, href, className, dataTitle, width=130, height=130 }: { code: string, href?: string, className?: string, dataTitle?: string, width?: number, height?: number }) {
  const { language } = useTranslation();
  const setQuery = useSetQueryByCode(code);
  const set: CardSet = use(setQuery.promise);
  return (
    <SetFigure code={set.first_card_code || "back_orange"} name={getCardSetName(set, language)} className={className} href={href} dataTitle={dataTitle} width={width} height={height} />
  );
}

export function SetFigure(
  { code, name, href, className, dataTitle, width=130, height=130 }: { code: string, name: string, href?: string, className?: string, dataTitle?: string, width?: number, height?: number }
) {
  return (
    <figure className={`${styles['setFigure']} ${className} `} data-title={dataTitle} title={name}>
      <CardImageWithSkeleton 
        src={`https://cdn.jsdelivr.net/gh/alaintxu/mc-ocr@main/images/accepted/${code}.webp`}
        alt={name}
        width={width}
        height={height}
        className={`${styles['setImage']}`} />
      <figcaption className={`${styles['setCaption']} handwritten`}>
        {href ? <Link href={href}>{name}</Link> : name}
      </figcaption>
    </figure>
  );
}

export function SetFigureSkeleton({ className, dataTitle }: { className?: string, dataTitle?: string }) {
  return (
    <figure className={`${styles['setFigureSkeleton']} ${className}`} title={"..."} data-title={dataTitle}>
      <div className={`${styles['setImageSkeleton']} bg-modok animate-pulse mb-2`} />
      <figcaption className={`${styles['setCaptionSkeleton']} handwritten animate-pulse bg-dark m-2 p-0`}>...</figcaption>
    </figure>
  );
}