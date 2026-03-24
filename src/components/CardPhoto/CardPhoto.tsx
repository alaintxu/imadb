"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from './CardPhoto.module.css';
export default function CardFigure(
  { code, name, href, className }: { code: string, name: string, href?: string, className?: string }
) {
  return (
    <figure className={`${className} ${styles['cardFigure']}`}>
        <Image
            src={`https://picsum.photos/seed/${code}/300/300`}
            alt={name}
            width={300}
            height={300}
            className={styles['cardImage']}
        />
        <figcaption className="handwritten">
          {href ? <Link href={href}>{name}</Link> : name}
        </figcaption>
    </figure>
  );
}