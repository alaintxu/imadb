"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from './SetFigure.module.css';
import { use } from 'react';
import { useSetQueryByCode } from '@/lib/query/queries';
import { CardSet } from '@/lib/sets/sets';
import { cardSetNameByLanguage } from '@/lib/sets/sets_front';

export default function SetFigureUse({ code, href, className, dataTitle }: { code: string, href?: string, className?: string, dataTitle?: string }) {
  const setQuery = useSetQueryByCode(code);
  const set: CardSet = use(setQuery.promise);
  return (
    <SetFigure code={code} name={cardSetNameByLanguage(set, "es")} className={className} href={href} dataTitle={dataTitle} />
  );
}

export function SetFigure(
  { code, name, href, className, dataTitle }: { code: string, name: string, href?: string, className?: string, dataTitle?: string }
) {
  return (
    <figure className={`${styles['setFigure']} ${className} `} data-title={dataTitle} title={name}>
      <Image
        src={`https://picsum.photos/seed/${code}/300/300`}
        alt={name}
        width={300}
        height={300}
        className={styles['setImage']}
      />
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