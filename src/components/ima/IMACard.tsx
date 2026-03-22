import { CardSet, getSetByCode } from "@/lib/sets/sets";
import Image from 'next/image';
import Link from 'next/link';
import styles from './IMACard.module.css';
import { IMA } from "@/lib/imas/imas";
import Postit from "../Postit";

export default async function IMACard({ ima }: { ima: IMA }) {
    const villain: CardSet = await getSetByCode(ima.villain_code);
    const modularSets: CardSet[] = await Promise.all(ima.modular_set_codes.map(code => getSetByCode(code)));
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
                {villain && (<>
                    <figure className={styles.imaCardVillainFigure} data-title="Escenario">
                        <Image
                            src={`https://picsum.photos/seed/${villain.code}/300/300`}
                            alt={villain.name.es}
                            width={300}
                            height={300}
                            className={styles.imaCardVillainImg}
                        />
                        <figcaption className="handwritten">{villain.name.es}</figcaption>
                    </figure>
                </>
                )}
                <div className={styles.imaCardModulars} data-title={`Encuentros modulares`}>
                    {modularSets.map((modular) =>

                        <figure className={styles.imaCardModularFigure} title={modular.name.es} key={modular.code}>
                            <Image
                                src={`https://picsum.photos/seed/${modular.code}/300/300`}
                                alt={modular.name.es}
                                width={300}
                                height={300}
                                className={styles.imaCardModularImg}
                            />
                            <figcaption className="handwritten">{modular.name.es}</figcaption>
                        </figure>
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