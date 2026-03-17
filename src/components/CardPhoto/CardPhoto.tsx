import Image from 'next/image';
import Link from 'next/link';
import styles from './CardPhoto.module.css';
export default function CardFigure(
  { code, name, href }: { code: string, name: string, href?: string }
) {
  return (
    <figure className={styles.cardFigure}>
        <Image
            src={`https://picsum.photos/seed/${code}/300/300`}
            alt={name}
            width={300}
            height={300}
            className={styles.cardImage}
        />
        <figcaption className="handwritten">
          {href ? <Link href={href}>{name}</Link> : name}
        </figcaption>
    </figure>
  );
}