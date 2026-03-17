import { getAllIMAs } from "@/lib/imas/imas";
import type { IMA } from "@/store/entities/imas";
import IMACard from "@/components/ima/IMACard";
import styles from "./page.module.css";


export default async function IMAListPage() {
    const imas: IMA[] = await getAllIMAs();

    return (

        <section className={styles.container}>
            <h1 className={styles.title}>Lista de IMAs</h1>
            <div id="ima-folder-list" className="auto-grid">
                {imas.map(async ima => <IMACard ima={ima} key={ima.id} />)}
            </div>
        </section>
    );
}