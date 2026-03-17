import { getSetByCode } from "@/lib/sets/sets";
import type {IMA} from "@/store/entities/imas";
import type { CardSet } from '@/store/entities/sets';
import Image from 'next/image';
import styles from './IMACard.module.css';

export default async function IMACard({ ima }: { ima: IMA }) {
    const villain: CardSet = await getSetByCode(ima.villain_code);
    const modularSets: CardSet[] = await Promise.all(ima.modular_set_codes.map(code => getSetByCode(code)));
    return (
        <div className={`${styles.imaCard}`} data-title={ima.title}>
            <header className={styles.imaCardTitle}>
                <div className="sticker handwritten">
                    {ima.title}
                </div>
            </header>
            <div className={styles.imaCardContent}>
                <div className={`${styles.imaCardDescription} typewritter text-white`}>
                    {ima.description.length < 200 ? <>
                        {ima.description}
                    </> : <>
                        {ima.description.substring(0,200)}...
                    </>}
                </div>
            {villain && (<>
                <figure className={styles.imaCardVillainFigure} data-title="Villano">
                    <Image
                        src={`https://picsum.photos/seed/${villain.code}/300/300`}
                        alt={villain.name}
                        width={300}
                        height={300}
                        className={styles.imaCardVillainImg}
                    />
                    <figcaption className="handwritten">{villain.name}</figcaption>
                </figure>
                </>
            )}   
                <div className={styles.imaCardModulars} data-title={`Encuentros modulares`}>
                    {modularSets.map((modular) => <>
                    
                        <figure className={styles.imaCardModularFigure} title={modular.name}>
                            <Image
                                src={`https://picsum.photos/seed/${modular.code}/300/300`}
                                alt={modular.name}
                                width={300}
                                height={300}
                                className={styles.imaCardModularImg}
                            />
                            <figcaption className="handwritten">{modular.name}</figcaption>
                        </figure>
                    </>)}
                </div>
                <ul className={`${styles.imaCardTags}`}>
                    {ima.tags.map((tag) => <>
                        <li className="sticker p-4">{tag}</li>
                    </>)}
                </ul>         
            </div>
        </div>
    );
}